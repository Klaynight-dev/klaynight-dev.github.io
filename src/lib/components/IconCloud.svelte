<script lang="ts">
  import Papicon from "./Papicon.svelte";

  // Faint, tilted Papicons tucked into a title's top-left corner: the same motif as the
  // sidebar avatar's cloud. Goes inside a heading that carries the .cloud-host class.
  let { icons }: { icons: string[] } = $props();

  // One shared layout (offsets in rem from the corner, size in px, tilt in deg) so every
  // title's cloud reads as the same motif, only the icons change.
  const slots = [
    { x: -1.1, y: -1.5, size: 34, rotate: -14 },
    { x: 2.2, y: -2.1, size: 22, rotate: 12 },
    { x: 4.6, y: -1.3, size: 18, rotate: -6 },
    { x: -1.6, y: 1.3, size: 22, rotate: 10 }
  ];
</script>

<span class="title-cloud" aria-hidden="true">
  {#each icons.slice(0, slots.length) as icon, i}
    {@const slot = slots[i]}
    <span style="left: {slot.x}rem; top: {slot.y}rem; transform: rotate({slot.rotate}deg);">
      <Papicon {icon} size={slot.size} />
    </span>
  {/each}
</span>
