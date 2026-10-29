import React, { useState } from "react";
import { SectionTitle } from "../components/ui";

export const LandingFaq = ({ faq }) => {
  const [open, setOpen] = useState(0);

  return (
    <section className="lp-dots bg-[#f6fafb] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[860px]">
        <SectionTitle eyebrow="FAQ" title={faq.title} />
        <div className="flex flex-col gap-3">
          {faq.items.map((item, i) => (
            <div
              key={item.q}
              className={`rounded-[24px] transition-shadow ${
                open === i
                  ? "lp-gradient-border shadow-[0_15px_40px_rgba(72,181,195,0.18)]"
                  : "bg-white shadow-[0_4px_20px_rgba(11,31,51,0.05)] ring-1 ring-[#0b1f33]/5"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-[#0b1f33] md:text-lg"
              >
                {item.q}
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#48b5c3,#7c6cf0)] text-xl text-white shadow-[0_6px_16px_rgba(124,108,240,0.35)] transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && <p className="px-6 pb-6 text-base leading-relaxed text-[#0b1f33]/65">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
