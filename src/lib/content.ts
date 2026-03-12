import de from "../content/locales/de.json";
import en from "../content/locales/en.json";
import it from "../content/locales/it.json";
import media from "../content/media.json";
import site_config from "../content/site-config.json";
import { default_language, type SupportedLanguage } from "./i18n";

interface HeroContent {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
}

interface ListSection {
    title: string;
    lead?: string;
    items: string[];
}

interface GallerySection {
    title: string;
    lead: string;
    imageIds: string[];
}

interface TextSection {
    title: string;
    description: string;
}

interface BacklinkSection {
    title: string;
    lead: string;
}

interface FinalCtaSection {
    title: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
}

interface SeoContent {
    title: string;
    description: string;
}

export interface LocaleContent {
    lang: SupportedLanguage;
    seo: SeoContent;
    hero: HeroContent;
    highlights: ListSection;
    gallery: GallerySection;
    location: TextSection;
    amenities: ListSection;
    backlinkPlatforms: BacklinkSection;
    finalCta: FinalCtaSection;
}

export interface MediaEntry {
    src: string;
    alt: Record<SupportedLanguage, string>;
}

const locale_content_map: Record<SupportedLanguage, LocaleContent> = {
    it,
    en,
    de,
};

export const media_map: Record<string, MediaEntry> = media;
export const site_config_data = site_config;

export function get_locale_content(lang: SupportedLanguage): LocaleContent {
    return locale_content_map[lang] ?? locale_content_map[default_language];
}
