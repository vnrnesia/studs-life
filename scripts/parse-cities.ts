/**
 * Automated Parser for City Content
 * 
 * This script reads the cities-content.txt file and converts it to cities-data.ts format
 * 
 * Usage:
 * 1. Save your city content to: C:\Users\vnrnesia\Desktop\cities-content.txt
 * 2. Run: npx tsx scripts/parse-cities.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface Season {
    name: string;
    temperature: string;
    features: string;
}

interface City {
    name: string;
    slug: string;
    title: string;
    intro: string;
    economyContent: string;
    housingContent: string;
    transportContent: string;
    climateContent: string;
    climateTable: { seasons: Season[] } | null;
    conclusion: string;
    featured: boolean;
    metaDescription: string;
}

interface Country {
    name: string;
    slug: string;
    cities: City[];
}

// Helper: Convert text to slug
function slugify(text: string): string {
    const cyrillicToLatin: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        'і': 'i', 'ї': 'yi', 'є': 'ye'
    };

    return text
        .toLowerCase()
        .split('')
        .map(char => cyrillicToLatin[char] || char)
        .join('')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Helper: Convert text to HTML
function textToHtml(text: string): string {
    if (!text) return '';

    // Split by paragraphs
    const paragraphs = text.split('\n').filter(p => p.trim());

    let html = '';
    let inList = false;

    for (let para of paragraphs) {
        para = para.trim();

        // Skip empty lines
        if (!para) continue;

        // Headers (lines ending with :)
        if (para.match(/^[А-ЯЁ].+:$/)) {
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += `<h3>${para.replace(/:$/, '')}</h3>\n`;
            continue;
        }

        // List items (starting with numbers or bullets)
        if (para.match(/^[0-9]+\.|^•|^-/)) {
            if (!inList) {
                html += '<ul>\n';
                inList = true;
            }
            const content = para.replace(/^[0-9]+\.\s*|^[•-]\s*/, '');
            html += `<li>${content}</li>\n`;
            continue;
        }

        // Emoji headers
        if (para.match(/^[🔹💡❄️☀️🌧️🍂🌸]/)) {
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += `<h3>${para}</h3>\n`;
            continue;
        }

        // Blockquotes (starting with 💡)
        if (para.includes('💡 Совет:') || para.includes('💡 Вывод:')) {
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += `<blockquote><p>${para}</p></blockquote>\n`;
            continue;
        }

        // Regular paragraphs
        if (inList) {
            html += '</ul>\n';
            inList = false;
        }
        html += `<p>${para}</p>\n`;
    }

    if (inList) {
        html += '</ul>\n';
    }

    return html.trim();
}

// Main parser function
function parseContent(content: string): Country[] {
    const countries: Country[] = [];

    // Split by country headers (lines with just country name in caps)
    const countryBlocks = content.split(/\n(?=[А-ЯЁ]{3,}\n)/);

    for (const block of countryBlocks) {
        const lines = block.split('\n').filter(l => l.trim());
        if (lines.length === 0) continue;

        // First line is country name
        const countryName = lines[0].trim();
        if (countryName.length < 3) continue;

        const country: Country = {
            name: countryName,
            slug: slugify(countryName),
            cities: []
        };

        // Find all city titles (lines with —)
        let currentCity: Partial<City> | null = null;
        let currentSection = '';
        let sectionContent = '';

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();

            // City title (contains —)
            if (line.includes(' — ')) {
                // Save previous city
                if (currentCity && currentCity.name) {
                    if (sectionContent) {
                        (currentCity as any)[currentSection] = textToHtml(sectionContent);
                    }
                    country.cities.push(currentCity as City);
                }

                // Start new city
                const [cityName, subtitle] = line.split(' — ');
                currentCity = {
                    name: cityName.trim(),
                    slug: slugify(cityName.trim()),
                    title: line,
                    intro: '',
                    economyContent: '',
                    housingContent: '',
                    transportContent: '',
                    climateContent: '',
                    climateTable: null,
                    conclusion: '',
                    featured: false,
                    metaDescription: subtitle?.substring(0, 160) || ''
                };
                currentSection = 'intro';
                sectionContent = '';
                continue;
            }

            // Section headers
            if (line.includes('💰 Экономика')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'economyContent';
                sectionContent = '';
                continue;
            }

            if (line.includes('🏠 Варианты проживания') || line.includes('🏠 Проживание')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'housingContent';
                sectionContent = '';
                continue;
            }

            if (line.includes('🚇') || line.includes('🚍') || line.includes('Транспорт')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'transportContent';
                sectionContent = '';
                continue;
            }

            if (line.includes('🌦️') || line.includes('🌤️') || line.includes('Климат')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'climateContent';
                sectionContent = '';
                continue;
            }

            if (line.includes('🎯 Итог') || line.includes('✨ Итог')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'conclusion';
                sectionContent = '';
                continue;
            }

            // Accumulate content
            sectionContent += line + '\n';
        }

        // Save last city
        if (currentCity && currentCity.name) {
            if (sectionContent) {
                (currentCity as any)[currentSection] = textToHtml(sectionContent);
            }
            country.cities.push(currentCity as City);
        }

        if (country.cities.length > 0) {
            countries.push(country);
        }
    }

    return countries;
}

// Main execution
async function main() {
    const inputPath = path.join('C:', 'Users', 'vnrnesia', 'Desktop', 'cities-content.txt');
    const outputPath = path.join(__dirname, 'data', 'cities-data.ts');

    console.log('🔍 Reading input file:', inputPath);

    if (!fs.existsSync(inputPath)) {
        console.error('❌ File not found:', inputPath);
        console.log('\n📝 Please create the file with your city content.');
        process.exit(1);
    }

    const content = fs.readFileSync(inputPath, 'utf-8');
    console.log('✅ File loaded, parsing...');

    const countries = parseContent(content);
    console.log(`\n✅ Parsed ${countries.length} countries`);

    countries.forEach(country => {
        console.log(`   📍 ${country.name}: ${country.cities.length} cities`);
    });

    // Generate TypeScript file
    let output = `/**
 * Auto-generated city data from cities-content.txt
 * Generated on: ${new Date().toISOString()}
 */

export const citiesData = ${JSON.stringify(countries, null, 2)};
`;

    fs.writeFileSync(outputPath, output, 'utf-8');
    console.log('\n✅ Output written to:', outputPath);
    console.log('\n🎉 Done! You can now run: npx tsx scripts/import-cities.ts');
}

main().catch(console.error);
