import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest){

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.ip || "null";

    const allowedIps = process.env.ALLOWED_IPS?.split(',') || [];

    if (!allowedIps.includes(ip)) {
        return new NextResponse('Forbidden', { status: 403 });
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/SendMessage']
}