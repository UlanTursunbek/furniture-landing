"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { useDictionary } from "@/lib/i18n/use-dictionary";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const t = useDictionary();
  const pathname = usePathname();
  const onInquiryPage = pathname === siteConfig.inquiryHref;

  // Section links include "/" so they also work from other pages;
  // the footer (#contacts) is present on every page.
  const navItems = [
    { href: "/#categories", label: t.nav.categories },
    { href: "/#approach", label: t.nav.approach },
    { href: "#contacts", label: t.nav.contacts },
  ];

  return (
    <header className="relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-gutter focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        {t.a11y.skipToContent}
      </a>

      <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
        <Link
          href="/"
          aria-label={`${siteConfig.name}, ${t.a11y.home}`}
          className="flex items-baseline gap-3"
        >
          <span className="font-serif text-[1.75rem] leading-none font-normal tracking-[-0.02em]">
            {siteConfig.name}
          </span>
          <span className="eyebrow hidden text-muted-foreground sm:inline">
            {t.brand.descriptor}
          </span>
        </Link>

        <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground underline decoration-transparent underline-offset-[6px] transition-colors duration-300 ease-studio hover:text-foreground hover:decoration-foreground/40"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <LanguageSwitcher className="-mr-2.5 sm:mr-0" />
          {!onInquiryPage && (
            <Link
              href={siteConfig.inquiryHref}
              className={buttonVariants({ variant: "outline", size: "sm", className: "hidden sm:inline-flex" })}
            >
              {t.nav.inquiry}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
