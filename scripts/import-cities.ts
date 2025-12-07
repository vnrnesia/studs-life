/**
 * Import script for city data into Strapi CMS
 * 
 * Usage:
 * 1. Make sure Strapi is running: cd studs-life-cms && npm run develop
 * 2. Run this script: npx tsx scripts/import-cities.ts
 */

import axios from 'axios';
import { citiesData } from './data/cities-data';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API = `${STRAPI_URL}/api`;

// Helper to create or find country
async function createOrFindCountry(countryName: string, countrySlug: string, locale: string = 'ru') {
    const headers = process.env.STRAPI_API_TOKEN ? {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    } : {};

    try {
        // Check if country exists
        const { data: existingCountries } = await axios.get(`${STRAPI_API}/countries`, {
            params: {
                'filters[slug][$eq]': countrySlug,
                locale,
            },
            headers,
        });

        if (existingCountries.data.length > 0) {
            console.log(`✓ Country "${countryName}" already exists`);
            return existingCountries.data[0].id;
        }

        // Create new country
        const { data: newCountry } = await axios.post(`${STRAPI_API}/countries`, {
            data: {
                name: countryName,
                slug: countrySlug,
                locale,
            },
        }, { headers });

        console.log(`✓ Created country: ${countryName}`);
        return newCountry.data.id;
    } catch (error: any) {
        console.error(`✗ Error creating country ${countryName}:`, error.response?.data || error.message);
        throw error;
    }
}

// Helper to create city
async function createCity(cityData: any, countryId: number, locale: string = 'ru') {
    const headers = process.env.STRAPI_API_TOKEN ? {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    } : {};

    try {
        // Check if city exists
        const { data: existingCities } = await axios.get(`${STRAPI_API}/cities`, {
            params: {
                'filters[slug][$eq]': cityData.slug,
                locale,
            },
            headers,
        });

        if (existingCities.data.length > 0) {
            console.log(`  ⊙ City "${cityData.name}" already exists, skipping...`);
            return;
        }

        // Create new city
        await axios.post(`${STRAPI_API}/cities`, {
            data: {
                name: cityData.name,
                slug: cityData.slug,
                title: cityData.title,
                intro: cityData.intro,
                economyContent: cityData.economyContent,
                housingContent: cityData.housingContent,
                transportContent: cityData.transportContent,
                climateContent: cityData.climateContent,
                climateTable: cityData.climateTable,
                conclusion: cityData.conclusion,
                featured: cityData.featured || false,
                metaDescription: cityData.metaDescription,
                country: countryId,
                locale,
            },
        }, { headers });

        console.log(`  ✓ Created city: ${cityData.name}`);
    } catch (error: any) {
        console.error(`  ✗ Error creating city ${cityData.name}:`, error.response?.data || error.message);
    }
}

// Main import function
async function importCities() {
    console.log('🚀 Starting city data import...\n');

    try {
        // Test connection
        await axios.get(`${STRAPI_URL}/_health`);
        console.log('✓ Connected to Strapi\n');
    } catch (error) {
        console.error('✗ Cannot connect to Strapi. Make sure it\'s running on', STRAPI_URL);
        process.exit(1);
    }

    let totalCountries = 0;
    let totalCities = 0;

    for (const countryData of citiesData) {
        console.log(`\n📍 Processing country: ${countryData.name}`);

        const countryId = await createOrFindCountry(
            countryData.name,
            countryData.slug,
            'ru'
        );

        totalCountries++;

        for (const city of countryData.cities) {
            await createCity(city, countryId, 'ru');
            totalCities++;
        }
    }

    console.log('\n✅ Import completed!');
    console.log(`   Countries: ${totalCountries}`);
    console.log(`   Cities: ${totalCities}`);
}

// Run import
importCities().catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
});
