import type { Metadata, Viewport } from "next";
import { Literata, Onest } from "next/font/google";

import { LocaleSync } from "@/components/i18n/locale-sync";
import { localeBootScript } from "@/lib/i18n/boot-script";
import { defaultLocale, htmlLang } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";
import "./globals.css";

// Both families cover Cyrillic + Cyrillic Extended (Kyrgyz Ө, Ү, Ң).
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

// Server-rendered metadata uses the default locale; <LocaleSync> updates the
// document title on the client when another locale is active.
const { meta } = dictionaries[defaultLocale];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={htmlLang[defaultLocale]}
      className={`${literata.variable} ${onest.variable} h-full antialiased`}
      // The boot script may set `lang` / a pending flag before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleSync />
        {children}
      </body>
    </html>
  );
}
