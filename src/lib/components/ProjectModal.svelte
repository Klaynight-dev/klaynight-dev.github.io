<script lang="ts">
  import { X, Eye, Github } from "lucide-svelte";
  import type { Project } from "../data/projects";
  import { lockScroll, unlockScroll } from "../scroll";
  import ProjectCover from "./ProjectCover.svelte";

  let { project, image, onClose }: { project: Project | null; image?: string; onClose: () => void } = $props();

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
      class="card w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      tabindex="-1"
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
        <ProjectCover {project} {image} />
      </div>

      <div class="p-6 flex flex-col gap-3">
        <span class="tag w-fit">{project.category}</span>
        <h3 id="project-modal-title" class="text-2xl font-display font-semibold text-ink">
          {project.title}
        </h3>
        <p class="text-sm text-ink-muted leading-relaxed">{project.description}</p>

        <div class="flex flex-wrap gap-1.5 mt-1">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>

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
