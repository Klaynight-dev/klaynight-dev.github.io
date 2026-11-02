<script lang="ts">
  import { Github } from "lucide-svelte";
  import Papicon from "./Papicon.svelte";
  import ProjectCover from "./ProjectCover.svelte";
  import { reveal } from "../actions/reveal";
  import type { Project } from "../data/projects";
  import { domainColors, projectCategoryDomain } from "../data/domains";

  // Stagger delay for tiles, capped so a long filtered list doesn't drag
  // the last tiles in for a full second.
  const staggerDelay = (i: number) => Math.min(i, 6) * 60;

  let {
    items,
    screenshots = {},
    visitLabel = "Visiter",
    onSelect
  }: {
    items: Project[];
    screenshots?: Record<string, string>;
    visitLabel?: string;
    onSelect?: (project: Project) => void;
  } = $props();

  // Le format de tuile vient du contenu, pas de la decoration : une interface
  // large se lit sur toute la ligne, une affiche verticale garde son portrait.
  function coverRatio(project: Project) {
    // En ligne, la hauteur vient de l'etirement flex : le minimum evite que le
    // visuel s'ecrase quand la description est courte.
    if (project.tile === "wide") return "aspect-[16/10] md:aspect-auto md:min-h-[17rem]";
    if (project.tile === "tall") return "aspect-[3/4]";
    return "aspect-[16/10]";
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
  {#each items as project, i (project.id)}
    {@const domain = domainColors[projectCategoryDomain[project.category]]}
    <article
      class="card card-interactive group flex flex-col overflow-hidden
             {project.tile === 'wide' ? 'md:col-span-2 md:flex-row' : ''}"
      style="--card-accent: {domain.hue};"
      use:reveal={{ delay: staggerDelay(i) }}
    >
      <div
        class="shrink-0 overflow-hidden bg-surface-muted
               {project.tile === 'wide'
                 ? 'border-b md:border-b-0 md:border-r md:w-1/2'
                 : 'border-b'}
               border-border {coverRatio(project)}"
      >
        {#if onSelect}
          <button
            type="button"
            data-no-blobity
            onclick={() => onSelect(project)}
            class="block w-full h-full"
            aria-label="Voir les détails de {project.title}"
          >
            <ProjectCover {project} image={screenshots[project.image]} />
          </button>
        {:else}
          <ProjectCover {project} image={screenshots[project.image]} />
        {/if}
      </div>

      <div class="flex flex-col flex-1 min-w-0">
        <div class="p-6 flex flex-col gap-2.5 flex-1">
          <span class="tag w-fit" style="background: {domain.bg}; color: {domain.text};">{project.category}</span>

          <h3 class="text-xl font-display font-semibold text-ink">
            {#if onSelect}
              <button
                type="button"
                onclick={() => onSelect(project)}
                class="text-left transition-colors group-hover:text-(--card-accent)"
              >
                {project.title}
              </button>
            {:else}
              <span class="transition-colors group-hover:text-(--card-accent)">{project.title}</span>
            {/if}
          </h3>

          <p class="text-sm text-ink-muted leading-relaxed flex-1">
            {project.description}
          </p>

          <div class="flex flex-wrap gap-1.5 mt-1">
            {#each project.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>

        <div class="px-5 py-3 border-t border-border flex items-center justify-between text-sm">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            class="pill pill-neutral px-3.5 py-1.5 text-xs"
          >
            <Papicon icon="Globe" size={13} /> {visitLabel}
          </a>

          {#if project.github}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              class="pill-icon w-9 h-9"
              title="Code source de {project.title}"
              aria-label="Code source de {project.title} sur GitHub"
            >
              <Github size={14} />
            </a>
          {/if}
        </div>
      </div>
    </article>
  {/each}
</div>
