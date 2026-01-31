import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(2),
  profile: z.string().optional().or(z.literal("")),
  message: z.string().min(10),
  locale: z.string().optional(),
  website: z.string().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = payloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendKey || !toEmail || !fromEmail) {
      return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
    }

    const resend = new Resend(resendKey);
    const subject = `New application: ${parsed.data.name} (${parsed.data.role})`;
    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.4">
        <h2>Work With Us Application</h2>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Role:</strong> ${parsed.data.role}</p>
        <p><strong>Profile:</strong> ${parsed.data.profile || "-"}</p>
        <p><strong>Locale:</strong> ${parsed.data.locale || "-"}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap">${parsed.data.message}</pre>
      </div>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      replyTo: parsed.data.email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }
}
