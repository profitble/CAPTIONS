import { logger } from "./app/libs/logger";

const config = {
  // REQUIRED
  appName: "Cool Captions",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Generate Cool Captions!",
  // REQUIRED (no https://Cool Captions.xyz/, not trialing slash at the end, just the naked domain)
  domainName: "coolcaptions.xyz",
  lemonsqueezy: {
    storeId: "145415",
    productId: "429928",
    plans: [
      {
        variantId: 660614,
        name: "Hobby",
        price: 29,
        features: [
          { name: "AI Auto Captions (30 videos/mo)" },
          { name: "Export 1080p + 60 FPS" },
        ],
      },
      {
        variantId: 660583,
        name: "Pro", 
        price: 59,
        features: [
          { name: "Everything in hobby" },
          { name: "AI Auto Captions (Unlimited videos/mo)" },
          { name: "Premium & Custom Caption Themes" },
          { name: "Priority Support" },
        ],
      },
    ],
  },
  crisp: {
    id: "",
    onlyShowOnRoutes: ["/"],
  },
  mailgun: {
    subdomain: "mg",
    fromNoReply: `Cool Captions <noreply@mg.Cool Captions.xyz>`,
    fromAdmin: `Support at Cool Captions <support@2029.lol>`,
    supportEmail: "support@2029.lol",
    forwardRepliesTo: "support@2029.lol",
  },
  colors: {
    theme: "mytheme",
    main: "#8C52FF",
  },
  auth: {
    loginUrl: "/signin",
    callbackUrl: "/dashboard",
  },
};

logger.log(
  "[CONFIG] Loading LEMONSQUEEZY config with plans:",
  config.lemonsqueezy.plans
);

// Export LEMONSQUEEZY constants for easier access
export const LEMONSQUEEZY = {
  storeId: config.lemonsqueezy.storeId,
  productId: config.lemonsqueezy.productId,
  hobbyVariantId: config.lemonsqueezy.plans?.[0]?.variantId || 660614,
  proVariantId: config.lemonsqueezy.plans?.[1]?.variantId || 660583,
  webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/lemonsqueezy`,
  checkoutSuccess: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  checkoutCancel: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
};

logger.log("[CONFIG] LEMONSQUEEZY config initialized:", LEMONSQUEEZY);

// Authentication configuration (Google OAuth only)
export const AUTH_PROVIDERS = {
  google: {
    enabled: true,
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

export default config;
