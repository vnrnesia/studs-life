import { Metadata } from 'next';
import { i18n } from '@/i18n-config';

const BASE_URL = 'https://studs-life.com';

interface SEOMetadataParams {
    lang: string;
    path: string; // e.g., '/services', '/about', '' for home
    title: string;
    description: string;
    image?: string;
    noIndex?: boolean;
}

/**
 * Generate SEO-optimized metadata with canonical URLs and hreflang alternates
 */
export function generateSEOMetadata({
    lang,
    path,
    title,
    description,
    image = '/og-image.png',
    noIndex = false,
}: SEOMetadataParams): Metadata {
    const canonicalUrl = `${BASE_URL}/${lang}${path}`;

    // Generate alternates for all locales
    const alternateLanguages: Record<string, string> = {};
    for (const locale of i18n.locales) {
        alternateLanguages[locale] = `${BASE_URL}/${locale}${path}`;
    }
    // Add x-default pointing to default locale
    alternateLanguages['x-default'] = `${BASE_URL}/${i18n.defaultLocale}${path}`;

    return {
        title,
        description,
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalUrl,
            languages: alternateLanguages,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "Student's Life",
            locale: lang === 'tk' ? 'tk_TM' : lang === 'ru' ? 'ru_RU' : 'en_US',
            type: 'website',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

/**
 * Generate breadcrumb-friendly path segments
 */
export function generateBreadcrumbPath(lang: string, segments: { name: string; path: string }[]) {
    return segments.map((segment, index) => ({
        '@type': 'ListItem' as const,
        position: index + 1,
        name: segment.name,
        item: `${BASE_URL}/${lang}${segment.path}`,
    }));
}
