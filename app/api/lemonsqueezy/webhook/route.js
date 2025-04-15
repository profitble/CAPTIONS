import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import crypto from "crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Webhook CORS headers - allow Lemon Squeezy's domain
const webhookCorsHeaders = {
  "Access-Control-Allow-Origin": "https://api.lemonsqueezy.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Signature",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: webhookCorsHeaders
  });
}

export async function POST(req) {
  try {
    // Retrieve the raw body as a buffer
    const rawBody = await req.text();

    // Validate webhook signature
    const signature = req.headers.get("X-Signature");
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500, headers: webhookCorsHeaders }
      );
    }

    // Verify webhook signature
    const computedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (signature !== computedSignature) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 403, headers: webhookCorsHeaders }
      );
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const data = payload.data;

    // Handle different event types
    switch (eventName) {
      case "order_created": {
        const userId = data.attributes.custom_data.user_id;
        const customerId = data.attributes.customer_id;

        // Update the user's profile with customer_id
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ customer_id: customerId })
          .eq("id", userId);

        if (updateError) {
          console.error("Database error:", updateError);
          return NextResponse.json(
            { error: "Database operation failed" },
            { status: 500, headers: webhookCorsHeaders }
          );
        }
        break;
      }

      case "order_paid": {
        const userId = data.attributes.custom_data.user_id;
        const extensionId = data.attributes.custom_data.extension_id;

        // Update the user's access status
        const { error: accessError } = await supabase
          .from("profiles")
          .update({ has_access: true })
          .eq("id", userId);

        if (accessError) {
          console.error("Database error:", accessError);
          return NextResponse.json(
            { error: "Database operation failed" },
            { status: 500, headers: webhookCorsHeaders }
          );
        }

        // If this was an extension purchase, store the extension ID
        if (extensionId) {
          const { error: extensionError } = await supabase
            .from("profiles")
            .update({ extension_id: extensionId })
            .eq("id", userId);

          if (extensionError) {
            console.error("Database error:", extensionError);
            return NextResponse.json(
              { error: "Database operation failed" },
              { status: 500, headers: webhookCorsHeaders }
            );
          }
        }
        break;
      }

      case "subscription_created":
      case "subscription_updated":
      case "subscription_resumed": {
        const userId = data.attributes.custom_data.user_id;
        const extensionId = data.attributes.custom_data.extension_id;

        // Update subscription status
        const { error: subError } = await supabase
          .from("profiles")
          .update({ 
            has_access: true,
            subscription_id: data.id,
            subscription_status: data.attributes.status,
            ...(extensionId && { extension_id: extensionId })
          })
          .eq("id", userId);

        if (subError) {
          console.error("Database error:", subError);
          return NextResponse.json(
            { error: "Database operation failed" },
            { status: 500, headers: webhookCorsHeaders }
          );
        }
        break;
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        const subscriptionId = data.id;
        
        // Find user by subscription ID and update access
        const { data: profile, error: findError } = await supabase
          .from("profiles")
          .select("id, extension_id")
          .eq("subscription_id", subscriptionId)
          .single();

        if (findError) {
          console.error("Database error:", findError);
          return NextResponse.json(
            { error: "Database operation failed" },
            { status: 500, headers: webhookCorsHeaders }
          );
        }

        if (profile) {
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ 
              has_access: false,
              subscription_status: data.attributes.status
            })
            .eq("id", profile.id);

          if (updateError) {
            console.error("Database error:", updateError);
            return NextResponse.json(
              { error: "Database operation failed" },
              { status: 500, headers: webhookCorsHeaders }
            );
          }
        }
        break;
      }

      default:
        console.log("Unhandled event:", eventName);
    }

    return NextResponse.json({ success: true }, { headers: webhookCorsHeaders });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500, headers: webhookCorsHeaders }
    );
  }
}
