"use client";

import { Send } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";

type ContactFormProps = {
  mode?: "contact" | "involvement";
};

type FieldState = {
  fullName: string;
  email: string;
  organisation: string;
  inquiryType: string;
  message: string;
};

const initialState: FieldState = {
  fullName: "",
  email: "",
  organisation: "",
  inquiryType: "",
  message: ""
};

export function ContactForm({ mode = "contact" }: ContactFormProps) {
  const [fields, setFields] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const title = mode === "contact" ? "Send an inquiry" : "Start an application";
  const options = useMemo(
    () =>
      mode === "contact"
        ? ["General inquiry", "Press desk", "Institutional inquiry", "Research collaboration", "Donor support"]
        : ["Professional membership", "Volunteer network", "Academic fellowship", "Institutional alliance", "Corporate partnership"],
    [mode]
  );

  const isValid = Boolean(
    fields.fullName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) &&
      fields.inquiryType &&
      fields.message.trim().length >= 12
  );

  function updateField(field: keyof FieldState, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;
    setSubmitted(true);
    setFields(initialState);
    setTouched(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-navy-200 bg-paper-50 p-5 sm:p-7"
    >
      <h2 className="font-display text-2xl font-semibold uppercase tracking-[-0.01em] text-navy-950">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-navy-700">
        This form is a frontend placeholder. Backend routing can be connected when provider details are supplied.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField label="Full Name" error={touched && !fields.fullName.trim() ? "Enter your name." : ""}>
          <input
            value={fields.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            className="form-input"
          />
        </FormField>

        <FormField
          label="Email"
          error={touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) ? "Enter a valid email." : ""}
        >
          <input
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            autoComplete="email"
            className="form-input"
          />
        </FormField>

        <FormField label="Organisation">
          <input
            value={fields.organisation}
            onChange={(event) => updateField("organisation", event.target.value)}
            autoComplete="organization"
            className="form-input"
          />
        </FormField>

        <FormField label="Inquiry Type" error={touched && !fields.inquiryType ? "Choose an inquiry type." : ""}>
          <select
            value={fields.inquiryType}
            onChange={(event) => updateField("inquiryType", event.target.value)}
            className="form-input"
          >
            <option value="">Select one</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="mt-4">
        <FormField
          label="Message"
          error={touched && fields.message.trim().length < 12 ? "Write at least 12 characters." : ""}
        >
          <textarea
            value={fields.message}
            onChange={(event) => updateField("message", event.target.value)}
            rows={5}
            className="form-input resize-none"
          />
        </FormField>
      </div>

      <button
        type="submit"
        className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center gap-2 border border-navy-950 bg-navy-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-paper-50 transition hover:bg-paper-50 hover:text-navy-950"
      >
        <Send aria-hidden="true" className="size-4" />
        Submit
      </button>

      {submitted ? (
        <p className="mt-4 border border-navy-200 bg-navy-50 px-4 py-3 text-sm font-medium text-navy-800">
          Thank you. Your message has been captured in the frontend success state.
        </p>
      ) : null}
    </form>
  );
}

function FormField({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy-950">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-2 block text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}
