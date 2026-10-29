import React from "react";
import { ScrollReveal } from "../../../components/ScrollReveal";
import { Icon, SectionTitle } from "../components/ui";

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export const Testimonials = ({ testimonials }) => (
  <section className="bg-[#f8f8f6] px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <SectionTitle title={testimonials.title} />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.items.map((item, i) => (
          <ScrollReveal key={item.name} direction="up" delay={i * 150}>
            <figure className="relative flex h-full flex-col rounded-[28px] bg-white p-7 shadow-sm">
              {item.placeholder && (
                <span className="absolute right-5 top-5 rounded-full bg-[#ffe9b3] px-3 py-0.5 text-xs font-bold text-[#8a6100]">
                  Exemple
                </span>
              )}
              <div className="mb-4 flex gap-1 text-[#f5b301]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Icon key={star} name="star" className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mb-6 flex-1 text-base leading-relaxed text-[#222222]">
                “{item.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {item.photo ? (
                  <img src={item.photo} alt="" loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#48b5c34f] font-bold text-[#48b5c3]">
                    {initials(item.name)}
                  </span>
                )}
                <div>
                  <div className="font-bold text-[#222222]">{item.name}</div>
                  <div className="text-sm text-[#222222]/60">
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
