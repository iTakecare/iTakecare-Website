import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { CtaButton, Icon, SectionTitle } from "../components/ui";

const PackCard = ({ pack, onChoose }) => (
  <div className="relative h-full">
    {pack.highlight && <div className="lp-glow !inset-[4%] !rounded-[32px] !opacity-40" />}
    <div
      className={`lp-lift relative flex h-full flex-col rounded-[32px] p-6 md:p-8 ${
        pack.highlight
          ? "lp-gradient-border shadow-[0_20px_60px_rgba(124,108,240,0.25)]"
          : "bg-white shadow-[0_8px_30px_rgba(11,31,51,0.08)] ring-1 ring-[#0b1f33]/5"
      }`}
    >
      {pack.highlight && (
        <div className="absolute inset-x-0 -top-4 flex justify-center">
          <span className="whitespace-nowrap rounded-full bg-[linear-gradient(120deg,#48b5c3,#7c6cf0)] px-4 py-1.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(124,108,240,0.4)]">
            ✦ {pack.highlight}
          </span>
        </div>
      )}
      <div className="mb-6 rounded-[24px] bg-[radial-gradient(100%_100%_at_50%_0%,rgba(72,181,195,0.18),rgba(124,108,240,0.08)_60%,transparent)] p-3">
        <img src={pack.image} alt={pack.name} loading="lazy" className="mx-auto h-44 w-auto rounded-2xl object-contain md:h-52" />
      </div>
      <h3 className="text-2xl font-black text-[#0b1f33]">{pack.name}</h3>
      <p className="mb-5 text-[#0b1f33]/65">{pack.tagline}</p>
      <ul className="mb-6 flex flex-col gap-2.5">
        {pack.products.map((product) => (
          <li key={product} className="flex items-center gap-2.5 text-[#0b1f33]">
            <span className="lp-icon lp-icon-0 h-5 w-5 flex-shrink-0 rounded-full">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            {product}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <div className="mb-5 flex items-baseline gap-1.5">
          <span className="lp-gradient-text text-5xl font-black tracking-tight">{pack.price} €</span>
          <span className="text-sm text-[#0b1f33]/60">HTVA/mois</span>
        </div>
        <CtaButton className="w-full" onClick={() => onChoose(pack.name)}>
          Je veux ce pack
        </CtaButton>
        <a
          href={pack.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 block text-center text-sm text-[#0b1f33]/55 underline-offset-2 hover:text-[#2f97a6] hover:underline"
        >
          Voir le détail dans le catalogue
        </a>
      </div>
    </div>
  </div>
);

export const PackOffer = ({ packs, onChoose }) => {
  const threeUp = packs.items.length > 2;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f1fafb_50%,#f5f3ff_100%)] px-4 py-16 md:px-8 md:py-24">
      <div className={`mx-auto ${threeUp ? "max-w-[1240px]" : "max-w-[1000px]"}`}>
        <SectionTitle eyebrow="Nos packs" title={packs.title} subtitle={packs.subtitle} />
        <div className={`grid gap-8 ${threeUp ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {packs.items.map((pack, i) => (
            <ScrollReveal key={pack.name} direction="up" delay={i * 150} className="h-full">
              <PackCard pack={pack} onChoose={onChoose} />
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-[#0b1f33]/60">{packs.note}</p>
      </div>
    </section>
  );
};
