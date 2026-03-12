import de from "../content/locales/de.json";
import en from "../content/locales/en.json";
import it from "../content/locales/it.json";
import media from "../content/media.json";
import site_config from "../content/site-config.json";
import { default_language, type SupportedLanguage } from "./i18n";

interface HeroContent {
    eyebrow: string;
    title: string;
    description: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
}

interface FeatureListSection {
    title: string;
    lead?: string;
    items: string[];
}

interface HighlightCard {
    title: string;
    description: string;
    imageId: string;
}

interface HighlightsSection {
    title: string;
    lead?: string;
    cards: HighlightCard[];
}

interface AmenityCard {
    title: string;
    description: string;
    imageId?: string;
}

interface AmenitiesSection {
    title: string;
    lead?: string;
    cards: AmenityCard[];
}

interface GallerySection {
    title: string;
    lead: string;
    imageIds: string[];
}

interface LocationSection {
    title: string;
    placeName: string;
    description: string;
    imageIds: string[];
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
    highlights: HighlightsSection;
    gallery: GallerySection;
    location: LocationSection;
    amenities: AmenitiesSection;
    backlinkPlatforms: BacklinkSection;
    finalCta: FinalCtaSection;
}

export interface MediaEntry {
    src: string;
    alt: Record<SupportedLanguage, string>;
}

const locale_content_map: Record<SupportedLanguage, LocaleContent> = {
    it: it as unknown as LocaleContent,
    en: en as unknown as LocaleContent,
    de: de as unknown as LocaleContent,
};

export const media_map: Record<string, MediaEntry> = media;
export const site_config_data = site_config;

export function get_locale_content(lang: SupportedLanguage): LocaleContent {
    return locale_content_map[lang] ?? locale_content_map[default_language];
}
