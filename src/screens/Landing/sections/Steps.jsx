import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { SectionTitle } from "../components/ui";

const STEPS = [
  {
    title: "Vous choisissez votre pack",
    text: "Un conseiller vous aide à trouver le bon matériel pour votre activité.",
  },
  {
    title: "Vous signez en ligne",
    text: "Une mensualité fixe qui comprend la location, la maintenance et la garantie.",
  },
  {
    title: "Vous recevez votre matériel",
    text: "Livré gratuitement en 3 à 5 jours, prêt à l'emploi. L'esprit tranquille !",
  },
];

export const Steps = () => (
  <section className="lp-night relative overflow-hidden px-4 py-16 md:px-8 md:py-24">
    <div className="relative mx-auto max-w-[1200px]">
      <SectionTitle eyebrow="Simple et rapide" title="Équipé en [3 étapes simples]" light />
      <ol className="relative grid gap-6 md:grid-cols-3">
        {/* Fil lumineux qui relie les étapes. */}
        <span
          aria-hidden="true"
          className="absolute left-[16%] right-[16%] top-[52px] hidden h-0.5 bg-[linear-gradient(90deg,#48b5c3,#22d3ee,#7c6cf0)] opacity-60 md:block"
        />
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.title} direction="up" delay={i * 150} className="h-full">
            <li className="lp-glass-dark relative h-full rounded-[28px] p-7 text-center">
              <span className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#48b5c3,#7c6cf0)] text-2xl font-black text-white shadow-[0_0_0_6px_rgba(255,255,255,0.06),0_10px_30px_rgba(72,181,195,0.5)]">
                {i + 1}
              </span>
              <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
              <p className="text-base leading-relaxed text-white/70">{step.text}</p>
            </li>
          </ScrollReveal>
        ))}
      </ol>
    </div>
  </section>
);
