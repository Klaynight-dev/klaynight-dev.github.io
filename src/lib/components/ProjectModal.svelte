<script lang="ts">
  import { Github } from "lucide-svelte";
  import Papicon from "./Papicon.svelte";
  import type { Project } from "../data/projects";
  import { lockScroll, unlockScroll } from "../scroll";
  import ProjectCover from "./ProjectCover.svelte";
  import { domainColors, projectCategoryDomain } from "../data/domains";

  let { project, screenshots, onClose }: { project: Project | null; screenshots: Record<string, string>; onClose: () => void } = $props();

  let dialogEl: HTMLDivElement | undefined = $state();
  let lastFocused: HTMLElement | null = null;

  // Locks background scroll and moves focus into the dialog while a project
  // is open; restores both when it closes, same guard shape as the rest of
  // the site's effects (SmoothScroll, CustomCursor).
  $effect(() => {
    if (project) {
      lastFocused = document.activeElement as HTMLElement;
      lockScroll();
      queueMicrotask(() => dialogEl?.focus());
    } else if (lastFocused) {
      unlockScroll();
      lastFocused.focus();
      lastFocused = null;
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key !== "Tab" || !dialogEl) return;

    // Minimal focus trap: cycle Tab/Shift+Tab between the dialog's own
    // controls rather than letting it escape to the page underneath.
    const focusables = dialogEl.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
</script>

{#if project}
  {@const domain = domainColors[projectCategoryDomain[project.category]]}
  <div
    class="fixed inset-0 z-9999 flex items-center justify-center md:p-6 animate-fade-in"
    style="background: rgba(23, 21, 29, 0.45);"
    onclick={onClose}
    role="presentation"
  >
    <div
      bind:this={dialogEl}
      class="w-full max-w-6xl h-full md:h-[94vh] overflow-y-auto relative md:rounded-3xl md:border md:border-border"
      style="background: var(--bg);"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      tabindex="-1"
      data-lenis-prevent
      onclick={(e) => e.stopPropagation()}
      onkeydown={handleKeydown}
    >
      <!-- Zero-height sticky row keeps the close button reachable while reading -->
      <div class="sticky top-0 z-10 h-0 flex justify-end">
        <button
          type="button"
          onclick={onClose}
          class="pill-icon w-10 h-10 mt-4 mr-4 shadow-md"
          style="background: var(--surface); border: 1px solid var(--border);"
          aria-label="Fermer la fiche projet"
          title="Fermer"
        >
          <Papicon icon="Cross" size={16} />
        </button>
      </div>

      <div class="aspect-[16/10] md:aspect-[21/9] overflow-hidden border-b border-border" style="background: {domain.bg};">
        <ProjectCover {project} image={screenshots[project.image]} />
      </div>

      <div class="px-5 md:px-10 py-10 lg:grid lg:grid-cols-[180px_minmax(0,1fr)_180px] lg:gap-10">
        <!-- Table of contents, as on Tom's project pages -->
        <aside class="hidden lg:block">
          {#if project.sections}
            <nav class="sticky top-8 flex flex-col gap-1" aria-label="Sommaire du projet">
              <span class="text-xs font-semibold text-ink-muted px-3 pb-1">Sommaire</span>
              {#each project.sections as section, i}
                <button
                  type="button"
                  class="text-left text-sm text-ink-muted hover:text-ink hover:bg-surface-muted rounded-xl px-3 py-1.5 transition-colors"
                  onclick={() => dialogEl?.querySelector(`#project-section-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  {section.title}
                </button>
              {/each}
            </nav>
          {/if}
        </aside>

        <article class="max-w-2xl w-full mx-auto flex flex-col gap-6">
          <header class="flex flex-col items-center text-center gap-4">
            <div class="flex flex-wrap justify-center gap-2">
              {#if project.period}
                <span class="pill pill-primary px-3 py-1 text-xs">{project.period}</span>
              {/if}
              <span class="pill pill-neutral px-3 py-1 text-xs">{project.category}</span>
              {#if project.role}
                <span class="pill pill-neutral px-3 py-1 text-xs">{project.role}</span>
              {/if}
            </div>
            <h2 id="project-modal-title" class="text-4xl md:text-5xl font-display font-semibold text-ink leading-tight">
              {project.title}
            </h2>
            <div class="flex flex-wrap justify-center gap-1.5">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </header>

          <!-- "En bref" summary box, after Tom's article layout -->
          <div class="rounded-2xl p-5 flex flex-col gap-2" style="background: var(--surface-muted);">
            <span class="flex items-center gap-1.5 text-xs font-semibold text-ink">
              <Papicon icon="Sparkles" size={14} /> En bref
            </span>
            <p class="text-sm leading-relaxed" style="color: var(--ink-muted-strong);">{project.description}</p>
          </div>

          {#if project.stats}
            <dl class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              {#each project.stats as stat}
                <div class="flex flex-col gap-0.5">
                  <dd class="font-display font-semibold text-ink text-2xl">{stat.value}</dd>
                  <dt class="text-xs text-ink-muted">{stat.label}</dt>
                </div>
              {/each}
            </dl>
          {/if}

          {#each project.sections ?? [] as section, i}
            <section id="project-section-{i}" class="flex flex-col gap-3 pt-4 scroll-mt-6">
              <h3 class="text-2xl font-display font-semibold text-ink">{section.title}</h3>
              {#each section.body.split("\n\n") as paragraph}
                <p class="text-[0.95rem] text-ink leading-relaxed">{paragraph}</p>
              {/each}
              {#if section.image && screenshots[section.image]}
                <figure class="mt-3 flex flex-col gap-2">
                  <img
                    src={screenshots[section.image]}
                    alt={section.imageAlt ?? ""}
                    loading="lazy"
                    class="w-full rounded-2xl border border-border shadow-sm"
                  />
                  {#if section.caption}
                    <figcaption class="text-xs text-ink-muted">{section.caption}</figcaption>
                  {/if}
                </figure>
              {/if}
            </section>
          {/each}

          <div class="flex flex-wrap justify-center gap-3 mt-6 pt-6 border-t border-border">
            <a href={project.url} target="_blank" rel="noopener noreferrer" class="pill pill-primary px-5 py-2.5 text-sm">
              <Papicon icon="Globe" size={14} /> Voir le site
            </a>
            {#if project.github}
              <a href={project.github} target="_blank" rel="noopener noreferrer" class="pill pill-neutral px-5 py-2.5 text-sm">
                <Github size={14} /> Code source
              </a>
            {/if}
          </div>
        </article>
      </div>
    </div>
  </div>
{/if}
