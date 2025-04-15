import { createClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new Response(
        JSON.stringify({
          error: "Not authenticated",
          discord: "https://discord.gg/WZtQEdUHMM",
        }),
        {
          status: 401,
          headers: corsHeaders,
        }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("has_access")
      .eq("id", session.user.id)
      .single();

    return new Response(
      JSON.stringify({
        isActive: !!profile?.has_access,
        status: profile?.has_access ? "active" : "inactive",
        details: profile,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Error in verify-subscription:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        discord: "https://discord.gg/WZtQEdUHMM",
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
