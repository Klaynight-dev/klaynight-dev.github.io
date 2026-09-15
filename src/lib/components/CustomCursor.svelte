<script lang="ts">
  import { onMount } from "svelte";
  import type BlobityInstance from "blobity";

  const OPACITY = 0.2;
  const FOCUSABLE =
    '[data-blobity], a:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]';

  // Blob cursor, same setup as old.tomthings.fr: a black blob at 0.3 opacity
  // that morphs onto links and buttons, at 0.2 rather than the reference 0.3:
  // this palette is muted where theirs is pure black, and 0.3 pushed the nav
  // tabs under WCAG AA. Fine pointers only — Blobity is loaded
  // lazily so touch devices never download it.
  onMount(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let blobity: BlobityInstance | null = null;
    let cancelled = false;
    let visible = true;

    // updateOptions() calls resize(), which reassigns canvas.width and so wipes
    // the canvas mid-frame. Only call it on a real transition: mouseenter and
    // mouseleave don't bubble, whereas mouseover/mouseout fire on every child of
    // every button and tear the blob apart.
    const setVisible = (next: boolean) => {
      if (!blobity || next === visible) return;
      visible = next;
      blobity.updateOptions({ opacity: next ? OPACITY : 0 });
    };
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    // Blobity morphs every target with one global radius. Ours run from 24px to
    // 52px tall, and a radius past half the height makes canvas roundRect fold
    // the corner arcs into concave wings, so give each element its own.
    const tagRadii = () => {
      document.querySelectorAll<HTMLElement>(FOCUSABLE).forEach((el) => {
        const { height } = el.getBoundingClientRect();
        if (!height) return;
        const own = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
        el.dataset.blobityRadius = String(Math.round(Math.min(own, height / 2)));
      });
    };

    let queued = 0;
    const queueTagRadii = () => {
      cancelAnimationFrame(queued);
      queued = requestAnimationFrame(tagRadii);
    };

    const observer = new MutationObserver(queueTagRadii);

    import("blobity").then(({ default: Blobity }) => {
      if (cancelled) return;

      blobity = new Blobity({
        color: "rgb(0, 0, 0)",
        zIndex: 10000,
        opacity: OPACITY,
        radius: 25,
        // Blobity's default "magnetic" pull applies translate3d + rotateX/Y
        // straight to the target element's inline style. On compact, tightly
        // packed pills (nav tabs, tags) that reads as a warped/torn corner
        // rather than a magnet effect, so it's off — the blob still morphs
        // onto elements via highlightElement(), it just doesn't drag them.
        magnetic: false,
      });

      tagRadii();
      observer.observe(document.body, { childList: true, subtree: true });

      document.documentElement.classList.add("custom-cursor-on");
      document.documentElement.addEventListener("mouseleave", hide);
      document.documentElement.addEventListener("mouseenter", show);
      window.addEventListener("resize", queueTagRadii);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(queued);
      observer.disconnect();
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      window.removeEventListener("resize", queueTagRadii);
      document.documentElement.classList.remove("custom-cursor-on");
      blobity?.destroy();
    };
  });
</script>
