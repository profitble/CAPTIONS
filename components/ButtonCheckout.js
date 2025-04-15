"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/libs/supabase/client";
import toast from "react-hot-toast";

export default function ButtonCheckout({ className, variantId, buttonText = "Get Started" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionState, setSubscriptionState] = useState({
    isLoading: true,
    isActive: false,
    status: null,
    error: null,
  });
  const router = useRouter();
  const supabase = createClient();

  // Get extensionId from URL if present
  const [extensionId, setExtensionId] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const extId = params.get('extensionId');
    if (extId) setExtensionId(extId);
  }, []);

  // Check subscription status on mount
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          setSubscriptionState({
            isLoading: false,
            isActive: false,
            status: "unauthenticated",
            error: null,
          });
          return;
        }

        const response = await fetch("/api/verify-subscription");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify subscription");
        }

        setSubscriptionState({
          isLoading: false,
          isActive: data.isActive,
          status: data.status,
          details: data.details,
          error: null,
        });
      } catch (error) {
        console.error("Error checking subscription:", error);
        setSubscriptionState({
          isLoading: false,
          isActive: false,
          status: "error",
          error: error.message,
        });
        toast.error("Failed to verify subscription status");
      }
    };

    checkSubscription();
  }, [supabase]);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      // Check if user is logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // If extension flow, include extensionId in signin redirect
        if (extensionId) {
          router.push(`/signin?extensionId=${extensionId}`);
        } else {
          router.push("/signin");
        }
        return;
      }

      // Create checkout session
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://Cool Captions.xyz';
      const response = await fetch("/api/lemonsqueezy/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId: Number(variantId),
          success_url: extensionId 
            ? `${baseUrl}/auth/callback?extensionId=${extensionId}` 
            : `${baseUrl}/dashboard`,
          cancel_url: extensionId
            ? `${baseUrl}/pricing?extensionId=${extensionId}`
            : `${baseUrl}/pricing`,
          custom: {
            user_id: user.id,
            ...(extensionId && { extension_id: extensionId })
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Checkout error:", data);
        toast.error(data.error || "Failed to create checkout session");
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("No checkout URL received");
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to create checkout session");
      setIsLoading(false);
    }
  };

  // Show loading state
  if (subscriptionState.isLoading) {
    return (
      <button
        className={`w-full h-14 text-white bg-[#8c52fe] focus:ring-4 focus:outline-none focus:ring-white/30 shadow-lg shadow-[#8c52fe]/50 font-medium rounded-lg text-base sm:text-lg px-5 py-2.5 text-center flex items-center justify-center gap-2 ${className || ""}`}
        disabled
      >
        <span className="loading loading-spinner loading-sm"></span>
        Checking Status...
      </button>
    );
  }

  // Show error state
  if (subscriptionState.error) {
    return (
      <button
        className={`w-full h-14 text-white bg-[#8c52fe] focus:ring-4 focus:outline-none focus:ring-white/30 shadow-lg shadow-[#8c52fe]/50 font-medium rounded-lg text-base sm:text-lg px-5 py-2.5 text-center ${className || ""}`}
        onClick={() => window.location.reload()}
      >
        Retry Check
      </button>
    );
  }

  // Show checkout button
  return (
    <button
      onClick={!subscriptionState.isActive ? handleClick : undefined}
      className={`w-full h-14 text-white bg-[#8c52fe] focus:ring-4 focus:outline-none focus:ring-white/30 shadow-lg shadow-[#8c52fe]/50 font-medium rounded-lg text-base sm:text-lg px-5 py-2.5 text-center flex items-center justify-center gap-2 ${className || ""}`}
      disabled={subscriptionState.isActive || isLoading}
      aria-disabled={subscriptionState.isActive || isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <span>{buttonText}</span>
      )}
    </button>
  );
}
