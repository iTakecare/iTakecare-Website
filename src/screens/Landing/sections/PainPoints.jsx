import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { Icon, SectionTitle } from "../components/ui";

export const PainPoints = ({ painPoints }) => (
  <section className="lp-dots relative px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <SectionTitle eyebrow="On vous comprend" title={painPoints.title} />
      <div className="grid gap-6 md:grid-cols-3">
        {painPoints.items.map((item, i) => (
          <ScrollReveal key={item.title} direction="up" delay={i * 150} className="h-full">
            <div className="lp-lift relative h-full overflow-hidden rounded-[28px] bg-white p-7 shadow-[0_8px_30px_rgba(11,31,51,0.07)] ring-1 ring-[#0b1f33]/5">
              <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#48b5c3,#22d3ee,#7c6cf0)]" />
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b1f33] text-[#7fe3ee]">
                <Icon name={item.icon} />
              </span>
              <h3 className="mb-2 text-xl font-bold text-[#0b1f33]">{item.title}</h3>
              <p className="text-base leading-relaxed text-[#0b1f33]/65">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <p className="mt-12 text-center text-xl font-black text-[#0b1f33] md:text-2xl">
        Et si votre matériel devenait <span className="lp-gradient-text">la dernière de vos préoccupations</span> ?
      </p>
    </div>
  </section>
);
