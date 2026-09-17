"use client";

import { problemAreas } from "@/content/consulting";
import { useId, useState, type FormEvent } from "react";

/**
 * Composes an email in the visitor's own mail client. Nothing is submitted
 * to or stored by this website.
 */
export function InquiryForm({ email }: { email?: string }) {
  const id = useId();
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const name = get("name");
    const problem = get("problem");
    if (!name || !problem) {
      setError("Please add your name and a short description of the problem.");
      return;
    }
    setError(null);
    const organization = get("organization");
    const area = get("area");
    const subject = `[SMC Consulting] ${area || "Inquiry"}${organization ? ` — ${organization}` : ""}`;
    const body = [
      `Name: ${name}`,
      organization ? `Organization: ${organization}` : null,
      area ? `Problem area: ${area}` : null,
      get("timeline") ? `Timeline: ${get("timeline")}` : null,
      "",
      "The problem:",
      problem,
    ]
      .filter((line) => line !== null)
      .join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form className="inquiry" onSubmit={onSubmit} noValidate>
      <div className="field-grid">
        <div className="field">
          <label htmlFor={`${id}-name`}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input id={`${id}-name`} name="name" autoComplete="name" required aria-required="true" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-org`}>Organization</label>
          <input id={`${id}-org`} name="organization" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-area`}>Problem area</label>
          <select id={`${id}-area`} name="area" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {problemAreas.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${id}-timeline`}>Timeline</label>
          <select id={`${id}-timeline`} name="timeline" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option>Within a month</option>
            <option>This semester</option>
            <option>Flexible</option>
          </select>
        </div>
        <div className="field field--wide">
          <label htmlFor={`${id}-problem`}>
            The problem <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${id}-problem`}
            name="problem"
            rows={6}
            required
            aria-required="true"
            aria-describedby={`${id}-problem-hint`}
            placeholder="What decision are you trying to make? What data do you have? What would a useful answer look like?"
          />
          <p className="field-hint" id={`${id}-problem-hint`}>
            Please don&apos;t include confidential or sensitive data in a first message.
          </p>
        </div>
      </div>

      <div className="inquiry-foot">
        <button type="submit" className="btn btn--gold" disabled={!email}>
          <span>{email ? "Compose email" : "Inbox opening soon"}</span>
          {email ? (
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          ) : null}
        </button>
        <p className="field-hint" role="status">
          {error ??
            (email
              ? opened
                ? `Your mail app should have opened. If it didn't, write to ${email}.`
                : `Opens your email app with this message addressed to ${email}. This site stores nothing.`
              : "Our consulting inbox is being set up. Check back shortly.")}
        </p>
      </div>
    </form>
  );
}
