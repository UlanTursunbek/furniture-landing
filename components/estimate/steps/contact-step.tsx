"use client";

import { useFormContext } from "react-hook-form";

import { errorId, FieldError, useFieldError } from "@/components/estimate/field-error";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EstimateFormInput } from "@/lib/estimate/schema";
import { useDictionary } from "@/lib/i18n/use-dictionary";

export function ContactStep() {
  const { register } = useFormContext<EstimateFormInput>();
  const { contact } = useDictionary().estimate;
  const nameError = useFieldError("contact.name");
  const phoneError = useFieldError("contact.phone");
  const commentError = useFieldError("contact.comment");

  return (
    <div className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">
            {contact.name}
          </label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder={contact.namePlaceholder}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={errorId("contact.name")}
            className="mt-2"
            {...register("contact.name")}
          />
          <FieldError name="contact.name" />
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium">
            {contact.phone}
          </label>
          <Input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={contact.phonePlaceholder}
            aria-invalid={phoneError ? true : undefined}
            aria-describedby={errorId("contact.phone")}
            className="mt-2 tabular-nums"
            {...register("contact.phone")}
          />
          <FieldError name="contact.phone" />
        </div>
      </div>
      <div>
        <label htmlFor="contact-comment" className="text-sm font-medium">
          {contact.comment}{" "}
          <span className="font-normal text-muted-foreground">({contact.optional})</span>
        </label>
        <Textarea
          id="contact-comment"
          rows={4}
          placeholder={contact.commentPlaceholder}
          aria-invalid={commentError ? true : undefined}
          aria-describedby={errorId("contact.comment")}
          className="mt-2"
          {...register("contact.comment")}
        />
        <FieldError name="contact.comment" />
      </div>
    </div>
  );
}
