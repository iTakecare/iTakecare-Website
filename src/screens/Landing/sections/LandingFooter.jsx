import React from "react";

const LINKS = [
  { label: "Mentions légales", href: "https://www.itakecare.be/mentions-legales" },
  { label: "Politique de confidentialité", href: "https://www.itakecare.be/politique-confidentialite" },
  { label: "CGV", href: "https://www.itakecare.be/conditions-generales" },
];

export const LandingFooter = () => (
  <footer className="border-t border-white/10 bg-[#071522] px-4 pb-24 pt-10 md:px-8 md:pb-10">
    <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-sm text-white/60 md:flex-row">
      <span>© {new Date().getFullYear()} iTakecare · Leasing de matériel informatique reconditionné</span>
      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {LINKS.map((link) => (
          <a key={link.label} href={link.href} className="text-white/60 transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);
