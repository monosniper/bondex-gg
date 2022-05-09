import {NextResponse} from "next/server";
import {$routes} from "../http/routes";

export default function middleware(req) {
    const { cookies, url } = req;
    const jwt = cookies.refreshToken

    if(!url.includes($routes.login) && !url.includes($routes.register)) {
        if(jwt === undefined) {
            return NextResponse.rewrite(new URL($routes.login, url))
        }

        try {
            return NextResponse.next()
        } catch (e) {
            return NextResponse.rewrite(new URL($routes.login, url))
        }
    }
}