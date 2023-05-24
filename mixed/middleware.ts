import {NextRequest, NextResponse} from 'next/server';
import {mockedResponse, Test, TestVariant} from "@/constants";

const TEST_GROUP_COOKIE_NAME = 'test_group';

function cryptoRandom() {
    return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)
}

// TODO implement correct logic with random + branch weight separation
function getVariantByWeight(variants: TestVariant[]): TestVariant {
    // CHANGE in DEMO
    return variants[0];
}


function getCookiesFromTests(tests: [string, Test][]) {
    return tests.map(([testName, test]) => {
        const variant = getVariantByWeight(test.variants);

        return {testName, testValue: variant.branch};
    });
}

/* Подумати чи можна зробити якусь структуру, щоб генерувати матчер на основі JSON
Тоді відпадає задача фільтрації під час Request */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

export function middleware(req: NextRequest) {
    const res = NextResponse.rewrite(req.nextUrl);

    // // simple redirect to AB page
    // // Will use AbTestProvider logic
    // return NextResponse.rewrite(req.nextUrl.href + 'blog/second-article');


    // AbTestProvider (example) with cookies
    if (!req.cookies.get(TEST_GROUP_COOKIE_NAME)) {
        const testGroup = Math.floor(Math.random() * 100).toString();
        res.cookies.set(TEST_GROUP_COOKIE_NAME, testGroup);
    } else {
        // type fix
        const testGroup = parseInt(req.cookies.get(TEST_GROUP_COOKIE_NAME)?.value as string, 10);
        console.log({testGroup})

        // AbTestProvider logic
        const filteredTests = Object.entries(mockedResponse).filter(abtest => {
            const [
                _,
                {
                    segment,
                    locales,
                    URLs,
                    os,
                },] = abtest;


            // TODO - will be ok after cloudflare implementation and access to userAgent
            const testLocale = req.nextUrl.pathname.split('/')[1] === 'fr' ? 'fr' : '';

            // TODO - will be ok after cloudflare implementation and access to userAgent
            const isOsAllowed = os.includes('mobile');
            const isURLAllowed = URLs.length === 0 ? true : URLs.includes(req.nextUrl.pathname);

            // Filtration
            const inSegmentRange = segment.from <= testGroup && segment.to >= testGroup;
            if (testLocale === 'fr') {
                const isLocaleAllowed = locales.includes(testLocale);

                return isLocaleAllowed && inSegmentRange && isOsAllowed && isURLAllowed;
            }

            return inSegmentRange && isOsAllowed && isURLAllowed;
        });


        // Setting cookies
        const testCookies = getCookiesFromTests(filteredTests);
        console.log(testCookies)

        // IMPORTANT if no-one test is  applied  = we need RM cookies
        if (testCookies.length === 0) {
            Object.keys(mockedResponse).forEach(cookie => {
                res.cookies.delete(cookie)
            })
        } else {
            // SET ACTIVE TEST cookies
            testCookies.forEach(cookie => {
                res.cookies.set(cookie.testName, cookie.testValue)
            })
        }
    }

    return res;
}
