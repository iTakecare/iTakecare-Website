import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { Icon, SectionTitle } from "../components/ui";

export const Benefits = ({ benefits }) => (
  <section className="lp-dots relative px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <SectionTitle eyebrow="Les avantages" title={benefits.title} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.items.map((item, i) => (
          <ScrollReveal key={item.title} direction="up" delay={i * 120} className="h-full">
            <div className="lp-lift h-full rounded-[28px] bg-white p-7 shadow-[0_8px_30px_rgba(11,31,51,0.07)] ring-1 ring-[#0b1f33]/5">
              <span className={`lp-icon lp-icon-${i % 4} mb-5 h-12 w-12 rounded-2xl`}>
                <Icon name={item.icon} />
              </span>
              <h3 className="mb-2 text-lg font-bold text-[#0b1f33]">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#0b1f33]/65">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
