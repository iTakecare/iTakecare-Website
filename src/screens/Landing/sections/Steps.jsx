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
  <section className="bg-[#222222] px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <SectionTitle title="Équipé en [3 étapes simples]" light />
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.title} direction="up" delay={i * 150}>
            <li className="h-full rounded-[28px] bg-white/5 p-7 ring-1 ring-white/10">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#48b5c3] text-xl font-black text-white">
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
