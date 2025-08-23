"use server";

import axios from "axios";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export const sendEmail = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  const { name, email, message } = parsed.data;

  // console.log("SERVICE_ID", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
  // console.log("TEMPLATE_ID", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
  // console.log("PUBLIC_KEY", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

  try {
    await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
        template_params: {
          from_name: name,
          reply_to: email,
          message,
        },
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "❌ Email send failed:",
        error.response?.data ?? error.message,
      );
    } else if (error instanceof Error) {
      console.error("❌ Email send failed:", error.message);
    } else {
      console.error("❌ Email send failed:", error);
    }
    throw new Error("Failed to send email. Please try again later.");
  }
};
