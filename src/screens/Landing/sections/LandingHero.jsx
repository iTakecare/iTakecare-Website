import React from "react";
import { CtaButton, Highlight, Icon } from "../components/ui";
import { LandingHeader } from "./LandingHeader";

const Badge = ({ icon, title, text, className = "", iconClass = "lp-icon-0" }) => (
  <div className={`lp-glass absolute flex items-center gap-2.5 rounded-2xl px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 ${className}`}>
    <span className={`lp-icon ${iconClass} h-8 w-8 flex-shrink-0 rounded-xl sm:h-10 sm:w-10`}>
      <Icon name={icon} className="h-5 w-5" />
    </span>
    <div className="leading-tight">
      <div className="text-xs font-black text-[#0b1f33] sm:text-sm">{title}</div>
      <div className="text-[11px] text-[#0b1f33]/60 sm:text-xs">{text}</div>
    </div>
  </div>
);

const HeroVisual = ({ hero }) => (
  <div className="relative mx-auto aspect-[5/4] w-full max-w-[580px]">
    <div className="lp-glow" />

    {/* Carte principale : la photo métier quand elle existe, sinon le MacBook iTakecare. */}
    <div className="lp-float absolute inset-[6%] flex items-center justify-center overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#48b5c3_0%,#22d3ee_45%,#7c6cf0_100%)] shadow-[0_30px_80px_rgba(72,181,195,0.45)] ring-1 ring-white/40">
      {/* Reflets : anneaux et lumière en haut à gauche. */}
      <div className="absolute -left-1/4 -top-1/3 h-[90%] w-[90%] rounded-full bg-white/25 blur-3xl" />
      <div className="absolute -bottom-1/3 -right-1/4 h-[80%] w-[80%] rounded-full border-[28px] border-white/10" />
      <div className="absolute -right-[10%] -top-[30%] h-[60%] w-[60%] rounded-full border-[14px] border-white/10" />
      <div className="lp-dots absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)]" />
      {hero.image ? (
        <img src={hero.image} alt="" className="relative h-full w-full object-cover" fetchpriority="high" />
      ) : (
        <img
          src="https://c.animaapp.com/o0FTU85R/img/computer.png"
          alt=""
          className="relative mt-[34%] w-[100%] max-w-none drop-shadow-[0_35px_45px_rgba(11,31,51,0.45)]"
          fetchpriority="high"
        />
      )}
    </div>

    <Badge
      icon="refresh"
      title="Remplacé sous 24h"
      text="en cas de panne"
      className="lp-float-delay -left-2 top-[8%] md:-left-6"
    />
    <Badge
      icon="star"
      title="4,8/5"
      text="satisfaction clients"
      iconClass="lp-icon-2"
      className="lp-float -right-1 top-[38%] md:-right-6"
    />
    <Badge
      icon="truck"
      title="Livré en 3 à 5 jours"
      text="gratuitement, prêt à l'emploi"
      iconClass="lp-icon-3"
      className="lp-float-delay bottom-[4%] left-[6%] max-sm:!hidden"
    />
  </div>
);

export const LandingHero = ({ hero }) => (
  <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#f3fbfc_0%,#ffffff_70%)]">
    <div className="lp-aurora">
      <span />
    </div>
    <div className="lp-dots absolute inset-0 opacity-60 [mask-image:linear-gradient(180deg,#000,transparent_80%)]" />

    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 md:px-8">
      <LandingHeader cta="Mon offre" />

      <div className="grid grid-cols-1 items-center gap-14 pb-20 pt-10 md:pb-28 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-6">
          <span className="lp-glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-[#2f97a6]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34d399]" />
            </span>
            {hero.eyebrow}
          </span>

          <h1 className="text-[40px] font-black leading-[1.05] tracking-[-0.02em] text-[#0b1f33] md:text-6xl lg:text-[64px]">
            <Highlight text={hero.title} pill />
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#0b1f33]/75 md:text-xl">{hero.subtitle}</p>

          <ul className="flex flex-col gap-3">
            {hero.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-base font-medium text-[#0b1f33] md:text-lg">
                <span className="lp-icon lp-icon-0 mt-0.5 h-6 w-6 flex-shrink-0 rounded-full">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
            <CtaButton>{hero.cta}</CtaButton>
            <div className="text-sm leading-tight text-[#0b1f33]/70">
              Dès{" "}
              <strong className="lp-gradient-text text-3xl font-black">{hero.priceFrom} €</strong>{" "}
              HTVA/mois
              <div className="mt-1">Sans engagement · Réponse sous 24h</div>
            </div>
          </div>

          {/* Réassurance immédiate, sous le bouton. */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#0b1f33]/10 pt-5 text-sm text-[#0b1f33]/70">
            <span className="flex items-center gap-1.5">
              <span className="flex text-[#f5b301]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Icon key={star} name="star" className="h-4 w-4 fill-current" />
                ))}
              </span>
              <strong className="text-[#0b1f33]">4,8/5</strong> de satisfaction
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="shield" className="h-4 w-4 text-[#2f97a6]" /> Garantie tout le contrat
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="leaf" className="h-4 w-4 text-[#2f97a6]" /> Reconditionné premium
            </span>
          </div>
        </div>

        <HeroVisual hero={hero} />
      </div>
    </div>
  </section>
);
