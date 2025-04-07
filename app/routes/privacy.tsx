import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - InstaCaption" },
    { name: "description", content: "Privacy policy for InstaCaption users" },
  ];
};

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
        <p>
          When you use InstaCaption, we collect:
        </p>
        <ul className="list-disc pl-6">
          <li>Account information (email, username)</li>
          <li>Images you upload for caption generation</li>
          <li>Generated captions and interaction data</li>
          <li>Usage statistics and analytics</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
        <p>
          We use your information to:
        </p>
        <ul className="list-disc pl-6">
          <li>Provide and improve our caption generation service</li>
          <li>Personalize your experience</li>
          <li>Send important notifications about our service</li>
          <li>Analyze and improve our AI algorithms</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">3. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information.
          This includes encryption, secure servers, and regular security audits.
        </p>

        <h2 className="text-2xl font-semibold mt-6">4. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share data with:
        </p>
        <ul className="list-disc pl-6">
          <li>Service providers who assist our operations</li>
          <li>Law enforcement when required by law</li>
          <li>Business partners with your explicit consent</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">5. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul className="list-disc pl-6">
          <li>Access your personal data</li>
          <li>Request data correction or deletion</li>
          <li>Object to data processing</li>
          <li>Download your data</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">6. Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies to improve user experience and analyze
          service usage. You can control cookie settings through your browser.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Children's Privacy</h2>
        <p>
          Our service is not intended for users under 13 years of age. We do not knowingly
          collect information from children under 13.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Changes to Privacy Policy</h2>
        <p>
          We may update this privacy policy periodically. We will notify users of any
          material changes via email or through our service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">9. Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please contact us at:
          privacy@instacaption.ai
        </p>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p>Last updated: April 7, 2025</p>
      </div>
    </div>
  );
}