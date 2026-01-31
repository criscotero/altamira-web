"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export function ContactForm({
  submitLabel,
  submitMicrocopy,
}: {
  submitLabel?: string;
  submitMicrocopy?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("contactForm");
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

      <input
        className="rounded-lg border border-zinc-300 px-3 py-2"
        name="name"
        placeholder={t("fields.name")}
        required
        minLength={2}
      />
      <input
        className="rounded-lg border border-zinc-300 px-3 py-2"
        name="email"
        placeholder={t("fields.email")}
        required
        type="email"
      />
      <input
        className="rounded-lg border border-zinc-300 px-3 py-2"
        name="company"
        placeholder={t("fields.company")}
      />
      <input
        className="rounded-lg border border-zinc-300 px-3 py-2"
        name="interest"
        placeholder={t("fields.interest")}
      />
      <textarea
        className="rounded-lg border border-zinc-300 px-3 py-2"
        name="message"
        placeholder={t("fields.message")}
        rows={6}
        required
        minLength={10}
      />

      <button
        className="rounded-lg bg-brand-orange px-4 py-2 text-white hover:bg-brand-orange2 disabled:opacity-50"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? t("status.sending") : (submitLabel ?? t("submit"))}
      </button>
      {submitMicrocopy ? <p className="text-xs text-zinc-600">{submitMicrocopy}</p> : null}

      {status === "sent" ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          {t("status.success")}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          {t("status.error", { error: error ?? "error" })}
        </div>
      ) : null}
    </form>
  );
}
