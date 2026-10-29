import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SiteRedirect } from "./components/SiteRedirect";
import { Icon } from "./components/ui";
import { track } from "./lib/leads";
import { useLandingMeta } from "./useLandingMeta";
import "./Landing.css";
import { VERTICALS } from "./verticals";
import { LandingFooter } from "./sections/LandingFooter";

const NEXT_STEPS = [
  "Vous recevez un e-mail de confirmation",
  "Un conseiller vous appelle pour comprendre vos besoins",
  "Vous recevez votre offre personnalisée",
];

export const ThankYouPage = () => {
  const { vertical } = useParams();
  const config = VERTICALS[vertical];
  useLandingMeta({ title: "Merci ! — iTakecare", description: config?.meta.description ?? "" });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!config) return <SiteRedirect />;
  const { thankYou } = config;

  const book = () => {
    track("Schedule", { content_category: config.slug });
    window.open(thankYou.bookingUrl, "_blank", "noopener");
  };

  return (
    <main className="landing flex min-h-screen w-full flex-col bg-white font-[Inter] text-[#222222]">
      <section className="relative flex-1 overflow-hidden bg-[linear-gradient(180deg,#f3fbfc_0%,#ffffff_80%)] px-4 py-10 md:px-8">
        <div className="lp-aurora">
          <span />
        </div>
        <div className="relative z-10 mx-auto max-w-[720px]">
          <img className="mx-auto mb-12 h-10 w-auto" alt="iTakecare" src="https://c.animaapp.com/o0FTU85R/img/logo-1@2x.png" />
          <div className="lp-glass rounded-[32px] p-8 text-center md:p-12">
            <span className="lp-icon lp-icon-1 mx-auto mb-6 h-20 w-20 rounded-full shadow-[0_0_0_10px_rgba(72,181,195,0.12),0_15px_40px_rgba(124,108,240,0.4)]">
              <Icon name="check" className="h-9 w-9" />
            </span>
            <h1 className="mb-4 text-3xl font-black leading-tight md:text-4xl">{thankYou.title}</h1>
            <p className="mb-8 text-lg text-[#222222]/70">{thankYou.text}</p>

            {thankYou.bookingUrl && (
              <div className="mb-10">
                <p className="mb-4 font-bold">Vous préférez choisir le moment ?</p>
                <button type="button" onClick={book} className="lp-cta px-7 py-4 text-lg">
                  Réserver 15 min avec un conseiller →
                </button>
              </div>
            )}

            <ol className="mx-auto flex max-w-[420px] flex-col gap-4 text-left">
              {NEXT_STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-4">
                  <span className={`lp-icon lp-icon-${i} h-9 w-9 flex-shrink-0 rounded-full font-black`}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <LandingFooter />
    </main>
  );
};
