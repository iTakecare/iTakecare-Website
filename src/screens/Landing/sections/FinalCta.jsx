import React from "react";
import { FORM_ANCHOR, Highlight, Icon } from "../components/ui";
import { LeadForm } from "./LeadForm";

const PROMISES = ["Sans engagement", "Réponse sous 24h ouvrables", "Un conseiller dédié, en Belgique"];

export const FinalCta = ({ vertical, need, onNeedChange }) => (
  <section id={FORM_ANCHOR} className="lp-night relative scroll-mt-4 overflow-hidden px-4 py-16 md:px-8 md:py-24">
    <div className="lp-aurora opacity-60">
      <span />
    </div>
    <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
      <div>
        <span className="lp-glass-dark mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#7fe3ee]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Votre offre en 30 secondes
        </span>
        <h2 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
          <Highlight text={vertical.form.title} pill />
        </h2>
        <p className="mb-8 text-lg text-white/75">{vertical.form.subtitle}</p>
        <ul className="flex flex-col gap-3">
          {PROMISES.map((promise, i) => (
            <li key={promise} className="flex items-center gap-3 text-base font-medium text-white">
              <span className={`lp-icon lp-icon-${i} h-7 w-7 rounded-full`}>
                <Icon name="check" className="h-4 w-4" />
              </span>
              {promise}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <div className="lp-glow !inset-[2%] !rounded-[36px]" />
        <LeadForm vertical={vertical} need={need} onNeedChange={onNeedChange} />
      </div>
    </div>
  </section>
);
