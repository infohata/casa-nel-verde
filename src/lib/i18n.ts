export const supported_languages = ["it", "en", "de"] as const;

export type SupportedLanguage = (typeof supported_languages)[number];

export const language_labels: Record<SupportedLanguage, string> = {
    it: "IT",
    en: "EN",
    de: "DE",
};

export const default_language: SupportedLanguage = "it";

export function build_alternates(pathname: string): { lang: string; path: string }[] {
    return supported_languages.map((lang) => ({
        lang,
        path: `/${lang}${pathname}`,
    }));
}
