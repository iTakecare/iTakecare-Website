import React from "react";
import { CtaButton, Icon } from "../components/ui";

// TODO : renseigner le numéro commercial, ex. { label: "+32 (0)2 123 45 67", href: "tel:+3221234567" }.
// Tant qu'il vaut null, aucun numéro n'est affiché.
const PHONE = null;

// Header de LP : logo + CTA uniquement, pas de menu (aucune fuite hors du funnel).
export const LandingHeader = ({ cta }) => (
  <header className="relative z-20 mx-auto mt-4 flex w-full max-w-[1320px] items-center gap-4 rounded-[50px] border-2 border-[#e1e1e1] bg-[#f8f8f6] px-4 py-2.5 md:mt-6 md:px-5 md:py-3">
    <img
      className="h-8 w-auto md:h-10"
      alt="iTakecare"
      src="https://c.animaapp.com/o0FTU85R/img/logo-1@2x.png"
    />
    <div className="ml-auto flex items-center gap-3">
      {PHONE && (
        <a
          href={PHONE.href}
          className="hidden items-center gap-2 text-sm font-medium text-[#222222] hover:text-[#48b5c3] md:inline-flex"
        >
          <Icon name="phone" className="h-4 w-4" />
          {PHONE.label}
        </a>
      )}
      <CtaButton className="!px-4 !py-2 !text-sm md:!text-base">{cta}</CtaButton>
    </div>
  </header>
);
