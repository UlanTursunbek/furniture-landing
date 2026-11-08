import type { Metadata } from "next";

import { EstimateIntro } from "@/components/estimate/estimate-intro";
import { EstimateWizard } from "@/components/estimate/estimate-wizard";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { defaultLocale } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";

const { meta, estimate } = dictionaries[defaultLocale];

export const metadata: Metadata = {
  title: meta.estimateTitle,
  description: estimate.intro.lead,
};

export default function EstimatePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="shell pt-8 pb-section lg:pt-12">
          <EstimateIntro />
          <EstimateWizard />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
