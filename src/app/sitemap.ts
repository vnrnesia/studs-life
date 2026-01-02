import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';

const BASE_URL = 'https://studs-life.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes = ['', '/about', '/services', '/blog', '/contact'];
    const locales = i18n.locales;

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add all localized routes
    for (const locale of locales) {
        for (const route of routes) {
            const url = `${BASE_URL}/${locale}${route}`;
            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        }
    }

    // TODO: Add dynamic routes from Strapi (blogs, countries)
    // This can be expanded as needed.

    return sitemapEntries;
}
