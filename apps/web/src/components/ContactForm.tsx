"use client";

import { useState } from "react";

export function ContactForm({
  locale,
  submitLabel = "Send",
  submitMicrocopy,
}: {
  locale: string;
  submitLabel?: string;
  submitMicrocopy?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      interest: String(form.get("interest") || ""),
      message: String(form.get("message") || ""),
      locale,
      website: String(form.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "request_failed");
      }

      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid max-w-xl gap-4">
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />

      <input className="rounded-lg border border-zinc-300 px-3 py-2" name="name" placeholder="Name" required minLength={2} />
      <input className="rounded-lg border border-zinc-300 px-3 py-2" name="email" placeholder="Email" required type="email" />
      <input className="rounded-lg border border-zinc-300 px-3 py-2" name="company" placeholder="Company (optional)" />
      <input className="rounded-lg border border-zinc-300 px-3 py-2" name="interest" placeholder="Interest (optional)" />
      <textarea className="rounded-lg border border-zinc-300 px-3 py-2" name="message" placeholder="Message" rows={6} required minLength={10} />

      <button
        className="rounded-lg bg-brand-orange px-4 py-2 text-white hover:bg-brand-orange2 disabled:opacity-50"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : submitLabel}
      </button>
      {submitMicrocopy ? <p className="text-xs text-zinc-600">{submitMicrocopy}</p> : null}

      {status === "sent" ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          Message sent. We will reply soon.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          Error sending message: {error}
        </div>
      ) : null}
    </form>
  );
}
