import { NextResponse } from "next/server";
import { createCustomerPortal } from "@/libs/lemonsqueezy";
import { createClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const body = await req.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // User who are not logged in can't make a purchase
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to view billing information." },
        { status: 401 }
      );
    } else if (!body.returnUrl) {
      return NextResponse.json(
        { error: "Return URL is required" },
        { status: 400 }
      );
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (!data?.customer_id) {
      return NextResponse.json(
        {
          error: "You don't have a billing account yet. Make a purchase first.",
        },
        { status: 400 }
      );
    }

    const portalUrl = await createCustomerPortal({
      customerId: data.customer_id,
      returnUrl: body.returnUrl,
    });

    return NextResponse.json({
      url: portalUrl,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
