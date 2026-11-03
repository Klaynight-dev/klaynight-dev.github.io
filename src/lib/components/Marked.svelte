<script lang="ts">
  // Renders ==words== from the data as bold key words, for skim reading.
  let { text }: { text: string } = $props();
  const parts = $derived(text.split("=="));
</script>

{#each parts as part, i}{#if i % 2}<mark class="text-mark">{part}</mark>{:else}{part}{/if}{/each}
