import { NextResponse } from 'next/server';

export function jsonResponse(status: number, data: any, init?: ResponseInit) {
    return new NextResponse(JSON.stringify(data), {
        ...init,
        status,
        headers: {
            ...init?.headers,
            'Content-Type': 'application/json',
        },
    });
}
