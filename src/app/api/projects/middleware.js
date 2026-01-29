import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isCreateProject = pathname === "/api/projects" && req.method === "POST";

  if (!isAdminPage && !isCreateProject) return NextResponse.next();

  const adminCookie = req.cookies.get("admin_auth")?.value;

  // If not authenticated:
  if (adminCookie !== "true") {
    // Block POST calls
    if (isCreateProject) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Redirect /admin to login page
    const url = req.nextUrl.clone();
    url.pathname = "/admin-login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/projects"],
};
