"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/libs/supabase/client";
import logo from "@/app/icon.png";
import config from "@/config";

const desktopLinks = [
  {
    href: "#testimonials",
    label: "Reviews", 
    isScroll: true,
  },
  {
    href: "mailto:support@2029.lol",
    label: "Support",
    isExternal: true,
  },
];

const mobileLinks = [
  {
    href: "https://chromewebstore.google.com/detail/Cool Captions+/dmjolonnolpemggfolncfiphipoiphgp",
    label: "Chrome Extension",
    isExternal: true,
  },
  {
    href: "mailto:support@2029.lol",
    label: "Support",
    isExternal: true,
  },
];

const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Close menu before scrolling to prevent visual glitches
      setIsOpen(false);
      // Small delay to ensure menu is closed
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  // Effect to handle body scroll and touch events when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Use position fixed only on iOS devices
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const renderCTA = () => {
    if (user) {
      return (
        <Link href="/dashboard" className="btn btn-primary">
          Dashboard
        </Link>
      );
    }
    return (
      <div className="flex gap-2">
        <Link href="/signin" className="btn btn-primary">
          Sign In
        </Link>
      </div>
    );
  };

  return (
    <header className={`bg-base-100 border-b ${isOpen ? 'relative z-50' : ''}`}>
      <nav className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 sm:gap-12">
          <Link
            className="flex items-center gap-2"
            href="/"
            title={`${config.appName} homepage`}
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-9 h-9 sm:w-10 sm:h-10"
              placeholder="blur"
              priority={true}
              width={40}
              height={40}
            />
            <span className="font-black text-xl sm:text-2xl" style={{ fontFamily: 'Bricolage Grotesque' }}>Cool Captions</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 sm:gap-8">
            {desktopLinks.map((link) =>
              link.isExternal ? (
                <a
                  href={link.href}
                  key={link.href}
                  className="text-base-content/70 hover:text-base-content transition-colors"
                  title={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : link.isScroll ? (
                <a
                  href={link.href}
                  key={link.href}
                  className="text-base-content/70 hover:text-base-content transition-colors"
                  title={link.label}
                  onClick={(e) => handleScroll(e, link.href)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  key={link.href}
                  className="text-base-content/70 hover:text-base-content transition-colors"
                  title={link.label}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div className="hidden md:block">{renderCTA()}</div>

        <button 
          className="md:hidden p-1.5 sm:p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile menu with improved touch handling */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-base-100 overscroll-none"
          role="dialog"
          aria-modal="true"
        >
          <div className="min-h-screen p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Link 
                href="/" 
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={logo}
                  alt={`${config.appName} logo`}
                  className="w-9 h-9 sm:w-10 sm:h-10"
                  placeholder="blur"
                  priority={true}
                  width={40}
                  height={40}
                />
                <span className="font-black text-xl sm:text-2xl" style={{ fontFamily: 'Bricolage Grotesque' }}>Cool Captions</span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-1 mb-4">
              {mobileLinks.map((link) =>
                link.isExternal ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="p-3 text-base hover:bg-base-200 rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-3 text-base hover:bg-base-200 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            <div className="mt-auto">
              {renderCTA()}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
