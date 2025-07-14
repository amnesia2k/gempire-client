import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <section className="space-y-5 p-5 sm:px-7 md:space-y-10 lg:px-0">
      <h1 className="text-center text-3xl font-bold">Privacy Policy</h1>

      <p>
        At Gempire, your privacy is a big deal. This policy outlines how we
        collect, use, and protect your personal information.
      </p>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">1. What We Collect</h2>
        <p>When you browse or make a purchase, we may collect:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Your name and contact details</li>
          <li>Shipping and billing address</li>
          <li>Payment details (securely processed)</li>
          <li>Interaction data (pages viewed, preferences)</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">2. How We Use It</h2>
        <p>Your data helps us:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Process your orders efficiently</li>
          <li>Personalize your experience</li>
          <li>Send important updates and promotions (if opted-in)</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">3. Data Protection</h2>
        <p>
          We store your data securely and never share or sell it to third
          parties — ever. Payments are encrypted and handled by trusted
          processors like Paystack or Stripe.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">4. Cookies</h2>
        <p>
          We use cookies (not the edible kind) to improve functionality and
          tailor your experience. You can manage this in your browser settings.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">5. Contact Us</h2>
        <p>
          Questions? Email us at{" "}
          <a
            href="mailto:support@gempire.com"
            className="text-primary underline"
          >
            support@gempire.com
          </a>
        </p>
      </div>
    </section>
  );
}
