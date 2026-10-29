import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { Icon } from "../components/ui";

// Promesses iTakecare communes à toutes les verticales, en chiffres.
const FIGURES = [
  { icon: "refresh", value: "24h", label: "pour remplacer un appareil en panne" },
  { icon: "truck", value: "3–5 j", label: "de livraison, gratuite et prêt à l'emploi" },
  { icon: "star", value: "4,8/5", label: "de satisfaction clients" },
  { icon: "leaf", value: "170 kg", label: "de CO₂ évités par ordinateur reconditionné" },
];

export const TrustBar = () => (
  <section className="lp-night relative overflow-hidden px-4 py-12 md:px-8 md:py-16">
    <ul className="relative mx-auto grid max-w-[1240px] grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
      {FIGURES.map((figure, i) => (
        <ScrollReveal key={figure.value} direction="up" delay={i * 120} className="h-full">
          <li className="lp-glass-dark flex h-full flex-col gap-3 rounded-[24px] p-5 md:p-6">
            <span className={`lp-icon lp-icon-${i} h-10 w-10 rounded-xl`}>
              <Icon name={figure.icon} className="h-5 w-5" />
            </span>
            <span className="bg-[linear-gradient(120deg,#ffffff,#9eeaf3_60%,#c4bcff)] bg-clip-text text-3xl font-black text-transparent md:text-4xl">
              {figure.value}
            </span>
            <span className="text-sm leading-snug text-white/70 md:text-base">{figure.label}</span>
          </li>
        </ScrollReveal>
      ))}
    </ul>
  </section>
);
