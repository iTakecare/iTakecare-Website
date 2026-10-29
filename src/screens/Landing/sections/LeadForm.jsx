import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitLead, track } from "../lib/leads";

const ChoiceStep = ({ question, options, value, onPick }) => (
  <fieldset>
    <legend className="mb-4 text-lg font-bold text-[#0b1f33]">{question}</legend>
    <div className="grid gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onPick(option)}
          className={`group flex items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold text-[#0b1f33] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(72,181,195,0.2)] ${
            value === option
              ? "border-[#48b5c3] bg-[linear-gradient(120deg,rgba(72,181,195,0.14),rgba(124,108,240,0.1))]"
              : "border-[#0b1f33]/10 bg-white hover:border-[#48b5c3]"
          }`}
        >
          {option}
          <span className="text-[#48b5c3] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
            →
          </span>
        </button>
      ))}
    </div>
  </fieldset>
);

const Field = ({ label, required = true, ...props }) => (
  <label className="flex flex-col gap-1.5 text-sm font-bold text-[#0b1f33]">
    {label}
    <input
      {...props}
      required={required}
      className="rounded-2xl border-2 border-[#0b1f33]/10 bg-white px-4 py-3 text-base font-normal outline-none transition-shadow focus:border-[#48b5c3] focus:shadow-[0_0_0_4px_rgba(72,181,195,0.18)]"
    />
  </label>
);

// Formulaire en 3 étapes : les 2 premières sont des choix en un clic, les coordonnées viennent en dernier.
export const LeadForm = ({ vertical, need, onNeedChange }) => {
  const { form, packs, slug } = vertical;
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(null);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    consent: false,
    website: "", // champ piège anti-robots, invisible pour les visiteurs
  });
  const [status, setStatus] = useState("idle");

  const needs = [...packs.items.map((pack) => pack.name), ...form.extraNeeds];
  const update = (key) => (e) =>
    setContact({ ...contact, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // État réel de la case (l'auto-remplissage peut la cocher sans passer par onChange).
    const consent = e.currentTarget.elements.consent?.checked === true;
    setStatus("sending");
    try {
      // Contenu et prix du pack choisi : Leazr s'en sert pour retrouver le pack.
      const pack = packs.items.find((item) => item.name === need);
      await submitLead({
        vertical: slug,
        profile,
        need,
        packPrice: pack?.price,
        packProducts: pack?.products ?? [],
        ...contact,
        consent,
      });
      track("Lead", { content_category: slug });
      navigate(`/lp/${slug}/merci`);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lp-gradient-border relative overflow-hidden rounded-[32px] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-8">
      <div className="mb-6 flex items-center gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? "bg-[linear-gradient(90deg,#48b5c3,#7c6cf0)]" : "bg-[#0b1f33]/10"
            }`}
          />
        ))}
        <span className="text-sm font-bold text-[#0b1f33]/50">{step + 1}/3</span>
      </div>

      {step === 0 && (
        <ChoiceStep
          question={form.profileQuestion}
          options={form.profiles}
          value={profile}
          onPick={(option) => {
            setProfile(option);
            setStep(1);
          }}
        />
      )}

      {step === 1 && (
        <ChoiceStep
          question={form.needQuestion}
          options={needs}
          value={need}
          onPick={(option) => {
            onNeedChange(option);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold text-[#0b1f33]">Où pouvons-nous vous envoyer votre offre ?</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prénom" name="firstName" autoComplete="given-name" value={contact.firstName} onChange={update("firstName")} />
            <Field label="Nom" name="lastName" autoComplete="family-name" value={contact.lastName} onChange={update("lastName")} />
          </div>
          <Field
            label="Entreprise (facultatif)"
            name="company"
            autoComplete="organization"
            required={false}
            value={contact.company}
            onChange={update("company")}
          />
          <Field label="E-mail" name="email" type="email" autoComplete="email" value={contact.email} onChange={update("email")} />
          <Field label="Téléphone" name="phone" type="tel" autoComplete="tel" value={contact.phone} onChange={update("phone")} />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={contact.website}
            onChange={update("website")}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <label className="flex items-start gap-3 text-sm text-[#0b1f33]/65">
            <input type="checkbox" name="consent" required checked={contact.consent} onChange={update("consent")} className="mt-1 h-4 w-4 accent-[#48b5c3]" />
            J'accepte d'être recontacté·e par iTakecare au sujet de ma demande, conformément à la politique de confidentialité.
          </label>
          <button type="submit" disabled={status === "sending"} className="lp-cta mt-2 w-full px-6 py-4 text-lg">
            {status === "sending" ? "Envoi…" : "Recevoir mon offre →"}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-[#0b1f33]/50">🔒 Vos données servent uniquement à traiter votre demande.</p>
          {status === "error" && (
            <p className="text-sm text-red-600">Oups, l'envoi a échoué. Vérifiez vos informations et réessayez dans un instant.</p>
          )}
        </div>
      )}

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-5 text-sm text-[#0b1f33]/55 hover:text-[#2f97a6]"
        >
          ← Retour
        </button>
      )}
    </form>
  );
};
