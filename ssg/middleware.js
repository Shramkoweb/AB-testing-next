import { NextResponse } from 'next/server';
import data from './data.json';






export function middleware(request) {
    // return NextResponse.redirect(new URL('/blog', request.url));
}


// 1. фільтрує + куки
// 2. реврайт на готову сторінку
