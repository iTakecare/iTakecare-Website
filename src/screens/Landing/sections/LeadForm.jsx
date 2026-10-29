import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlowButton } from "../../../components/GlowButton";
import { submitLead, track } from "../lib/leads";

const ChoiceStep = ({ question, options, value, onPick }) => (
  <fieldset>
    <legend className="mb-4 text-lg font-bold text-[#222222]">{question}</legend>
    <div className="grid gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onPick(option)}
          className={`rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition-colors ${
            value === option
              ? "border-[#48b5c3] bg-[#48b5c31f] text-[#222222]"
              : "border-[#e1e1e1] bg-white text-[#222222] hover:border-[#48b5c3]"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </fieldset>
);

const Field = ({ label, required = true, ...props }) => (
  <label className="flex flex-col gap-1.5 text-sm font-bold text-[#222222]">
    {label}
    <input
      {...props}
      required={required}
      className="rounded-2xl border-2 border-[#e1e1e1] bg-white px-4 py-3 text-base font-normal outline-none focus:border-[#48b5c3]"
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
    <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-xl md:p-8">
      <div className="mb-6 flex items-center gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-[#48b5c3]" : "bg-[#e1e1e1]"}`}
          />
        ))}
        <span className="text-sm text-[#222222]/60">{step + 1}/3</span>
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
          <p className="text-lg font-bold text-[#222222]">Où pouvons-nous vous envoyer votre offre ?</p>
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
          <label className="flex items-start gap-3 text-sm text-[#222222]/70">
            <input type="checkbox" name="consent" required checked={contact.consent} onChange={update("consent")} className="mt-1 h-4 w-4 accent-[#48b5c3]" />
            J'accepte d'être recontacté·e par iTakecare au sujet de ma demande, conformément à la politique de confidentialité.
          </label>
          <GlowButton
            variant="primary"
            type="submit"
            disabled={status === "sending"}
            className="mt-2 w-full px-6 py-4 text-lg font-bold disabled:opacity-60"
          >
            {status === "sending" ? "Envoi…" : "Recevoir mon offre →"}
          </GlowButton>
          {status === "error" && (
            <p className="text-sm text-red-600">Oups, l'envoi a échoué. Vérifiez vos informations et réessayez dans un instant.</p>
          )}
        </div>
      )}

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-5 text-sm text-[#222222]/60 hover:text-[#48b5c3]"
        >
          ← Retour
        </button>
      )}
    </form>
  );
};
