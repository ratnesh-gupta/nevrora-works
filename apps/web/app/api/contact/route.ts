import { NextResponse } from "next/server";
import { contactSchema } from "../../../components/contact/ContactForm";
import { STATUTORY_DETAILS } from "@nevrora/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const formattedErrors = result.error.issues.map((err) => ({
        field: String(err.path[0]),
        message: err.message,
      }));
      return NextResponse.json(
        {
          success: false,
          errors: formattedErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, organization, type, message } = result.data;
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    const mailtoFallback = `mailto:${STATUTORY_DETAILS.grievanceContact.email}?subject=${encodeURIComponent(
      `Inquiry: ${type} - ${name}`,
    )}&body=${encodeURIComponent(message)}`;

    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name,
            email,
            organization: organization || "N/A",
            type,
            message,
          }),
        });

        return NextResponse.json({
          success: true,
          message: "Inquiry successfully forwarded to team.",
          forwardedToSheets: true,
        });
      } catch {
        return NextResponse.json({
          success: true,
          message: "Inquiry accepted with mailto fallback.",
          forwardedToSheets: false,
          fallback: "mailto",
          mailtoUrl: mailtoFallback,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry accepted with mailto fallback.",
      forwardedToSheets: false,
      fallback: "mailto",
      mailtoUrl: mailtoFallback,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Malformed request payload.",
      },
      { status: 400 },
    );
  }
}
