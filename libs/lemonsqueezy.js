import { LemonSqueezy } from "@lemonsqueezy/lemonsqueezy.js";

// Initialize the client only on server-side
let lemonClient;
if (typeof window === "undefined") {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (apiKey) {
    lemonClient = new LemonSqueezy(apiKey);
  }
}

export const createCheckoutSession = async (options) => {
  try {
    if (!lemonClient) {
      throw new Error("LemonSqueezy client not initialized");
    }

    const checkout = await lemonClient.createCheckout(options);

    if (!checkout?.data?.attributes?.url) {
      throw new Error("Invalid checkout response");
    }

    return checkout.data.attributes.url;
  } catch (error) {
    console.error("Checkout creation error:", error);
    throw error;
  }
};

export const createCustomerPortal = async ({ customerId, returnUrl }) => {
  try {
    if (!lemonClient) {
      throw new Error("LemonSqueezy client not initialized");
    }

    if (!customerId) {
      throw new Error("Customer ID is required");
    }

    const portalSession = await lemonClient.createCustomerPortalLink({
      customer: customerId,
      return_url: returnUrl,
    });

    if (!portalSession?.data?.attributes?.url) {
      throw new Error("Invalid portal session response");
    }

    return portalSession.data.attributes.url;
  } catch (error) {
    console.error("Portal creation error:", error);
    throw error;
  }
};

export const findCheckoutSession = async (sessionId) => {
  try {
    if (!lemonClient) {
      throw new Error("LemonSqueezy client not initialized");
    }

    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    const session = await lemonClient.getCheckout(sessionId);
    return session.data;
  } catch (error) {
    console.error("Checkout retrieval error:", error);
    throw error;
  }
};
