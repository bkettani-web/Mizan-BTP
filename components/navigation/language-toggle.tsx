"use client";

import { useLocale } from "@/lib/i18n/context";
import { LOCALES, LOCALE_SHORT } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full p-1",
        variant === "dark" ? "bg-white/10" : "bg-surface",
        className,
      )}
      role="group"
      aria-label="Langue / اللغة"
    >
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            className={cn(
              "min-w-9 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all duration-150",
              isActive
                ? "bg-terracotta text-white shadow-[0_4px_10px_-3px_rgba(217,101,40,0.6)]"
                : variant === "dark"
                  ? "text-white/60 hover:text-white"
                  : "text-anthracite hover:text-navy",
            )}
          >
            {LOCALE_SHORT[code]}
          </button>
        );
      })}
    </div>
  );
}
