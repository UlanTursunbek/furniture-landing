"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

import { SubmitStatusPanel, type SubmitStatus } from "@/components/estimate/submit-status";
import { WizardProgress } from "@/components/estimate/wizard-progress";
import { ContactStep } from "@/components/estimate/steps/contact-step";
import { DimensionsStep } from "@/components/estimate/steps/dimensions-step";
import { FurnitureTypeStep } from "@/components/estimate/steps/furniture-type-step";
import { MaterialsStep } from "@/components/estimate/steps/materials-step";
import { OptionsStep } from "@/components/estimate/steps/options-step";
import { ServicesStep } from "@/components/estimate/steps/services-step";
import { SummaryStep } from "@/components/estimate/steps/summary-step";
import { Button } from "@/components/ui/button";
import { clearDraft, loadDraft, saveDraft } from "@/lib/estimate/draft";
import { buildEstimateMessage } from "@/lib/estimate/message";
import {
  estimateDefaultValues,
  estimateSchema,
  type EstimateFormInput,
  type EstimateFormValues,
} from "@/lib/estimate/schema";
import { estimateSteps, lastStepIndex, type EstimateStepId } from "@/lib/estimate/steps";
import { formatMessage } from "@/lib/i18n/format";
import { useDictionary } from "@/lib/i18n/use-dictionary";
import { buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";

const headingId = "estimate-step-title";

const stepVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

const subscribeNothing = () => () => {};

/**
 * The saved draft lives in sessionStorage, which only exists in the browser.
 * Rendering the form client-side only lets it start from the draft directly,
 * with no hydration mismatch and no "restore" re-render.
 */
export function EstimateWizard() {
  const isClient = useSyncExternalStore(subscribeNothing, () => true, () => false);
  return isClient ? (
    <EstimateWizardForm />
  ) : (
    <div aria-hidden className="mt-12 min-h-[40rem] border-t border-border lg:mt-16" />
  );
}

function EstimateWizardForm() {
  const t = useDictionary();
  const copy = t.estimate;
  const reduceMotion = useReducedMotion();

  const [draft] = useState(loadDraft);
  const initialStep = draft ? Math.min(draft.step, lastStepIndex) : 0;

  const form = useForm<EstimateFormInput, unknown, EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: draft ? { ...estimateDefaultValues, ...draft.values } : estimateDefaultValues,
    mode: "onTouched",
  });
  const { trigger, getValues, getFieldState, handleSubmit, reset, subscribe, formState } = form;

  const [step, setStep] = useState(initialStep);
  const [furthest, setFurthest] = useState(() =>
    draft ? Math.min(Math.max(draft.furthestStep, initialStep), lastStepIndex) : 0,
  );
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });
  const containerRef = useRef<HTMLDivElement>(null);
  /** True when the step changed through user navigation (not on first render). */
  const navigatedRef = useRef(false);

  // Persist the draft on every change and step move.
  useEffect(() => {
    saveDraft({ step, furthestStep: furthest, values: getValues() });
    return subscribe({
      formState: { values: true },
      callback: ({ values }) => saveDraft({ step, furthestStep: furthest, values }),
    });
  }, [step, furthest, subscribe, getValues]);

  // Once a field shows an error, re-validate it as the user corrects it.
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ name }) => {
          const field = name as FieldPath<EstimateFormInput> | undefined;
          if (field && getFieldState(field).invalid) void trigger(field);
        },
      }),
    [subscribe, getFieldState, trigger],
  );

  const moveTo = useCallback(
    (target: number) => {
      navigatedRef.current = true;
      setStep(target);
      setFurthest((current) => Math.max(current, target));
      setStatus({ kind: "idle" });

      const container = containerRef.current;
      if (container && container.getBoundingClientRect().top < 0) {
        container.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    },
    [reduceMotion],
  );

  const validateStep = useCallback(
    async (index: number, shouldFocus: boolean) => {
      const fields = estimateSteps[index].fields;
      // trigger([]) would validate the whole form, so skip field-less steps.
      if (fields.length === 0) return true;
      return trigger([...fields] as FieldPath<EstimateFormInput>[], { shouldFocus });
    },
    [trigger],
  );

  /** Backward moves are free; forward moves validate every step in between. */
  const goTo = useCallback(
    async (target: number) => {
      if (target === step) return;
      if (target < step) {
        moveTo(target);
        return;
      }
      for (let index = step; index < target; index++) {
        const valid = await validateStep(index, index === step);
        if (!valid) {
          if (index !== step) moveTo(index);
          return;
        }
      }
      moveTo(target);
    },
    [step, moveTo, validateStep],
  );

  const goToStepId = useCallback(
    (id: EstimateStepId) => void goTo(estimateSteps.findIndex((s) => s.id === id)),
    [goTo],
  );

  const onValid = (values: EstimateFormValues) => {
    const number = getWhatsAppNumber();

    if (!number) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[estimate] WhatsApp number is not configured. Set `whatsappNumber` in lib/site-config.ts.");
      }
      setStatus({ kind: "unconfigured", values });
      return;
    }

    const url = buildWhatsAppUrl(number, buildEstimateMessage(values, t));
    const opened = window.open(url, "_blank");
    if (opened) opened.opener = null;
    else window.location.assign(url); // Popup blocked: open in this tab instead.
    setStatus({ kind: "sent", url });
  };

  const onInvalid = () => {
    // Defensive: jump to the first step that still has an error.
    const index = estimateSteps.findIndex((s) => s.fields.some((field) => getFieldState(field).invalid));
    if (index >= 0 && index !== step) moveTo(index);
  };

  // Enter in a field advances one step; only the last step actually submits.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < lastStepIndex) {
      void goTo(step + 1);
      return;
    }
    void handleSubmit(onValid, onInvalid)();
  };

  const startOver = () => {
    clearDraft();
    reset(estimateDefaultValues);
    setFurthest(0);
    moveTo(0);
  };

  const focusHeading = () => {
    if (!navigatedRef.current) return;
    navigatedRef.current = false;
    document.getElementById(headingId)?.focus({ preventScroll: true });
  };

  const stepId = estimateSteps[step].id;
  const stepCopy = copy.steps[stepId];
  const isLast = step === lastStepIndex;

  return (
    <FormProvider {...form}>
      <MotionConfig reducedMotion="user">
        <div
          ref={containerRef}
          className="mt-12 grid scroll-mt-6 gap-y-8 border-t border-border pt-8 lg:mt-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-14"
        >
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-10">
              <WizardProgress current={step} furthest={furthest} onSelect={(index) => void goTo(index)} />
            </div>
          </aside>

          <form noValidate onSubmit={onSubmit} aria-labelledby={headingId} className="lg:col-span-8 lg:col-start-5">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stepId}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onAnimationComplete={(definition) => {
                    if (definition === "animate") focusHeading();
                  }}
                >
                  <p className="eyebrow text-olive tabular-nums">
                    {formatMessage(copy.progress.stepOf, { current: step + 1, total: estimateSteps.length })}
                  </p>
                  <h2 id={headingId} tabIndex={-1} className="mt-4 text-subhead outline-none">
                    {stepCopy.title}
                  </h2>
                  <p className="mt-3 max-w-[56ch] text-muted-foreground">{stepCopy.description}</p>

                  <div className="mt-8 lg:mt-10">
                    {stepId === "type" && <FurnitureTypeStep labelledBy={headingId} />}
                    {stepId === "dimensions" && <DimensionsStep />}
                    {stepId === "materials" && <MaterialsStep />}
                    {stepId === "options" && <OptionsStep labelledBy={headingId} />}
                    {stepId === "services" && <ServicesStep labelledBy={headingId} />}
                    {stepId === "summary" && <SummaryStep onEdit={goToStepId} />}
                    {stepId === "contact" && <ContactStep />}
                  </div>
                </motion.div>
              </AnimatePresence>

            <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6 max-lg:sticky max-lg:bottom-0 max-lg:z-10 max-lg:-mx-gutter max-lg:bg-background/95 max-lg:px-gutter max-lg:pb-[max(1rem,env(safe-area-inset-bottom))] max-lg:backdrop-blur-sm">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => void goTo(step - 1)}
                  className="max-sm:-ml-3 max-sm:size-12 max-sm:px-0"
                >
                  <ArrowLeft aria-hidden />
                  {/* Icon-only on phones to leave room for the primary action. */}
                  <span className="max-sm:sr-only">{copy.actions.back}</span>
                </Button>
              ) : (
                <span />
              )}

              {isLast ? (
                <Button
                  type="submit"
                  size="lg"
                  disabled={formState.isSubmitting}
                  className="max-sm:h-auto max-sm:min-h-14 max-sm:flex-1 max-sm:py-3 max-sm:text-center max-sm:whitespace-normal"
                >
                  <MessageCircle aria-hidden />
                  {copy.actions.submit}
                </Button>
              ) : (
                <Button type="submit" size="lg" className="max-sm:flex-1">
                  {copy.actions.next}
                  <ArrowRight
                    aria-hidden
                    className="transition-transform duration-300 ease-studio group-hover/button:translate-x-0.5"
                  />
                </Button>
              )}
            </div>

            {isLast && status.kind === "idle" && (
              <p className="mt-4 max-w-[56ch] text-sm text-muted-foreground">{copy.actions.submitNote}</p>
            )}
            <SubmitStatusPanel status={status} onStartOver={startOver} />
          </form>
        </div>
      </MotionConfig>
    </FormProvider>
  );
}
