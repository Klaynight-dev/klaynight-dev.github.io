<script lang="ts">
  import type { Project } from "../data/projects";

  let { project, image = "" }: { project: Project; image?: string } = $props();

  // Slugs simple-icons verifies un par un. Un tag absent de cette table reste
  // une pilule de texte : mieux vaut pas de logo qu'un carre casse.
  const brandSlugs: Record<string, string> = {
    "Svelte": "svelte",
    "SvelteKit": "svelte",
    "TypeScript": "typescript",
    "JavaScript": "javascript",
    "Node.js": "nodedotjs",
    "Bun": "bun",
    "Prisma": "prisma",
    "PostgreSQL": "postgresql",
    "Redis": "redis",
    "Docker": "docker",
    "Vite": "vite",
    "Tailwind": "tailwindcss",
    "TailwindCSS": "tailwindcss",
    "PHP": "php",
    "SQL": "postgresql",
    "HTML": "html5",
    "HTML5": "html5",
    "CSS": "css",
    "CSS3": "css",
    "Java": "openjdk",
    "Figma": "figma"
  };

  const chips = $derived(
    project.tags.map((tag) => ({ tag, slug: brandSlugs[tag] }))
  );

  // Les logos chargent depuis un CDN : si l'un d'eux tombe, la pilule doit
  // rester lisible plutot que garder un carre vide a sa gauche.
  function hideBrokenLogo(event: Event) {
    (event.currentTarget as HTMLImageElement).hidden = true;
  }
</script>

{#if image}
  <img
    src={image}
    alt={project.imageAlt ?? ""}
    class="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
  />
{:else}
  <!--
    Pas de capture pour ce projet : on montre ce dont il est fait plutot que de
    mettre en scene une fausse interface. Les pilules reprennent le motif
    d'identite du site, et leur contenu est verifiable (c'est la vraie stack).
  -->
  <div class="w-full h-full flex items-center justify-center p-5" style="background: var(--surface-muted);">
    <div class="flex flex-wrap items-center justify-center gap-2 max-w-sm">
      {#each chips as chip}
        <span
          class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono"
          style="background: var(--surface); border-color: var(--border); color: var(--ink);"
        >
          {#if chip.slug}
            <img
              src="https://cdn.simpleicons.org/{chip.slug}"
              alt=""
              class="w-3.5 h-3.5 object-contain shrink-0"
              loading="lazy"
              onerror={hideBrokenLogo}
            />
          {/if}
          {chip.tag}
        </span>
      {/each}
    </div>
  </div>
{/if}
