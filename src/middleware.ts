import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n, type Locale } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    const locales: string[] = [...i18n.locales];
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    if (pathnameIsMissingLocale) {
        const country = (request as any).geo?.country || "US";
        const cisCountries = ["RU", "BY", "KZ", "UZ", "KG", "TJ", "TM", "AM", "AZ", "MD", "UA"];
        let targetLocale: Locale = i18n.defaultLocale;
        if (cisCountries.includes(country)) {
            targetLocale = "ru";
        }
        return NextResponse.redirect(
            new URL(
                `/${targetLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        );
    }
}
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
