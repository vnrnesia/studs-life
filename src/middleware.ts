import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n, type Locale } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        // IP-based detection using Vercel's geolocation
        const country = (request as any).geo?.country || "US";
        const cisCountries = ["RU", "BY", "KZ", "UZ", "KG", "TJ", "TM", "AM", "AZ", "MD", "UA"];

        // Explicit rule from requirements: 
        // If the user is from Russia or CIS countries, set locale to ru.
        let targetLocale: Locale = i18n.defaultLocale;
        if (cisCountries.includes(country)) {
            targetLocale = "ru";
        }

        // However, we should also respect browser preference if it's not overriding the requirement?
        // Requirement says: "If user is from Russia... set locale to ru. Else set to en."
        // It doesn't strictly say "ignore browser language", but "set locale".
        // Let's use the explicit logic for the default redirect.

        // But we need to be careful not to override if the user already has a preference (cookie?)
        // For now, simple redirect.

        return NextResponse.redirect(
            new URL(
                `/${targetLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
