import { siteConfig } from "@/lib/site-config";

/**
 * Returns the configured WhatsApp number (digits only), or null when it is not
 * configured. Configure it in lib/site-config.ts → `whatsappNumber`.
 */
export function getWhatsAppNumber(): string | null {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return /^\d{8,15}$/.test(digits) ? digits : null;
}

/** Builds a click-to-chat URL: https://wa.me/PHONE?text=... */
export function buildWhatsAppUrl(number: string, text?: string): string {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
