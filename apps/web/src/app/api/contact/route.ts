import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
  company: z.string().max(200).optional().or(z.literal("")),
  interest: z.string().max(200).optional().or(z.literal("")),
  locale: z.string().max(10).optional().or(z.literal("")),
  // Honeypot (should stay empty)
  website: z.string().max(200).optional().or(z.literal("")),
});

type RateState = { count: number; resetAt: number };
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

function getIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function getRateStore(): Map<string, RateState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = globalThis as any;
  if (!g.__rateStore) g.__rateStore = new Map<string, RateState>();
  return g.__rateStore as Map<string, RateState>;
}

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const store = getRateStore();
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return { ok: false, retryAfterSec };
  }

  entry.count += 1;
  store.set(ip, entry);
  return { ok: true };
}

export async function POST(req: Request) {
  const ip = getIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec || 60) } }
    );
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_error" }, { status: 400 });
  }

  // Honeypot check
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true }); // pretend success
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendKey || !toEmail || !fromEmail) {
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  const resend = new Resend(resendKey);

  const subject = `New lead: ${parsed.data.name} (${parsed.data.locale || "n/a"})`;
  const html = `
    <div style="font-family: ui-sans-serif, system-ui; line-height: 1.4">
      <h2>New Website Lead</h2>
      <p><strong>Name:</strong> ${parsed.data.name}</p>
      <p><strong>Email:</strong> ${parsed.data.email}</p>
      <p><strong>Company:</strong> ${parsed.data.company || "-"}</p>
      <p><strong>Interest:</strong> ${parsed.data.interest || "-"}</p>
      <p><strong>Locale:</strong> ${parsed.data.locale || "-"}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap">${parsed.data.message}</pre>
      <hr/>
      <p style="font-size: 12px; color: #666">IP: ${ip}</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      replyTo: parsed.data.email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "email_failed" }, { status: 500 });
  }
}
