import React from "react";
import { GlowButton } from "../../../components/GlowButton";

export const FORM_ANCHOR = "formulaire";

export const scrollToForm = () => {
  document.getElementById(FORM_ANCHOR)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// « Texte [surligné] » → le passage entre crochets prend la couleur de la marque.
export const Highlight = ({ text, pill = false }) =>
  text.split(/(\[[^\]]+\])/).map((part, i) =>
    part.startsWith("[") ? (
      <span
        key={i}
        className={pill ? "rounded-[20px] bg-[#48b5c34f] px-2 text-[#48b5c3] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]" : "text-[#48b5c3]"}
      >
        {part.slice(1, -1)}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );

export const SectionTitle = ({ title, subtitle, light = false }) => (
  <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
    <h2 className={`text-3xl font-black leading-tight md:text-4xl lg:text-[42px] ${light ? "text-white" : "text-[#222222]"}`}>
      <Highlight text={title} />
    </h2>
    {subtitle && (
      <p className={`mt-4 text-base md:text-lg ${light ? "text-white/80" : "text-[#222222]/70"}`}>{subtitle}</p>
    )}
  </div>
);

export const CtaButton = ({ children, onClick = scrollToForm, className = "" }) => (
  <GlowButton
    variant="primary"
    onClick={onClick}
    className={`inline-flex items-center justify-center px-6 py-3.5 text-base font-bold md:text-lg ${className}`}
  >
    {children} →
  </GlowButton>
);

const PATHS = {
  check: "M5 12.5l4.5 4.5L19 7.5",
  shield: "M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z M8.5 12l2.5 2.5 4.5-5",
  clock: "M12 7v5l3 2 M12 21a9 9 0 100-18 9 9 0 000 18z",
  truck: "M3 6h11v10H3z M14 10h4l3 3v3h-7 M7 19a2 2 0 100-4 2 2 0 000 4z M17 19a2 2 0 100-4 2 2 0 000 4z",
  refresh: "M20 11a8 8 0 00-14.9-3.5M4 4v4h4 M4 13a8 8 0 0014.9 3.5M20 20v-4h-4",
  slow: "M12 21a9 9 0 100-18 9 9 0 000 18z M12 12l-4-3",
  alert: "M12 3l9.5 17h-19L12 3z M12 10v4 M12 17.5v.5",
  wallet: "M3 7h16a2 2 0 012 2v9a2 2 0 01-2 2H3V7z M3 7l12-4v4 M16 13.5h2",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3z M9 8h6 M9 12h6",
  lock: "M6 11h12v10H6z M8.5 11V8a3.5 3.5 0 017 0v3",
  leaf: "M5 19c0-8 5-13 14-14-1 9-6 14-14 14z M5 19l7-7",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
};

export const Icon = ({ name, className = "h-6 w-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d={PATHS[name] || PATHS.check} />
  </svg>
);
