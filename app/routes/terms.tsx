import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Terms and Conditions - InstaCaption" },
    { name: "description", content: "Terms and conditions for using InstaCaption" },
  ];
};

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
        <p>
          By accessing and using InstaCaption, you accept and agree to be bound by the terms
          and conditions of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. Use License</h2>
        <p>
          Permission is granted to temporarily use InstaCaption for personal, non-commercial
          use only. This is the grant of a license, not a transfer of title.
        </p>

        <h2 className="text-2xl font-semibold mt-6">3. User Content</h2>
        <p>
          Users are responsible for the content they generate and share through InstaCaption.
          Content must not violate any applicable laws or regulations.
        </p>

        <h2 className="text-2xl font-semibold mt-6">4. Account Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and
          password. You agree to notify us immediately of any unauthorized use of your account.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Service Modifications</h2>
        <p>
          We reserve the right to modify or discontinue, temporarily or permanently, the
          service with or without notice.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Limitations</h2>
        <p>
          In no event shall InstaCaption be liable for any damages arising out of the use
          or inability to use the materials on our service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with
          applicable laws, and you irrevocably submit to the exclusive jurisdiction of the
          courts in that location.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users
          of any changes by updating the date at the top of these terms.
        </p>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p>Last updated: April 7, 2025</p>
      </div>
    </div>
  );
}