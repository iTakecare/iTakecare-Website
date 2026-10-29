import { useEffect } from "react";

const setMeta = (name, content) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
  return tag;
};

// Titre, description et noindex : les LP reçoivent du trafic payant, pas de référencement naturel.
export const useLandingMeta = ({ title, description }) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    setMeta("description", description);
    const robots = setMeta("robots", "noindex, nofollow");
    return () => {
      document.title = previousTitle;
      robots.remove();
    };
  }, [title, description]);
};
