"use client";

import React, { useState } from "react";
import { z } from "zod";
import {
  INQUIRY_TYPES,
  OFFICIAL_SUPPORT_EMAIL,
  type InquiryType,
} from "@nevrora/config";
import { Send, CheckCircle2, AlertCircle, Mail, Loader2 } from "lucide-react";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name is required (at least 2 characters)" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .refine((val) => emailRegex.test(val) && !val.includes(".."), {
      message: "Invalid email address format",
    }),
  organization: z.string().trim().optional(),
  productSlug: z.string().trim().optional(),
  type: z.enum(INQUIRY_TYPES, {
    message: `Inquiry type must be one of: ${INQUIRY_TYPES.join(", ")}`,
  }),
  message: z
    .string()
    .trim()
    .refine((val) => val.length >= 20, {
      message:
        "Tell us a little more. Messages need at least 20 characters (0 so far).",
    }),
  category: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  initialType?: string;
  initialCategory?: string;
}

export function ContactForm({
  initialType = "",
  initialCategory = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    organization: "",
    productSlug: initialCategory,
    type: (INQUIRY_TYPES.includes(initialType as InquiryType)
      ? initialType
      : INQUIRY_TYPES[0]) as InquiryType,
    message: "",
    category: initialCategory,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [mailtoFallbackUrl, setMailtoFallbackUrl] = useState<string | null>(
    null,
  );

  const validateField = (field: keyof ContactFormData, value: string) => {
    try {
      if (field === "message") {
        if (value.trim().length < 20) {
          setErrors((prev) => ({
            ...prev,
            message: `Tell us a little more. Messages need at least 20 characters (${value.trim().length} so far).`,
          }));
          return false;
        }
      }
      contactSchema.shape[field].parse(value);
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: err.issues[0]?.message || "Invalid input",
        }));
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const fieldName = String(err.path[0]);
        if (fieldName === "message") {
          fieldErrors[fieldName] =
            `Tell us a little more. Messages need at least 20 characters (${formData.message.trim().length} so far).`;
        } else {
          fieldErrors[fieldName] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const apiErrors: Record<string, string> = {};
          data.errors.forEach((item: { field: string; message: string }) => {
            apiErrors[item.field] = item.message;
          });
          setErrors(apiErrors);
        } else {
          setErrors({
            form:
              data.error ||
              "Submission failed. Please try again or use direct email.",
          });
        }
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      setSubmitMessage(
        data.message || "Thank you. Your product inquiry has been received.",
      );
      if (data.fallback === "mailto" && data.mailtoUrl) {
        setMailtoFallbackUrl(data.mailtoUrl);
      }
    } catch {
      const mailtoUrl = `mailto:${OFFICIAL_SUPPORT_EMAIL}?subject=${encodeURIComponent(
        `[Nevrora Works] ${formData.type} - ${formData.name}`,
      )}&body=${encodeURIComponent(formData.message)}`;
      setIsSubmitted(true);
      setSubmitMessage(
        "Thank you. Please confirm delivery via your email client.",
      );
      setMailtoFallbackUrl(mailtoUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  const manualMailtoUrl = `mailto:${OFFICIAL_SUPPORT_EMAIL}?subject=${encodeURIComponent(
    `[Nevrora Works] ${formData.type || "General product inquiry"} - ${formData.name || "User"}`,
  )}&body=${encodeURIComponent(formData.message || "Hello Nevrora Works team,")}`;

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-white p-6 sm:p-8 md:p-10 text-center space-y-6 shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-bold text-[#0B1020]">
            Request Received
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {submitMessage}
          </p>
        </div>

        {mailtoFallbackUrl && (
          <div className="pt-4">
            <a
              href={mailtoFallbackUrl}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95 transition-all"
            >
              <Mail className="h-4 w-4" />
              <span>Open in Email Client</span>
            </a>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          <p className="break-words">
            Official Support &amp; DPO Contact:{" "}
            <span className="break-all font-medium">
              {OFFICIAL_SUPPORT_EMAIL}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      action="/api/contact"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-8 md:p-10 shadow-sm"
      noValidate
    >
      {errors.form && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-50 p-4 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#0B1020]"
        >
          Your Name <span className="text-blue-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Priya Sundaram"
          className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm text-[#0B1020] placeholder-slate-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 ${
            errors.name ? "border-red-500" : "border-slate-200"
          }`}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#0B1020]"
        >
          Email Address <span className="text-blue-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. priya@example.com"
          className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm text-[#0B1020] placeholder-slate-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 ${
            errors.email ? "border-red-500" : "border-slate-200"
          }`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Product Selection (Optional) */}
      <div className="space-y-2">
        <label
          htmlFor="productSlug"
          className="block text-sm font-medium text-[#0B1020]"
        >
          Product{" "}
          <span className="text-slate-400 text-xs">(Optional)</span>
        </label>
        <select
          id="productSlug"
          name="productSlug"
          value={formData.productSlug || ""}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-[#0B1020] transition-colors focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          <option value="">All Products / General Nevrora Works</option>
          <option value="sadhana-daily">Sadhana Daily (Coming Soon)</option>
          <option value="neermiti-collections">
            Neermiti Collections (Coming Soon)
          </option>
          <option value="driveiq">DriveIQ (Coming Soon)</option>
        </select>
      </div>

      {/* Organization */}
      <div className="space-y-2">
        <label
          htmlFor="organization"
          className="block text-sm font-medium text-[#0B1020]"
        >
          Organization{" "}
          <span className="text-slate-400 text-xs">(Optional)</span>
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Optional company or institute name"
          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-[#0B1020] placeholder-slate-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {/* Inquiry Type */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-[#0B1020]"
        >
          Enquiry Category <span className="text-blue-600">*</span>
        </label>
        <select
          id="type"
          name="type"
          required
          value={formData.type}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm text-[#0B1020] transition-colors focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 ${
            errors.type ? "border-red-500" : "border-slate-200"
          }`}
        >
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t} className="bg-white text-[#0B1020]">
              {t}
            </option>
          ))}
        </select>
        {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#0B1020]"
          >
            Message <span className="text-blue-600">*</span>
          </label>
          <span className="text-xs text-slate-400">
            Min 20 characters ({formData.message.trim().length}/20)
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Let us know which product you would like launch notifications for, or how we can help..."
          className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm text-[#0B1020] placeholder-slate-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 ${
            errors.message ? "border-red-500" : "border-slate-200"
          }`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      <input type="hidden" name="category" value={formData.category} />

      <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="cta-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:opacity-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Submit Enquiry</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>

        <a
          href={manualMailtoUrl}
          className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 transition-colors py-2"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Or email {OFFICIAL_SUPPORT_EMAIL}</span>
        </a>
      </div>
    </form>
  );
}
