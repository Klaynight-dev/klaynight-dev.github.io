<script lang="ts">
  import { onMount } from "svelte";
  import { Github } from "lucide-svelte";
  import Papicon from "./Papicon.svelte";
  import myAvatar from "../../../assets/images/my-avatar.png";
  import myPhoto from "../../../assets/images/photo-elouan.webp";
  import { personalInfo } from "../data/resume";

  // Local time in Bretagne, refreshed every minute — a small honest "alive" detail
  // rather than decoration (tells a recruiter when I'm realistically reachable).
  const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris"
  });
  let localTime = $state(timeFormatter.format(new Date()));
  // Touch screens have no hover: a tap keeps the avatar deck open.
  let deckOpen = $state(false);

  onMount(() => {
    const id = setInterval(() => {
      localTime = timeFormatter.format(new Date());
    }, 15000);
    return () => clearInterval(id);
  });
</script>

<aside class="card w-full lg:w-80 p-6 flex flex-col gap-6 lg:sticky lg:top-6 self-start animate-fade-in">
  <!-- Profile info header -->
  <div class="flex flex-row lg:flex-col items-center gap-4 lg:text-center">
    <!-- Two-card deck after humanitour.fr: logo in front, photo peeking right; fans out on hover, focus or tap -->
    <button
      type="button"
      class="avatar-deck shrink-0"
      class:is-open={deckOpen}
      aria-pressed={deckOpen}
      data-no-blobity
      aria-label="Voir ma photo à côté de mon logo"
      onclick={() => (deckOpen = !deckOpen)}
    >
      <img src={myAvatar} alt="" class="avatar-deck-card" />
      <img src={myPhoto} alt={personalInfo.name} class="avatar-deck-card" />
    </button>

    <div class="flex flex-col gap-2 items-start lg:items-center min-w-0">
      <h1 class="text-xl lg:text-2xl font-display font-semibold text-ink leading-tight">{personalInfo.name}</h1>
      {#if personalInfo.nickname}
        <span class="tag">{personalInfo.nickname}</span>
      {/if}
      <div class="flex flex-wrap gap-1.5 mt-1 justify-start lg:justify-center">
        {#each personalInfo.roles as role}
          <span class="pill pill-neutral px-3 py-1 text-xs">{role}</span>
        {/each}
      </div>
    </div>
  </div>

  <hr class="border-border" />

  <!-- Contact -->
  <div class="flex flex-col gap-3">
    <h3 class="eyebrow">Coordonnées</h3>
    <a
      href="mailto:{personalInfo.email}"
      class="flex items-center gap-3 group rounded-xl -mx-1 px-1 py-1 transition-colors hover:bg-surface-muted"
    >
      <span class="pill-icon w-9 h-9 shrink-0 group-hover:bg-ink group-hover:text-white">
        <Papicon icon="Mail" size={16} />
      </span>
      <span class="min-w-0 flex-1">
        <span class="block text-xs text-ink-muted">Email</span>
        <span class="block text-sm text-ink font-medium truncate">{personalInfo.email}</span>
      </span>
    </a>

    {#if personalInfo.location}
      <div class="flex items-center gap-3">
        <span class="pill-icon w-9 h-9 shrink-0">
          <Papicon icon="MapPin" size={16} />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block text-xs text-ink-muted">Localisation</span>
          <span class="block text-sm text-ink font-medium">
            {personalInfo.location} <span class="text-ink-muted font-mono text-xs">· {localTime}</span>
          </span>
        </span>
      </div>
    {/if}
  </div>

  <hr class="border-border" />

  <!-- Alternance status -->
  {#if personalInfo.alternance}
    <div class="rounded-2xl p-4 flex gap-3 items-start" style="background: var(--accent-soft);">
      <span class="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center shrink-0" style="color: var(--accent);">
        <Papicon icon="GraduationHat" size={15} />
      </span>
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-semibold text-ink leading-tight">{personalInfo.alternance.title}</h4>
        <p class="text-xs text-ink-muted mt-1 leading-relaxed">
          {personalInfo.alternance.description}
        </p>
      </div>
    </div>
    <hr class="border-border" />
  {/if}

  <!-- Socials -->
  <div class="flex justify-center gap-3">
    {#if personalInfo.socials.github}
      <a
        href={personalInfo.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        class="pill-icon"
        title="GitHub"
        aria-label="Profil GitHub"
      >
        <Github size={18} />
      </a>
    {/if}
    {#if personalInfo.socials.external}
      <a
        href={personalInfo.socials.external}
        target="_blank"
        rel="noopener noreferrer"
        class="pill-icon"
        title="Liens"
        aria-label="Autres liens"
      >
        <Papicon icon="ExternalLink" size={18} />
      </a>
    {/if}
  </div>
</aside>
