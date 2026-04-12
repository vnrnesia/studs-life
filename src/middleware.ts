import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n, type Locale } from "./i18n-config";

// Map browser language codes to supported locales.
// Only explicitly supported languages map to non-ru locales.
// Everything else (tr, de, fr, etc.) defaults to ru.
const LANG_MAP: Record<string, Locale> = {
    ru: 'ru',
    be: 'ru', // Belarusian → Russian
    uk: 'ru', // Ukrainian → Russian
    kk: 'ru', // Kazakh → Russian
    tk: 'tk', // Turkmen
    uz: 'oz', // Uzbek
    en: 'en',
};

function getLocale(request: NextRequest): Locale {
    const acceptLanguage = request.headers.get('accept-language') || '';
    // Only check the PRIMARY language (first entry), ignore browser fallbacks like en.
    // e.g. "tr,en;q=0.9" → primary is "tr" → not in map → default "ru"
    const primaryLang = acceptLanguage
        .split(',')[0]
        .split(';')[0]
        .trim()
        .toLowerCase()
        .split('-')[0];

    return LANG_MAP[primaryLang] ?? i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        );
    }
}
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|trusts).*)"],
};
