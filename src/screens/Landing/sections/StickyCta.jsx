import React, { useEffect, useState } from "react";
import { CtaButton, FORM_ANCHOR } from "../components/ui";

// Bouton fixé en bas d'écran sur mobile : visible après le hero, masqué quand le formulaire est à l'écran.
export const StickyCta = ({ label, priceFrom }) => {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById(FORM_ANCHOR);
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 });
    if (form) observer.observe(form);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const visible = pastHero && !formVisible;

  return (
    <div
      className={`lp-glass fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 rounded-t-[24px] px-4 py-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="text-xs leading-tight text-[#0b1f33]/60">
        Dès
        <div className="lp-gradient-text text-lg font-black">{priceFrom} €</div>
        HTVA/mois
      </div>
      <CtaButton className="flex-1 !py-3 !text-base">{label}</CtaButton>
    </div>
  );
};
