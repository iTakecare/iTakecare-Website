import React from "react";
import { PixelBackground } from "../../../components/PixelBackground";
import { FORM_ANCHOR, Highlight, Icon } from "../components/ui";
import { LeadForm } from "./LeadForm";

const PROMISES = ["Sans engagement", "Réponse sous 24h ouvrables", "Un conseiller dédié, en Belgique"];

export const FinalCta = ({ vertical, need, onNeedChange }) => (
  <section
    id={FORM_ANCHOR}
    className="relative scroll-mt-4 overflow-hidden bg-[url(https://c.animaapp.com/o0FTU85R/img/bg-texture.svg)] bg-cover bg-center px-4 py-16 md:px-8 md:py-24"
  >
    <PixelBackground />
    <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 text-3xl font-black leading-tight text-[#222222] md:text-5xl">
          <Highlight text={vertical.form.title} pill />
        </h2>
        <p className="mb-8 text-lg text-[#222222]/80">{vertical.form.subtitle}</p>
        <ul className="flex flex-col gap-3">
          {PROMISES.map((promise) => (
            <li key={promise} className="flex items-center gap-3 text-base font-medium text-[#222222]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#48b5c3] text-white">
                <Icon name="check" className="h-4 w-4" />
              </span>
              {promise}
            </li>
          ))}
        </ul>
      </div>
      <LeadForm vertical={vertical} need={need} onNeedChange={onNeedChange} />
    </div>
  </section>
);
