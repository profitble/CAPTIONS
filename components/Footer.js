import Link from "next/link";
import config from "@/config";

const Footer = () => {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-base-content/60 text-sm">
            © {new Date().getFullYear()} {config.appName}. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href="/tos"
              className="text-base-content/60 hover:text-base-content"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-base-content/60 hover:text-base-content"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
