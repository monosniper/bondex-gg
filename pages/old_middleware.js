import {NextResponse} from "next/server";
import {$routes} from "../http/routes";

export default function middleware(req) {
    const { cookies, url } = req;
    const jwt = cookies.token

    if(!url.includes($routes.login) && !url.includes($routes.register)) {
        if(jwt === undefined) {
            return NextResponse.rewrite(new URL($routes.login, url))
        }

        return NextResponse.next()
    }
}