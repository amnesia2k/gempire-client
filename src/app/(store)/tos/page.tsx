import React from "react";

export default function TermsOfServicePage() {
  return (
    <section className="space-y-5 p-5 sm:px-7 md:space-y-10 lg:px-0">
      <h1 className="text-center text-3xl font-bold">Terms of Service</h1>

      <p>
        Welcome to Gempire. By accessing our website or placing an order, you’re
        agreeing to the following terms:
      </p>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">1. Orders & Availability</h2>
        <p>
          Products are subject to availability. We reserve the right to cancel
          or refund any order due to stock issues, pricing errors, or unusual
          activity.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">2. Pricing & Payment</h2>
        <p>
          All prices are listed in NGN. We process payments securely using
          third-party gateways. We don’t store card details.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">3. Returns & Refunds</h2>
        <p>
          Due to the nature of perfume products, returns are only accepted for
          unopened and unused items. Reach out within 7 days of delivery to
          request a return.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">4. User Conduct</h2>
        <p>
          Don’t use our platform to post spam, fake orders, or anything
          malicious. Violations may result in bans or legal action.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">5. Changes to Terms</h2>
        <p>
          We may update these terms occasionally. The most recent version will
          always be available on this page.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">6. Questions?</h2>
        <p>
          Contact{" "}
          <a
            href="mailto:support@gempire.shop"
            className="text-primary underline"
          >
            support@gempire.shop
          </a>{" "}
          for any legal, shipping, or refund inquiries.
        </p>
      </div>
    </section>
  );
}
