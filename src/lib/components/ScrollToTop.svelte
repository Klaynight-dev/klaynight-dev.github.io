<script lang="ts">
  import { onMount } from "svelte";
  import Papicon from "./Papicon.svelte";
  import { scrollToTop } from "../scroll";

  // Appears once the reader has actually scrolled somewhere — showing it at
  // the top of the page would just be a button that does nothing (R-26).
  let visible = $state(false);

  onMount(() => {
    const onScroll = () => {
      visible = window.scrollY > 480;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
</script>

{#if visible}
  <button
    type="button"
    onclick={() => scrollToTop()}
    class="pill-icon fixed right-4 md:right-6 bottom-20 md:bottom-6 z-40 animate-fade-in"
    style="box-shadow: 0 8px 20px rgba(23, 21, 29, 0.16);"
    aria-label="Remonter en haut de la page"
    title="Remonter en haut"
  >
    <Papicon icon="ArrowUp" size={18} />
  </button>
{/if}
