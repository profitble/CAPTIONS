import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/libs/lemonsqueezy";
import { createClient } from "@/libs/supabase/server";
import { LEMONSQUEEZY } from "@/config";

export async function POST() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const checkoutUrl = await createCheckoutSession({
      variantId: LEMONSQUEEZY.variantId,
      successUrl: LEMONSQUEEZY.checkoutSuccess,
      cancelUrl: LEMONSQUEEZY.checkoutCancel,
      clientReferenceId: user.id,
      user: {
        email: user.email,
      },
    });

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
