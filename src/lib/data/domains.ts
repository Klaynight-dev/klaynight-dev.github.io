/**
 * Domain color system — see DESIGN.md "Palette domaines (ajout)".
 * Each hue maps to a real content category (project category or skill
 * group), never applied decoratively. `bg`/`text` pairs are pre-tinted so
 * every combination clears AA contrast (4.5:1+) without runtime computation.
 */
export type Domain = "webdev" | "design" | "apps" | "backend" | "cloud";

export const domainColors: Record<Domain, { hue: string; bg: string; text: string }> = {
  webdev: { hue: "#B570E5", bg: "#f3e8fb", text: "#4c2f60" },
  design: { hue: "#AFDB8F", bg: "#edf7e6", text: "#3d4d32" },
  apps: { hue: "#C4BE8E", bg: "#f1efe4", text: "#4a4836" },
  backend: { hue: "#0D837E", bg: "#d8ebea", text: "#074845" },
  cloud: { hue: "#A6D1EA", bg: "#ebf5fa", text: "#35434b" }
};

export const projectCategoryDomain: Record<"Web Development" | "Web Design" | "Applications", Domain> = {
  "Web Development": "webdev",
  "Web Design": "design",
  "Applications": "apps"
};
