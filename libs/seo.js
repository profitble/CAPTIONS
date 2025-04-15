import config from "@/config";
import { LEMONSQUEEZY } from "@/config";

/**
 * Generate comprehensive SEO tags for pages
 * @param {Object} options - SEO configuration options
 * @returns {Object} Next.js metadata object
 */
export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  robots,
  verification,
  extraTags,
} = {}) => {
  const defaultTitle = title || config.appName;
  const defaultDescription = description || config.appDescription;
  const baseUrl = `https://${config.domainName}`;

  return {
    // Basic Metadata
    title: defaultTitle,
    description: defaultDescription,
    keywords: keywords || [config.appName, "study tool", "education", "learning", "academic help"],
    applicationName: config.appName,
    authors: [{ name: "Cool Captions Team" }],
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    colorScheme: "light dark",
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
    },
    
    // Base URL for metadata
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : baseUrl
    ),

    // Open Graph
    openGraph: {
      title: openGraph?.title || defaultTitle,
      description: openGraph?.description || defaultDescription,
      url: openGraph?.url || baseUrl,
      siteName: openGraph?.siteName || defaultTitle,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${config.appName} - ${config.appDescription}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      site: "@Cool Captions",
      creator: "@Cool Captions",
      title: openGraph?.title || defaultTitle,
      description: openGraph?.description || defaultDescription,
      images: [`${baseUrl}/twitter-image.png`],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      ...robots,
    },

    // Verification
    verification: {
      google: verification?.google,
      yandex: verification?.yandex,
      yahoo: verification?.yahoo,
      other: verification?.other,
    },

    // Icons
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/favicon-32x32.png",
        },
      ],
    },

    // Manifest
    manifest: "/manifest.json",

    // Canonical URL
    ...(canonicalUrlRelative && {
      alternates: { 
        canonical: canonicalUrlRelative,
        languages: {
          "en-US": `${baseUrl}${canonicalUrlRelative}`,
        },
      },
    }),

    // Additional tags
    ...extraTags,
  };
};

/**
 * Generate structured data for rich results in search engines
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
export const renderSchemaTags = () => {
  const hobbyPlan = LEMONSQUEEZY.hobbyVariantId 
    ? config.lemonsqueezy?.plans?.find(p => p.variantId === LEMONSQUEEZY.hobbyVariantId)
    : null;

  const proPlan = LEMONSQUEEZY.proVariantId
    ? config.lemonsqueezy?.plans?.find(p => p.variantId === LEMONSQUEEZY.proVariantId)
    : null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: config.appName,
          description: config.appDescription,
          image: `https://${config.domainName}/icon.png`,
          url: `https://${config.domainName}/`,
          applicationCategory: "EducationalApplication",
          operatingSystem: "Chrome Extension",
          offers: [
            hobbyPlan && {
              "@type": "Offer",
              name: hobbyPlan.name,
              price: hobbyPlan.price,
              priceCurrency: "USD",
              priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              availability: "https://schema.org/InStock",
            },
            proPlan && {
              "@type": "Offer",
              name: proPlan.name,
              price: proPlan.price,
              priceCurrency: "USD",
              priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
              availability: "https://schema.org/InStock",
            },
          ].filter(Boolean),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "530000",
            bestRating: "5",
            worstRating: "1",
          },
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Michael Thompson",
            },
            reviewBody: "Fully undetectable!! Exceeded my expectations and helped me get through my finals!!",
          },
          creator: {
            "@type": "Organization",
            name: "Cool Captions",
            url: `https://${config.domainName}/`,
          },
          datePublished: "2024-01-01",
          dateModified: new Date().toISOString(),
        }),
      }}
    />
  );
};
