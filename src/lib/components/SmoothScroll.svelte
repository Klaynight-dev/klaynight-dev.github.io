<script lang="ts">
  import { onMount } from "svelte";
  import Lenis from "lenis";
  import { setLenis } from "../scroll";

  // Same setup as beta.tomthings.fr: new Lenis({ autoRaf: true }) at the
  // page root, all defaults otherwise. It only takes over wheel/touch
  // inertia — anchor jumps (the section jump-nav) still go through the
  // native, CSS "scroll-behavior: smooth" path, same as on that reference.
  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  });
</script>
