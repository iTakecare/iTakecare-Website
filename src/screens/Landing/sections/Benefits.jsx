import React from "react";
import { FloatingCard } from "../../../components/FloatingCard";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { Icon, SectionTitle } from "../components/ui";

export const Benefits = ({ benefits }) => (
  <section className="px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <SectionTitle title={benefits.title} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.items.map((item, i) => (
          <ScrollReveal key={item.title} direction="up" delay={i * 120}>
            <FloatingCard delay={i} className="h-full">
              <div className="h-full rounded-[28px] bg-[#f8f8f6] p-7">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#48b5c3] text-white">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mb-2 text-lg font-bold text-[#222222]">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#222222]/70">{item.text}</p>
              </div>
            </FloatingCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
