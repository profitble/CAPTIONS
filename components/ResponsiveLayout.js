'use client';

import { useEffect, useState } from "react";

export default function ResponsiveLayout({ desktopContent, mobileContent }) {
  const [isMobile, setIsMobile] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render anything until we know which layout to show
  if (!mounted) return null;

  return isMobile ? mobileContent : desktopContent;
} 