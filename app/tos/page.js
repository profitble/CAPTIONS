import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Terms of Service | ${config.appName}`,
  canonicalUrlRelative: "/terms-of-service",
});

const TermsOfService = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">Terms of Service</h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: January 1, 2025

Welcome to Cool Captions ("Service"). These Terms of Service ("Terms") govern your use of the Service. By accessing or using the Service, you agree to be bound by these Terms. Please read them carefully before proceeding.

1. Service Description
Cool Captions is an AI-powered image analysis and processing platform designed to provide educational insights through the use of advanced artificial intelligence technologies. The platform uses the GPT-4 Vision API for image understanding and offers features such as image analysis, processing, and compression. The Service is built with robust security protocols and provides API-based functionality for seamless user interaction.

Cool Captions does not use Amazon Web Services (AWS) for its infrastructure. Instead, the Service operates through alternative providers to ensure scalability, security, and privacy.

2. Account and Authentication
To use Cool Captions, you must be at least 18 years old and create an account with accurate and up-to-date information. Authentication is conducted through secure methods, including token-based systems such as JWT. Users are responsible for maintaining the confidentiality of their API keys and account credentials. Any activity occurring under your account is your responsibility.

The Service uses encrypted data transmission, routine security updates, and endpoint protection to safeguard user information. However, users are required to follow best practices for credential management and promptly report any security incidents they observe.

3. User Rights and Responsibilities
As a user, you have the right to access the features of the Service, control your personal data in accordance with our Privacy Policy, and terminate your account at any time. Cool Captions will notify you about important service updates and changes.

Users must maintain accurate account information, use the Service lawfully, and ensure their activities align with these Terms. If you use the Service to engage in unethical practices, such as cheating on exams or assignments, and face consequences, Cool Captions is not liable. Misuse of the Service, including breaches of law or violations of these Terms, may result in account suspension or termination.

4. Acceptable Use Policy
You agree not to use the Service for unauthorized automated access, reverse engineering, or malicious activities, such as distributing harmful code or content. Any uploaded content must comply with applicable intellectual property laws and respect the rights of others. The Service reserves the right to reject, block, or remove content that violates these guidelines.

5. Technical Requirements
The Service may impose technical limitations, such as rate-limiting on API requests. If you exceed these limits, the Service may temporarily restrict access. Images uploaded for analysis must comply with specified file size, format, and dimension requirements. The Service applies compression and other processing methods to optimize performance, and any technical limitations will be disclosed to users.

6. Third-Party Services
Cool Captions integrates with third-party APIs, including OpenAI's GPT-4 Vision API and other essential tools. While these services are critical for functionality, Cool Captions is not liable for disruptions or changes in third-party services that may impact the user experience. Users are also subject to the terms and policies of the third-party providers.

7. Intellectual Property Rights
Cool Captions retains all intellectual property rights to its platform, including the underlying code, infrastructure, branding, and documentation. Users retain ownership of the content they upload, but by using the Service, you grant Cool Captions a limited license to process and analyze this content. Redistribution of Service features or content is prohibited.

8. Privacy and Data Protection
Cool Captions collects and processes data in accordance with its Privacy Policy. The platform is designed to comply with relevant data protection regulations, such as GDPR and CCPA. Users retain control over their personal data and may request its deletion at any time.

The Service implements industry-standard security measures, such as encrypted data transmission and regular security assessments, to protect user information. In the event of a data breach, users will be notified promptly.

9. Termination
You may terminate your account at any time, and upon request, Cool Captions will delete your data as outlined in its Privacy Policy. If you violate these Terms, Cool Captions reserves the right to terminate your access to the Service. In such cases, we will provide notice when feasible, and you may appeal the decision.

10. Liability and Warranties
Cool Captions is provided "as is" without any guarantees of uninterrupted availability or specific outcomes. The platform is subject to technical limitations and potential disruptions.

Liability for any damages is limited to the fees you have paid for the Service. Cool Captions is not responsible for indirect, incidental, or consequential damages, nor for issues caused by external events such as technical failures or force majeure.

11. Dispute Resolution
In the event of a dispute, you agree to attempt to resolve it in good faith by providing written notice and allowing a 30-day resolution period. If resolution cannot be achieved, disputes may be subject to binding arbitration, with costs shared between the parties. You agree to waive any right to participate in class action lawsuits.

12. Changes to Terms
Cool Captions reserves the right to modify these Terms. Significant changes will be communicated to users through email or service notifications. By continuing to use the Service after changes are made, you agree to the updated Terms. Previous versions of the Terms will be archived for reference.

13. Contact Information
For questions or concerns about these Terms, you can contact us at:

Email: support@2029.lol
Response Time: 2-3 business days
Business Hours: Monday to Friday

14. Google Services Compliance
Cool Captions complies with Google's API and analytics policies. User tracking is implemented with privacy-friendly settings, and users can opt out of data collection at any time.`}
        </pre>
      </div>
    </main>
  );
};

export default TermsOfService;
