import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SiteRedirect } from "./components/SiteRedirect";
import { scrollToForm } from "./components/ui";
import { captureAttribution, track } from "./lib/leads";
import { useLandingMeta } from "./useLandingMeta";
import "./Landing.css";
import { VERTICALS } from "./verticals";
import { SantePage } from "./sante/SantePage";
import { Benefits } from "./sections/Benefits";
import { Comparison } from "./sections/Comparison";
import { FinalCta } from "./sections/FinalCta";
import { LandingFaq } from "./sections/LandingFaq";
import { LandingFooter } from "./sections/LandingFooter";
import { LandingHero } from "./sections/LandingHero";
import { PackOffer } from "./sections/PackOffer";
import { PainPoints } from "./sections/PainPoints";
import { StickyCta } from "./sections/StickyCta";
import { Steps } from "./sections/Steps";
import { Testimonials } from "./sections/Testimonials";
import { TrustBar } from "./sections/TrustBar";

const Landing = ({ vertical }) => {
  // Pack choisi depuis une carte : pré-rempli dans le formulaire.
  const [need, setNeed] = useState(null);
  useLandingMeta(vertical.meta);

  useEffect(() => {
    captureAttribution();
    track("ViewContent", { content_category: vertical.slug });
  }, [vertical.slug]);

  const choosePack = (packName) => {
    setNeed(packName);
    scrollToForm();
  };

  // La page santé a son propre design (maquette du 30/10/2026).
  if (vertical.slug === "sante") return <SantePage />;

  return (
    <main className="landing w-full overflow-x-hidden bg-white font-[Inter] text-[#222222]">
      <LandingHero hero={vertical.hero} />
      <TrustBar />
      <PainPoints painPoints={vertical.painPoints} />
      <PackOffer packs={vertical.packs} onChoose={choosePack} />
      <Steps />
      <Benefits benefits={vertical.benefits} />
      <Testimonials testimonials={vertical.testimonials} />
      <Comparison />
      <LandingFaq faq={vertical.faq} />
      <FinalCta vertical={vertical} need={need} onNeedChange={setNeed} />
      <LandingFooter />
      <StickyCta label="Recevoir mon offre" priceFrom={vertical.hero.priceFrom} />
    </main>
  );
};

export const LandingPage = () => {
  const { vertical } = useParams();
  const config = VERTICALS[vertical];
  if (!config) return <SiteRedirect />;
  // `key` remet l'état à zéro si on passe d'une verticale à l'autre.
  return <Landing key={config.slug} vertical={config} />;
};
