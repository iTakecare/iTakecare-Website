import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { Icon, SectionTitle } from "../components/ui";

export const PainPoints = ({ painPoints }) => (
  <section className="bg-[#f8f8f6] px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <SectionTitle title={painPoints.title} />
      <div className="grid gap-6 md:grid-cols-3">
        {painPoints.items.map((item, i) => (
          <ScrollReveal key={item.title} direction="up" delay={i * 150}>
            <div className="h-full rounded-[28px] border-2 border-[#e1e1e1] bg-white p-7">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#222222] text-white">
                <Icon name={item.icon} />
              </span>
              <h3 className="mb-2 text-xl font-bold text-[#222222]">{item.title}</h3>
              <p className="text-base leading-relaxed text-[#222222]/70">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <p className="mt-10 text-center text-lg font-bold text-[#222222] md:text-xl">
        Et si votre matériel devenait <span className="text-[#48b5c3]">la dernière de vos préoccupations</span> ?
      </p>
    </div>
  </section>
);
