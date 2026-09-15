// Scroll-reveal action: adds "is-visible" once an element enters the viewport.
// Same reduced-motion guard as SmoothScroll.svelte and CustomCursor.svelte —
// content must never depend on this to become visible.
export function reveal(node: HTMLElement, params?: { delay?: number }) {
  node.classList.add("reveal");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    node.classList.add("is-visible");
    return {};
  }

  if (params?.delay) {
    node.style.transitionDelay = `${params.delay}ms`;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      }
    },
    { threshold: 0.15 }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
