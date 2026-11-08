"use client";

import { ArrowUpRight } from "lucide-react";

import { useDictionary } from "@/lib/i18n/use-dictionary";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const t = useDictionary();
  const { footer } = t;

  const linkClass =
    "underline decoration-foreground/30 underline-offset-[5px] transition-colors duration-300 ease-studio hover:decoration-foreground";

  return (
    <footer id="contacts" aria-labelledby="contacts-title" className="scroll-mt-8 border-t border-border bg-linen">
      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-x-8 lg:py-24">
        <div className="lg:col-span-5">
          <p className="font-serif text-[2rem] leading-none tracking-[-0.02em]">{siteConfig.name}</p>
          <p className="mt-5 max-w-[34ch] text-muted-foreground">{footer.tagline}</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="contacts-title" className="eyebrow font-sans font-medium text-olive">
            {footer.contactsTitle}
          </h2>
          <dl className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">{footer.phone}</dt>
              <dd className="mt-2">
                <a href={siteConfig.phone.href} className={`${linkClass} tabular-nums`}>
                  {siteConfig.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{footer.whatsapp}</dt>
              <dd className="mt-2">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-1`}
                >
                  {footer.whatsappAction}
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">({t.a11y.opensInNewTab})</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{footer.address}</dt>
              <dd className="mt-2">{footer.city}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{footer.hours}</dt>
              <dd className="mt-2">{footer.hoursValue}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="shell">
        <p className="border-t border-foreground/10 py-6 text-xs text-muted-foreground">
          © {siteConfig.copyrightYear} {siteConfig.name}. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
