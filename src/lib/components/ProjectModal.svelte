<script lang="ts">
  import { X, Eye, Github } from "lucide-svelte";
  import type { Project } from "../data/projects";
  import { lockScroll, unlockScroll } from "../scroll";
  import ProjectCover from "./ProjectCover.svelte";

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
  <div
    class="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-8 animate-fade-in"
    style="background: rgba(23, 21, 29, 0.45);"
    onclick={onClose}
    role="presentation"
  >
    <div
      bind:this={dialogEl}
      class="card w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      tabindex="-1"
      data-lenis-prevent
      onclick={(e) => e.stopPropagation()}
      onkeydown={handleKeydown}
    >
      <button
        type="button"
        onclick={onClose}
        class="pill-icon w-9 h-9 absolute right-4 top-4 z-10"
        style="background: var(--surface); border: 1px solid var(--border);"
        aria-label="Fermer la fiche projet"
        title="Fermer"
      >
        <X size={16} />
      </button>

      <div class="aspect-[16/10] overflow-hidden bg-surface-muted border-b border-border">
        <ProjectCover {project} image={screenshots[project.image]} />
      </div>

      <div class="p-6 flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <span class="tag w-fit">{project.category}</span>
          {#if project.role}<span class="text-xs text-ink-muted">{project.role}</span>{/if}
          {#if project.period}<span class="text-xs text-ink-muted">· {project.period}</span>{/if}
        </div>
        <h3 id="project-modal-title" class="text-2xl font-display font-semibold text-ink">
          {project.title}
        </h3>
        <p class="text-sm text-ink-muted leading-relaxed">{project.description}</p>

        <div class="flex flex-wrap gap-1.5 mt-1">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>

        {#if project.stats}
          <dl class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {#each project.stats as stat}
              <div class="rounded-xl border border-border px-3 py-2">
                <dt class="text-xs text-ink-muted">{stat.label}</dt>
                <dd class="font-display font-semibold text-ink">{stat.value}</dd>
              </div>
            {/each}
          </dl>
        {/if}

        {#each project.sections ?? [] as section}
          <section class="flex flex-col gap-2 mt-4">
            <h4 class="text-lg font-display font-semibold text-ink">{section.title}</h4>
            {#each section.body.split("\n\n") as paragraph}
              <p class="text-sm text-ink-muted leading-relaxed">{paragraph}</p>
            {/each}
            {#if section.image && screenshots[section.image]}
              <figure class="mt-2 flex flex-col gap-1.5">
                <img
                  src={screenshots[section.image]}
                  alt={section.imageAlt ?? ""}
                  loading="lazy"
                  class="w-full rounded-xl border border-border"
                />
                {#if section.caption}
                  <figcaption class="text-xs text-ink-muted">{section.caption}</figcaption>
                {/if}
              </figure>
            {/if}
          </section>
        {/each}

        <div class="flex items-center gap-3 mt-3 pt-4 border-t border-border">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            class="pill pill-primary px-4 py-2 text-sm"
          >
            <Eye size={14} /> Voir le site
          </a>
          {#if project.github}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              class="pill pill-neutral px-4 py-2 text-sm"
            >
              <Github size={14} /> Code source
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
