import {NextResponse, userAgent} from 'next/server';
import {UAParser} from 'ua-parser-js';


export const TEST_GROUP_COOKIE_NAME = 'test_group';

export const AbTestData = {
    'ab-name-1': {
        URLs: [],
        segment: {
            from: 0,
            to: 50
        }
    },
    'ab-name-2': {
        URLs: ['/blog'],
        segment: {
            from: 50,
            to: 100
        }
    }
}

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const {ua} = userAgent(request);
    let parser = new UAParser(ua); // you need to pass the user-agent for nodejs

    console.log(parser.getResult())
    if (!request.cookies.has(TEST_GROUP_COOKIE_NAME)) {
        const testGroup = Math.floor(Math.random() * 100).toString();

        // set headers for getServerSideProps
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set(TEST_GROUP_COOKIE_NAME, testGroup);

        // Update response
        const response = NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        });


        // set cookies for old site parts
        response.cookies.set(TEST_GROUP_COOKIE_NAME, testGroup);

        return response;
    }

    const {value} = request.cookies.get(TEST_GROUP_COOKIE_NAME);

    // set headers for getServerSideProps
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(TEST_GROUP_COOKIE_NAME, value);

    // Update response
    const response = NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    });

    return response;
}
