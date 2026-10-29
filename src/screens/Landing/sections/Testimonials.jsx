import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { Icon, SectionTitle } from "../components/ui";

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export const Testimonials = ({ testimonials }) => (
  <section className="relative overflow-hidden bg-[radial-gradient(60%_80%_at_0%_0%,rgba(72,181,195,0.22),transparent_60%),radial-gradient(50%_70%_at_100%_100%,rgba(124,108,240,0.2),transparent_60%),#f6fafb] px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <SectionTitle eyebrow="Ils nous font confiance" title={testimonials.title} />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.items.map((item, i) => (
          <ScrollReveal key={item.name} direction="up" delay={i * 150} className="h-full">
            <figure className="lp-glass lp-lift relative flex h-full flex-col rounded-[28px] p-7">
              <span aria-hidden="true" className="lp-gradient-text absolute right-6 top-2 font-serif text-7xl leading-none opacity-70">
                ”
              </span>
              {item.placeholder && (
                <span className="absolute left-7 top-[-10px] rounded-full bg-[#ffe9b3] px-3 py-0.5 text-xs font-bold text-[#8a6100]">
                  Exemple
                </span>
              )}
              <div className="mb-4 flex gap-1 text-[#f5b301]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Icon key={star} name="star" className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mb-6 flex-1 text-base leading-relaxed text-[#0b1f33] md:text-[17px]">
                “{item.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {item.photo ? (
                  <img src={item.photo} alt="" loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#48b5c3,#7c6cf0)] font-bold text-white">
                    {initials(item.name)}
                  </span>
                )}
                <div>
                  <div className="font-bold text-[#0b1f33]">{item.name}</div>
                  <div className="text-sm text-[#0b1f33]/60">
                    {item.role} · {item.city}
                  </div>
                </div>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
