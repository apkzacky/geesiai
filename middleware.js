import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/apis/authMiddleware";


// export const config = {
//     matcher: "/api/:path*"
// }


export default function middleware(request) {

    const authResult = authMiddleware(request)
    if (!authResult?.isValid) {
        return new NextResponse(JSON.stringify({ response: 'Unauthorized' }), { status: 401 })
    }
    return NextResponse.next()
}