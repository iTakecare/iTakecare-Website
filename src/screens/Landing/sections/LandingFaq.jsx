import React, { useState } from "react";
import { SectionTitle } from "../components/ui";

export const LandingFaq = ({ faq }) => {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#f8f8f6] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[860px]">
        <SectionTitle title={faq.title} />
        <div className="flex flex-col gap-3">
          {faq.items.map((item, i) => (
            <div key={item.q} className="rounded-[24px] border-2 border-[#e1e1e1] bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-[#222222] md:text-lg"
              >
                {item.q}
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#48b5c3] text-xl text-white transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && <p className="px-6 pb-6 text-base leading-relaxed text-[#222222]/70">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
