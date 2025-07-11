"use client";

import { useState } from "react";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate submit
    await new Promise((r) => setTimeout(r, 1000));

    toast.success("Message sent!");
    setForm({ name: "", email: "", message: "" });
    setIsLoading(false);
  };

  return (
    <section className="mb-10 space-y-16 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Get in Touch</h1>
        <p className="mx-auto max-w-2xl text-base sm:text-xl">
          We&apos;d love to hear from you. Questions, feedback, or just want to
          say hi? Drop us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* 📬 Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card h-fit space-y-6 rounded-lg border p-6 shadow-sm"
        >
          <h2 className="text-2xl font-semibold">Send us a Message</h2>

          <FormField
            label="Full Name"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            defaultValue={form.name}
            // onChange={handleChange}
          />

          <FormField
            label="Email Address"
            id="email"
            name="email"
            placeholder="your@email.com"
            required
            type="email"
            defaultValue={form.email}
            // onChange={handleChange}
          />

          <FormField
            variant="textarea"
            label="Message"
            id="message"
            name="message"
            placeholder="Write your message here..."
            required
            defaultValue={form.message}
            // onChange={handleChange}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>

        {/* 📍 Contact Info + Map */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 text-primary rounded-full p-3">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Our Location</h3>
                <p className="text-muted-foreground">
                  Redeemer’s University, Ede, Osun State
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/20 text-primary rounded-full p-3">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email Us</h3>
                <a
                  href="mailto:hello@gempire.shop"
                  className="text-muted-foreground"
                >
                  hello@gempire.shop
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/20 text-primary rounded-full p-3">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Call Us</h3>
                <a href="tel:+2348133769036" className="text-muted-foreground">
                  +234 813 376 9036
                </a>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-lg border shadow-sm">
            {/* <iframe
              title="Store Location"
              src="https://maps.google.com/maps?q=floral%20city%20bouquet&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full"
              loading="lazy"
              allowFullScreen
            ></iframe> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.023746372874!2d4.455795875272411!3d7.680595492336405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10382bf4cfc23a5d%3A0xdc6c4b4c1b582ddf!2sRedeemer&#39;s%20University%20Ede!5e0!3m2!1sen!2sus!4v1752238689560!5m2!1sen!2sus"
              // width="400"
              // height="300"
              title="Store Location"
              className="h-full w-full"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
