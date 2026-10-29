import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { CtaButton, Icon, SectionTitle } from "../components/ui";

const PackCard = ({ pack, onChoose }) => (
  <div
    className={`relative flex h-full flex-col rounded-[32px] bg-white p-6 md:p-8 ${
      pack.highlight ? "border-2 border-[#48b5c3] shadow-[0_12px_40px_rgba(72,181,195,0.25)]" : "border-2 border-[#e1e1e1]"
    }`}
  >
    {pack.highlight && (
      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#48b5c3] px-4 py-1 text-sm font-bold text-white">
        {pack.highlight}
      </span>
    )}
    <img src={pack.image} alt={pack.name} loading="lazy" className="mx-auto mb-6 h-44 w-auto object-contain md:h-52" />
    <h3 className="text-2xl font-black text-[#222222]">{pack.name}</h3>
    <p className="mb-5 text-[#222222]/70">{pack.tagline}</p>
    <ul className="mb-6 flex flex-col gap-2.5">
      {pack.products.map((product) => (
        <li key={product} className="flex items-center gap-2.5 text-[#222222]">
          <Icon name="check" className="h-5 w-5 flex-shrink-0 text-[#48b5c3]" />
          {product}
        </li>
      ))}
    </ul>
    <div className="mt-auto">
      <div className="mb-5 flex items-baseline gap-1.5">
        <span className="text-4xl font-black text-[#222222]">{pack.price} €</span>
        <span className="text-sm text-[#222222]/70">HTVA/mois</span>
      </div>
      <CtaButton className="w-full" onClick={() => onChoose(pack.name)}>
        Je veux ce pack
      </CtaButton>
      <a
        href={pack.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 block text-center text-sm text-[#222222]/60 underline-offset-2 hover:text-[#48b5c3] hover:underline"
      >
        Voir le détail dans le catalogue
      </a>
    </div>
  </div>
);

export const PackOffer = ({ packs, onChoose }) => {
  const threeUp = packs.items.length > 2;

  return (
    <section className="relative px-4 py-16 md:px-8 md:py-24">
      <div className={`mx-auto ${threeUp ? "max-w-[1240px]" : "max-w-[1000px]"}`}>
        <SectionTitle title={packs.title} subtitle={packs.subtitle} />
        <div className={`grid gap-8 ${threeUp ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {packs.items.map((pack, i) => (
            <ScrollReveal key={pack.name} direction="up" delay={i * 150} className="h-full">
              <PackCard pack={pack} onChoose={onChoose} />
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[#222222]/60">{packs.note}</p>
      </div>
    </section>
  );
};
