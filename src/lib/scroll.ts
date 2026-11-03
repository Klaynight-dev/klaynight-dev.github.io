import type Lenis from "lenis";

// Lenis owns the actual scroll position once mounted (SmoothScroll.svelte).
// Anything that needs to move the page programmatically (scroll-to-top,
// locking scroll behind a modal) has to go through it instead of
// window.scrollTo, or the two fight each other.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

// immediate: jump without animation (tab switches swap the whole page).
export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  const instant =
    immediate ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("no-smooth-scroll");
  window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
}

export function lockScroll() {
  lenis?.stop();
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  lenis?.start();
  document.body.style.overflow = "";
}
