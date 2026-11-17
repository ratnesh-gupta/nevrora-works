import { Router } from "express";
import { z } from "zod";
import { INQUIRY_TYPES } from "@nevrora/config";
import type { ContactSubmission } from "@nevrora/types";
import { contactRateLimiter } from "../middleware/rateLimiter.js";

export const contactRouter = Router();

/**
 * Zod validation schema for contact inquiry submissions
 */
export const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email address"),
  organization: z.string().trim().optional(),
  type: z.enum(INQUIRY_TYPES as unknown as [string, ...string[]], {
    errorMap: () => ({
      message: `Type must be one of: ${INQUIRY_TYPES.join(", ")}`,
    }),
  }),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(20, "Message must be at least 20 characters"),
});

/**
 * Helper to construct mailto fallback URI
 */
export function buildMailtoFallback(submission: ContactSubmission): string {
  const recipient = "ratnesh.k.gupta@icloud.com";
  const subject = encodeURIComponent(
    `[Nevrora Inquiry] ${submission.type} - ${submission.name}`,
  );
  const bodyText = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    submission.organization ? `Organization: ${submission.organization}` : null,
    `Category: ${submission.type}`,
    `\nMessage:`,
    submission.message,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
}

/**
 * POST /api/contact
 * Validates inquiry, forwards to Google Sheets webhook if configured,
 * or returns mailto fallback link.
 */
contactRouter.post("/contact", contactRateLimiter, async (req, res, next) => {
  try {
    const parseResult = contactSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: parseResult.error.flatten(),
      });
      return;
    }

    const submission: ContactSubmission = {
      ...parseResult.data,
      createdAt: new Date().toISOString(),
    };

    const mailtoFallback = buildMailtoFallback(submission);
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    // If webhook URL is configured, attempt forwarding
    if (webhookUrl && webhookUrl.trim().length > 0) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submission),
          signal: AbortSignal.timeout(5000),
        });

        if (response.ok) {
          res.status(200).json({
            success: true,
            message:
              "Inquiry received successfully. Our team will contact you shortly.",
            forwardedToSheets: true,
          });
          return;
        }

        console.warn(
          `[Webhook Warning] Google Sheets webhook responded with status ${response.status}`,
        );
      } catch (webhookErr) {
        console.error(
          "[Webhook Error] Failed to forward submission to Google Sheets:",
          webhookErr,
        );
      }
    }

    // Default fallback: return mailto link
    res.status(200).json({
      success: true,
      message: "Inquiry received. A direct email fallback has been generated.",
      forwardedToSheets: false,
      mailtoFallback,
    });
    return;
  } catch (err) {
    next(err);
    return;
  }
});
