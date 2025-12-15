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

export interface TeamMember {
    id: number;
    documentId: string;
    fullName: string;
    role: string;
    photo?: {
        url: string;
        alternativeText?: string;
    };
    city: string;
    officeAddress?: string;
    birthDate?: string;
    startDate?: string;
    languages?: string;
    phone?: string;
    email?: string;
    responsibilities?: string;
    locale: string;
}

// ... existing code ...
export async function getTeamMembers(locale: string = 'en'): Promise<TeamMember[]> {
    const query = qs.stringify({
        locale,
        populate: '*',
        sort: ['fullName:asc'],
    });

    const { data } = await strapiClient.get<StrapiResponse<TeamMember[]>>(`/team-members?${query}`);
    return data.data;
}

export interface BlogPost {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    readingTime: string;
    publishedAt: string;
    cover?: {
        url: string;
        alternativeText?: string;
    };
    locale: string;
}

/**
 * Get latest blog posts
 */
export async function getLatestBlogs(locale: string = 'en', limit: number = 3): Promise<BlogPost[]> {
    const query = qs.stringify({
        locale,
        populate: {
            country: true,
            images: true
        },
        sort: ['publishedAt:desc'],
        pagination: {
            pageSize: limit,
        },
    });

    try {
        // Fetch cities instead of blogs, as per user request to use "country writings" (cities)
        const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);

        return data.data.map((city: City) => ({
            id: city.id,
            documentId: city.documentId,
            title: city.title || city.name,
            slug: `${city.country?.slug}/${city.slug}`, // Construct path: country/city
            content: city.intro || '',
            excerpt: city.intro || '',
            readingTime: '5',
            publishedAt: city.publishedAt,
            cover: city.images && city.images.length > 0 ? city.images[0] : undefined,
            locale: city.locale,
        }));
    } catch (error) {
        console.error('Error fetching blogs (cities):', error);
        return [];
    }
}
