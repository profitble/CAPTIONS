import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
        <h1 className="text-3xl font-extrabold pb-6">Privacy Policy</h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: January 1, 2025

Thank you for using Cool Captions ("we," "us," or "our"). This Privacy Policy explains how we collect, use, and protect your information when you use our website, Cool Captions.xyz, and the associated browser extension (together, the "Service").

By accessing or using the Service, you agree to this Privacy Policy. If you do not agree, please do not use the Service.

1. Information We Collect
We collect the following types of information to provide and improve the Service:

1.1 Personal Data
We collect your email address, authentication details such as passwords and security questions, and secure tokens (JWT) for authentication purposes.

1.2 User Content
This includes any images you upload, as well as text, videos, or other content you provide while using the Service.

1.3 Usage Data
We gather information about your interactions with the Service, including your IP address, browser type and version, device information, pages visited, time spent on the Service, and referral sources.

1.4 Cookies and Tracking Technologies
We use cookies to ensure the functionality of the Service, analyze usage, and remember your preferences. These include essential cookies for core features, analytics cookies for understanding usage patterns, preference cookies for settings, and security cookies to protect your account. You can manage your cookie preferences through your browser settings.

2. Data Processing and Third-Party Services
2.1 Image Processing
Images uploaded to the Service may be compressed and analyzed using artificial intelligence technologies. Metadata may also be stored to enhance the Service's performance.

2.2 External Services
The Service integrates with third-party providers to enhance its functionality. We use OpenAI's GPT-4 Vision API for image analysis and other API providers for processing and hosting. Unlike previously mentioned setups, Cool Captions does not rely on AWS for its infrastructure. Instead, alternative providers ensure reliable and secure operations.

3. Use of Data
Your data is processed for the following purposes:

To provide and maintain the Service.
To process and analyze images and other content.
To authenticate and secure user accounts.
To send notifications about changes to the Service.
To enable interactive features and provide customer support.
To monitor usage patterns, detect issues, and enhance the Service.
To comply with legal obligations and improve overall performance.
If you use the Service for unethical activities, such as cheating, and face consequences, Cool Captions is not responsible.

4. Data Security and Transfer
4.1 Security Measures
Cool Captions uses industry-standard practices, including token-based authentication, encrypted data transmission (SSL/TLS), secure API endpoints, and regular security audits to protect user information.

4.2 International Data Transfer
Your data may be transferred and processed in jurisdictions outside your location. We ensure that appropriate safeguards, such as standard contractual clauses, are in place for all international transfers.

5. Legal Basis for Processing
5.1 GDPR (European Users)
For users in the EU, we process your data based on contractual necessity, your consent, legitimate interests, and compliance with legal obligations.

5.2 CCPA (California Users)
California residents have the right to know what personal information is collected, request access to or deletion of their data, and opt out of the sale of personal information.

6. Data Retention and Deletion
6.1 Retention Period
Personal data is retained only as long as necessary for the purposes outlined in this policy. Usage data is generally kept for shorter durations unless required for security or legal obligations.

6.2 Data Deletion
To request data deletion:

Log into your account.
Navigate to the Account Settings page.
Select "Delete My Data."
Alternatively, email support@2029.lol with the subject "Data Deletion Request."

7. Disclosure of Data
We may disclose data in the following cases:

To third-party service providers (e.g., OpenAI and other API providers).
To comply with legal obligations or law enforcement requests.
To protect the rights, safety, and integrity of Cool Captions and its users.
We do not sell your personal information.

8. Your Privacy Rights
8.1 General Rights
You have the right to access, correct, or delete your data, object to its processing, and withdraw consent where applicable.

8.2 Exercise Your Rights
To exercise these rights, use the privacy controls in your account settings or contact us at support@2029.lol. We will respond to your request within 30 days.

9. Service Providers
Cool Captions uses third-party services for image processing, AI analysis, infrastructure hosting, and usage analytics. All service providers are bound by strict data protection agreements.

10. Children's Privacy
The Service is not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If you believe a child has used the Service, please contact support@2029.lol to request data deletion.

11. Changes to This Policy
We may update this Privacy Policy periodically. Any changes will be posted on this page, and significant updates will be communicated via email. By continuing to use the Service after updates, you agree to the revised policy.

12. Contact Information
For privacy-related inquiries, you can contact us at:

Email: support@2029.lol
Response Time: 2-3 business days
Address: [Your Business Address]

13. Additional Information
13.1 Google Services
Cool Captions uses Google Analytics to track usage while ensuring privacy-friendly settings such as IP anonymization. Users can opt out of Google Analytics through their account settings or browser extensions.

13.2 Dispute Resolution
If you have concerns about your privacy rights, you can file a complaint with your local data protection authority or contact us directly to resolve the issue.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
