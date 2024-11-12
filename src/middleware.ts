import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes: { path: string; roles: string[]; redirect: string }[] = [
	{ path: "/jukir", roles: ["tukang"], redirect: "/jukir-sign-in" },
	{ path: "/mitra", roles: ["store"], redirect: "/mitra-sign-in" },
];

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;

	if (!token) {
		const currentRoute = protectedRoutes.find((route) => req.nextUrl.pathname.startsWith(route.path));
		if (currentRoute) {
			return NextResponse.redirect(new URL(currentRoute.redirect, req.url));
		}
		return NextResponse.redirect(new URL("/", req.url));
	}

	let user;
	try {
		user = JSON.parse(atob(token.split(".")[1]));
	} catch (error) {
		console.error("Invalid token");
		return NextResponse.redirect(new URL("/", req.url));
	}

	const currentRoute = protectedRoutes.find((route) => req.nextUrl.pathname.startsWith(route.path));

	if (currentRoute && !currentRoute.roles.includes(user.role)) {
		return NextResponse.redirect(new URL(currentRoute.redirect, req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/jukir/:path*", "/mitra/:path*"],
};
