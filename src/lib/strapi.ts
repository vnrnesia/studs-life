import axios from 'axios';
import qs from 'qs';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const strapiToken = process.env.STRAPI_API_TOKEN;

export const strapiClient = axios.create({
    baseURL: `${strapiUrl}/api`,
    headers: {
        'Content-Type': 'application/json',
        ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
    },
});

// Types
export interface Country {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string;
    featured: boolean;
    locale: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cities?: City[];
}

export interface City {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    title: string;
    intro?: string;
    economyContent?: string;
    housingContent?: string;
    transportContent?: string;
    climateContent?: string;
    climateTable?: any;
    conclusion?: string;
    featured: boolean;
    metaDescription?: string;
    locale: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    country: Country;
    images?: Array<{
        id: number;
        url: string;
        alternativeText?: string;
        caption?: string;
        width: number;
        height: number;
    }>;
}

interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

/**
 * Get all countries
 */
export async function getCountries(locale: string = 'en'): Promise<Country[]> {
    const query = qs.stringify({
        locale,
        populate: '*',
        sort: ['name:asc'],
    });

    const { data } = await strapiClient.get<StrapiResponse<Country[]>>(`/countries?${query}`);
    return data.data;
}

/**
 * Get single country by slug
 */
export async function getCountry(slug: string, locale: string = 'en'): Promise<Country | null> {
    const query = qs.stringify({
        locale,
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            cities: {
                populate: '*',
            },
        },
    });

    const { data } = await strapiClient.get<StrapiResponse<Country[]>>(`/countries?${query}`);
    return data.data[0] || null;
}

/**
 * Get all cities, optionally filtered by country
 */
export async function getCities(countrySlug?: string, locale: string = 'en'): Promise<City[]> {
    const query = qs.stringify({
        locale,
        populate: {
            country: true,
            images: true,
        },
        ...(countrySlug && {
            filters: {
                country: {
                    slug: {
                        $eq: countrySlug,
                    },
                },
            },
        }),
        sort: ['name:asc'],
    });

    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data;
}

/**
 * Get single city by country slug and city slug
 */
export async function getCity(
    countrySlug: string,
    citySlug: string,
    locale: string = 'en'
): Promise<City | null> {
    const query = qs.stringify({
        locale,
        filters: {
            slug: {
                $eq: citySlug,
            },
            country: {
                slug: {
                    $eq: countrySlug,
                },
            },
        },
        populate: {
            country: true,
            images: true,
        },
    });

    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data[0] || null;
}

/**
 * Get single city by slug only (regardless of country)
 */
export async function getCityBySlug(
    citySlug: string,
    locale: string = 'en'
): Promise<City | null> {
    const query = qs.stringify({
        locale,
        filters: {
            slug: {
                $eq: citySlug,
            },
        },
        populate: {
            country: true,
            images: true,
        },
    });

    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data[0] || null;
}

/**
 * Get featured cities for homepage
 */
export async function getFeaturedCities(locale: string = 'en'): Promise<City[]> {
    const query = qs.stringify({
        locale,
        filters: {
            featured: {
                $eq: true,
            },
        },
        populate: {
            country: true,
            images: true,
        },
        sort: ['name:asc'],
    });

    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data;
}

/**
 * Get countries with cities for the Mega Menu
 */
export async function getCountriesWithCities(locale: string = 'en'): Promise<Country[]> {
    const query = qs.stringify({
        locale,
        populate: {
            cities: {
                fields: ['name', 'slug'], // Correct way to select fields
                sort: ['name:asc'],
            },
        },
        sort: ['name:asc'],
    });

    const { data } = await strapiClient.get<StrapiResponse<Country[]>>(`/countries?${query}`);
    return data.data;
}

/**
 * Get image URL from Strapi
 */
export function getStrapiImageUrl(url: string): string {
    if (url.startsWith('http')) {
        return url;
    }
    return `${strapiUrl}${url}`;
}
