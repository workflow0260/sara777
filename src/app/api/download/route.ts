import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Redirect seamlessly to the official verified APK bundle
    return NextResponse.redirect("https://sara777.in/api/download", {
      status: 307,
      headers: {
        "Content-Disposition": 'attachment; filename="Sara777.apk"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Download temporarily unavailable" }, { status: 500 });
  }
}
