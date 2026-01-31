"use client";

import { useState } from "react";

type JoinCopy = {
  formTitle: string;
  fields: {
    name: string;
    email: string;
    role: string;
    profile: string;
    message: string;
  };
  submit: string;
  success: string;
  error: string;
  or: string;
};

export function WorkWithUsForm({ copy, locale }: { copy: JoinCopy; locale: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const email = "hello@altamiratechlabs.com";
  const emailParts = copy.or.split(email);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      role: String(form.get("role") || ""),
      profile: String(form.get("profile") || ""),
      message: String(form.get("message") || ""),
      locale,
      website: String(form.get("website") || ""),
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("request_failed");
      }

      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-xl2 border border-white/15 bg-white p-6 text-brand-navy shadow-soft">
      <h3 className="text-lg font-semibold">{copy.formTitle}</h3>
      <form onSubmit={onSubmit} className="mt-5 grid gap-4" aria-busy={status === "sending"}>
        <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />

        <label className="grid gap-2 text-sm">
          <span className="font-medium">{copy.fields.name}</span>
          <input
            className="rounded-lg border border-zinc-300 px-3 py-2"
            name="name"
            required
            minLength={2}
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">{copy.fields.email}</span>
          <input
            className="rounded-lg border border-zinc-300 px-3 py-2"
            name="email"
            required
            type="email"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">{copy.fields.role}</span>
          <input
            className="rounded-lg border border-zinc-300 px-3 py-2"
            name="role"
            required
            minLength={2}
            autoComplete="organization-title"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">{copy.fields.profile}</span>
          <input
            className="rounded-lg border border-zinc-300 px-3 py-2"
            name="profile"
            autoComplete="url"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">{copy.fields.message}</span>
          <textarea
            className="rounded-lg border border-zinc-300 px-3 py-2"
            name="message"
            rows={5}
            required
            minLength={10}
          />
        </label>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-medium text-white hover:bg-brand-orange2 disabled:opacity-60"
          type="submit"
          disabled={status === "sending"}
        >
          {copy.submit}
          {status === "sending" ? <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> : null}
        </button>

        {status === "sent" ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            {copy.success}
          </div>
        ) : null}

        {status === "error" ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            {copy.error}
          </div>
        ) : null}
      </form>

      <p className="mt-4 text-sm text-zinc-600">
        {emailParts[0]}
        <a className="font-medium text-brand-orange hover:text-brand-orange2" href={`mailto:${email}`}>
          {email}
        </a>
        {emailParts[1] ?? ""}
      </p>
    </div>
  );
}
