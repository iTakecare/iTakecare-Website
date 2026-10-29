import React from "react";
import { PixelBackground } from "../../../components/PixelBackground";
import { ParallaxElement } from "../../../components/ParallaxElement";
import { CtaButton, Highlight, Icon } from "../components/ui";
import { LandingHeader } from "./LandingHeader";

const HeroVisual = ({ hero }) => (
  <div className="relative mx-auto w-full max-w-[560px]">
    {hero.image ? (
      <img
        src={hero.image}
        alt=""
        className="aspect-[4/3] w-full rounded-[32px] object-cover shadow-xl"
        fetchpriority="high"
      />
    ) : (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-[32px] border-2 border-dashed border-[#48b5c3] bg-white/70 p-6 text-center backdrop-blur-sm">
        <img
          src="https://c.animaapp.com/o0FTU85R/img/computer.png"
          alt=""
          className="w-3/4 max-w-[320px]"
        />
        <p className="text-sm text-[#222222]/60">{hero.imagePlaceholder}</p>
      </div>
    )}

    {/* Badges flottants de réassurance */}
    <ParallaxElement speed={0.15} className="absolute -left-2 top-6 md:-left-8">
      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#48b5c34f] text-[#48b5c3]">
          <Icon name="refresh" className="h-5 w-5" />
        </span>
        <div className="text-sm font-bold leading-tight text-[#222222]">
          Remplacé
          <br />
          <span className="text-[#48b5c3]">sous 24h</span>
        </div>
      </div>
    </ParallaxElement>
    <div className="absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg md:-right-6">
      <Icon name="star" className="h-7 w-7 fill-[#f5b301] text-[#f5b301]" />
      <div className="leading-tight">
        <div className="text-lg font-black text-[#222222]">4,8/5</div>
        <div className="text-xs text-[#222222]/70">satisfaction clients</div>
      </div>
    </div>
  </div>
);

export const LandingHero = ({ hero }) => (
  <section className="relative w-full overflow-hidden bg-[url(https://c.animaapp.com/o0FTU85R/img/bg-texture.svg)] bg-cover bg-center">
    <PixelBackground />
    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 md:px-8">
      <LandingHeader cta="Mon offre" />

      <div className="grid grid-cols-1 items-center gap-12 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#48b5c3] shadow-sm">
            {hero.eyebrow}
          </span>
          <h1 className="text-4xl font-black leading-[1.1] text-[#222222] md:text-5xl lg:text-[56px]">
            <Highlight text={hero.title} pill />
          </h1>
          <p className="text-lg leading-relaxed text-[#222222]/80 md:text-xl">{hero.subtitle}</p>
          <ul className="flex flex-col gap-3">
            {hero.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-base text-[#222222] md:text-lg">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#48b5c3] text-white">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <CtaButton>{hero.cta}</CtaButton>
            <p className="text-sm text-[#222222]/70">
              Dès <strong className="text-2xl font-black text-[#222222]">{hero.priceFrom} €</strong> HTVA/mois
              <br />
              Sans engagement · Réponse sous 24h
            </p>
          </div>
        </div>

        <HeroVisual hero={hero} />
      </div>
    </div>
  </section>
);
