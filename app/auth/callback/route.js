import { NextResponse } from "next/server";

export async function GET(request) {
  // TEMPORARY CHANGE FOR DEVELOPMENT - RESTORE BEFORE PRODUCTION
  const requestUrl = new URL(request.url);
  const extensionId = requestUrl.searchParams.get("extensionId");

  // If this is from extension, return a mock token
  if (extensionId) {
    const mockToken = "development_mock_token";
    return NextResponse.redirect(
      `chrome-extension://${extensionId}/popup.html?token=${mockToken}`
    );
  }

  // Regular web login - redirect to dashboard
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
