/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useMutation } from "@tanstack/react-query";
import emailjs, { type EmailJSResponseStatus } from "@emailjs/browser";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async (
      form: HTMLFormElement,
    ): Promise<{
      success: boolean;
      message: string;
      response: EmailJSResponseStatus;
    }> => {
      const res: EmailJSResponseStatus = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      return {
        success: true,
        message: "Email sent successfully!",
        response: res,
      };
    },
  });
};
