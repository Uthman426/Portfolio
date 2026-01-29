import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

  if (!ADMIN_TOKEN) {
    return NextResponse.json({ success: false, message: "Missing ADMIN_TOKEN on server" }, { status: 500 });
  }

  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  // httpOnly cookie so JS cannot read it (better security)
  res.cookies.set("admin_auth", "true", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    // maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}

