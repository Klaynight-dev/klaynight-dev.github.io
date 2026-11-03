<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
  import PresetView from "./lib/components/PresetView.svelte";
  import ProjectGallery from "./lib/components/ProjectGallery.svelte";
  import CustomCursor from "./lib/components/CustomCursor.svelte";
  import SmoothScroll from "./lib/components/SmoothScroll.svelte";
  import ScrollToTop from "./lib/components/ScrollToTop.svelte";
  import ProjectModal from "./lib/components/ProjectModal.svelte";
  import { reveal } from "./lib/actions/reveal";
  import { projects, type Project } from "./lib/data/projects";
  import { education, experiences, keyCompetences, personalInfo } from "./lib/data/resume";
  import { domainColors, projectCategoryDomain } from "./lib/data/domains";
  import Papicon from "./lib/components/Papicon.svelte";
  import { Github } from "lucide-svelte";

  // Every file in assets/images, keyed by filename as referenced in resume.ts.
  const screenshotMap: Record<string, string> = Object.fromEntries(
    Object.entries(
      import.meta.glob<string>("../assets/images/**/*", { eager: true, import: "default", query: "?url" })
    ).flatMap(([path, url]) => {
      const rel = path.replace(/^(\.\.\/)+assets\/images\//, "");
      const file = path.split("/").pop()!;
      return [[rel, url], [file, url]];
    })
  );

  const tabs = [
    { id: "about", label: "À propos", icon: "User" },
    { id: "resume", label: "Parcours", icon: "GraduationHat" },
    { id: "portfolio", label: "Portfolio", icon: "Grid" },
    { id: "contact", label: "Contact", icon: "Mail" }
  ] as const;

  const filters = [
    { id: "all", label: "Tout", icon: "Grid" },
    { id: "Web Development", label: "Développement Web", icon: "Code" },
    { id: "Web Design", label: "Design Web", icon: "Palette" },
    { id: "Applications", label: "Applications", icon: "Tasks" }
  ] as const;

  // Stagger delay for timeline/competence cards, capped so a long list
  // doesn't drag the last items in for a full second.
  const staggerDelay = (i: number) => Math.min(i, 6) * 60;

  // Tab state (only active in Preset mode)
  let activeTab = $state("about"); // 'about', 'resume', 'portfolio', 'contact'

  const readPref = (key: string, fallback = true) => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? fallback : saved === "1";
    } catch {
      return fallback;
    }
  };

  let customCursorEnabled = $state(readPref("portfolio:cursor", true));
  let smoothScrollEnabled = $state(readPref("portfolio:smooth-scroll", true));
  let settingsOpen = $state(false);
  let settingsContainer = $state<HTMLDivElement | null>(null);

  $effect(() => {
    try {
      localStorage.setItem("portfolio:cursor", customCursorEnabled ? "1" : "0");
      localStorage.setItem("portfolio:smooth-scroll", smoothScrollEnabled ? "1" : "0");
    } catch {}
    document.documentElement.classList.toggle("no-smooth-scroll", !smoothScrollEnabled);
  });

  // Project filtering state
  let projectFilter = $state("all");
  const filteredProjects = $derived(
    projectFilter === "all" ? projects : projects.filter(p => p.category === projectFilter)
  );

  // Project detail modal, shared between the Portfolio tab's full gallery
  // and the featured-projects gallery in PresetView.
  let selectedProject = $state<Project | null>(null);
  function openProject(project: Project) {
    selectedProject = project;
  }
  function closeProject() {
    selectedProject = null;
  }

  // Contact Form Submission
  let fullname = $state("");
  let email = $state("");
  let message = $state("");
  let isSending = $state(false);
  let showToast = $state(false);
  let toastMessage = $state("Message envoyé avec succès !");
  let toastError = $state(false);

  async function handleFormSubmit(e: SubmitEvent) {
    e.preventDefault();
    isSending = true;
    toastError = false;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: fullname,
          email: email,
          message: message,
          _subject: `Nouveau message Portfolio de ${fullname}`
        })
      });

      const result = await response.json();

      if (response.ok && result.success === "true") {
        toastMessage = "Message envoyé avec succès !";
        toastError = false;
        showToast = true;
        fullname = "";
        email = "";
        message = "";
      } else {
        throw new Error(result.message || "Erreur de service");
      }
    } catch (err) {
      console.error(err);
      toastMessage = "Une erreur est survenue lors de l'envoi.";
      toastError = true;
      showToast = true;
    } finally {
      isSending = false;
      setTimeout(() => {
        showToast = false;
      }, 5000);
    }
  }
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "Escape" && settingsOpen) settingsOpen = false;
  }}
  onpointerdown={(e) => {
    if (settingsOpen && settingsContainer && !settingsContainer.contains(e.target as Node)) {
      settingsOpen = false;
    }
  }}
/>

{#if customCursorEnabled}
  <CustomCursor />
{/if}
{#if smoothScrollEnabled}
  <SmoothScroll />
{/if}
<ScrollToTop />
<ProjectModal
  project={selectedProject}
  screenshots={screenshotMap}
  onClose={closeProject}
/>

<div class="min-h-screen bg-bg text-ink flex flex-col items-center py-6 px-4 md:py-10 relative">

  <div class="w-full max-w-7xl flex flex-col lg:flex-row gap-6 items-stretch relative">

    <!-- Toast Notification -->
    {#if showToast}
      <div
        class="fixed top-5 right-5 left-5 sm:left-auto card px-4 py-3 flex items-center gap-3 z-9999 animate-fade-in"
        role="status"
      >
        <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 {toastError ? 'bg-red-100 text-red-600' : ''}" style={toastError ? '' : 'background: var(--accent-soft); color: var(--accent);'}>
          {#if toastError}
            <Papicon icon="AlertCircle" size={15} />
          {:else}
            <Papicon icon="Check" size={15} />
          {/if}
        </span>
        <p class="text-sm font-medium text-ink">{toastMessage}</p>
      </div>
    {/if}

    <!-- Always visible responsive Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col gap-6 min-w-0">

      <!-- Pill tab navigation -->
      <!-- Top bar: pill tab navigation + display settings -->
      <div class="flex items-center justify-end md:justify-between gap-3">
      <nav class="hidden md:flex flex-wrap gap-2 card p-2 w-fit">
        {#each tabs as tab}
          <button
            onclick={() => activeTab = tab.id}
            class="pill px-4 py-2 text-sm {activeTab === tab.id ? 'pill-active' : 'pill-ghost'}"
          >
            <Papicon icon={tab.icon} size={15} />
            {tab.label}
          </button>
        {/each}
      </nav>

        <div class="relative" bind:this={settingsContainer}>
          <button
            type="button"
            class="pill-icon"
            aria-label="Paramètres d'affichage"
            aria-expanded={settingsOpen}
            aria-haspopup="dialog"
            onclick={() => (settingsOpen = !settingsOpen)}
          >
            <Papicon icon="Gears" size={18} />
          </button>

          {#if settingsOpen}
            <div
              role="dialog"
              aria-label="Paramètres d'affichage"
              class="card p-4 w-64 absolute right-0 top-full mt-2 z-50 flex flex-col gap-1 shadow-lg animate-fade-in"
            >
              <span class="eyebrow mb-1">Paramètres</span>

              <button
                type="button"
                role="switch"
                data-no-blobity
                aria-checked={customCursorEnabled}
                onclick={() => (customCursorEnabled = !customCursorEnabled)}
                class="flex items-center justify-between gap-3 min-h-11 px-2 -mx-2 rounded-xl hover:bg-surface-muted transition-colors text-left text-sm font-medium text-ink cursor-pointer"
              >
                <span>Curseur animé</span>
                <span
                  class="w-10 h-6 rounded-full p-0.5 transition-colors flex items-center shrink-0 {customCursorEnabled ? 'bg-ink justify-end' : 'bg-surface-muted border border-border justify-start'}"
                >
                  <span class="w-4 h-4 rounded-full {customCursorEnabled ? 'bg-white' : 'bg-ink-muted'}"></span>
                </span>
              </button>

              <button
                type="button"
                role="switch"
                data-no-blobity
                aria-checked={smoothScrollEnabled}
                onclick={() => (smoothScrollEnabled = !smoothScrollEnabled)}
                class="flex items-center justify-between gap-3 min-h-11 px-2 -mx-2 rounded-xl hover:bg-surface-muted transition-colors text-left text-sm font-medium text-ink cursor-pointer"
              >
                <span>Défilement fluide</span>
                <span
                  class="w-10 h-6 rounded-full p-0.5 transition-colors flex items-center shrink-0 {smoothScrollEnabled ? 'bg-ink justify-end' : 'bg-surface-muted border border-border justify-start'}"
                >
                  <span class="w-4 h-4 rounded-full {smoothScrollEnabled ? 'bg-white' : 'bg-ink-muted'}"></span>
                </span>
              </button>
            </div>
          {/if}
        </div>
      </div>

      <!-- View Panel -->
      <div class="card p-6 lg:p-8 flex-1 min-h-125">
        {#if activeTab === "about"}
          <PresetView
            onViewPortfolio={() => activeTab = "portfolio"}
            onSelectProject={openProject}
          />
        {:else if activeTab === "resume"}
          <!-- Render CV/Timeline -->
          <div class="flex flex-col gap-16 animate-fade-in">
            {#each [{ title: "Ma formation", items: education }, { title: "Mes expériences", items: experiences }] as group}
              <section class="flex flex-col gap-8">
                <h3 class="title-xl">{group.title}</h3>
                <ol class="timeline">
                  {#each group.items as item, i}
                    <li class="timeline-row" use:reveal={{ delay: staggerDelay(i) }}>
                      <span class="timeline-date eyebrow">{item.date}</span>
                      <div class="timeline-body mt-1.5 md:mt-0">
                        <h4 class="text-xl font-display font-semibold text-ink leading-snug">{item.title}</h4>
                        <p class="flex items-center gap-2 text-sm font-medium text-ink-muted mt-1">{#if item.logo && screenshotMap[item.logo]}<img src={screenshotMap[item.logo]} alt="" class="w-4 h-4 aspect-square object-contain shrink-0 rounded-xs" />{/if}<span>{item.subtitle}</span></p>
                        <p class="text-[0.95rem] text-ink-muted mt-3 leading-relaxed max-w-prose">{item.description}</p>
                        {#if item.url}
                          <a href={item.url} target="_blank" rel="noopener noreferrer" class="text-link mt-3">
                            {item.urlLabel || "Lien"} <Papicon icon="ArrowRight" size={12} />
                          </a>
                        {/if}
                      </div>
                    </li>
                  {/each}
                </ol>
              </section>
            {/each}

            <!-- Key competencies — compact interactive rows façon Tom Things & Vince Linise -->
            <section class="flex flex-col gap-6">
              <div class="flex flex-col gap-1">
                <h3 class="title-xl">Compétences <span class="title-mark">clés</span></h3>
                <p class="text-sm text-ink-muted">Référentiel BUT Informatique · Parcours A (Développement web & applicatif)</p>
              </div>

              <ol class="flex flex-col gap-3 list-none p-0 m-0">
                {#each keyCompetences as competence, i}
                  {@const domain = domainColors[competence.domain]}
                  <li
                    class="competence-row card-interactive"
                    use:reveal={{ delay: staggerDelay(i) }}
                  >
                    <div class="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
                      <span
                        class="competence-num-badge"
                        style="background: {domain.bg}; color: {domain.text};"
                      >
                        <Papicon icon={competence.icon} size={15} />
                        <span>{String(i + 1).padStart(2, "0")}</span>
                      </span>

                      <div class="flex flex-col gap-0.5 min-w-0 flex-1">
                        <h4 class="text-base md:text-lg font-display font-semibold text-ink leading-snug">
                          {competence.title}
                        </h4>
                        {#if competence.description}
                          <p class="text-xs md:text-sm text-ink-muted leading-relaxed max-w-2xl">
                            {competence.description}
                          </p>
                        {/if}
                      </div>
                    </div>

                    {#if competence.links && competence.links.length > 0}
                      <div class="flex flex-wrap items-center gap-1.5 md:self-center shrink-0 pl-11 md:pl-0">
                        {#each competence.links as link}
                          {#if link.url}
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="chip"
                            >
                              <span>{link.label}</span>
                              <Papicon icon="ArrowRightUp" size={11} />
                            </a>
                          {:else}
                            <span class="chip chip-static">
                              <Papicon icon="Check" size={11} />
                              <span>{link.label}</span>
                            </span>
                          {/if}
                        {/each}
                      </div>
                    {/if}
                  </li>
                {/each}
              </ol>
            </section>
          </div>
        {:else if activeTab === "portfolio"}
          <!-- Render Projects Catalog -->
          <div class="flex flex-col gap-6 animate-fade-in">
            <div class="flex flex-col gap-3">
              <h3 class="text-2xl font-display font-semibold text-ink">Tous mes <span class="title-mark">projets</span></h3>
            </div>

            <!-- Category filter segmented pill bar façon Tafac & Papillon -->
            <div class="filter-bar" role="group" aria-label="Filtrer par catégorie">
              {#each filters as filter}
                {@const count = filter.id === "all" ? projects.length : projects.filter(p => p.category === filter.id).length}
                <button
                  type="button"
                  onclick={() => projectFilter = filter.id}
                  class="filter-pill"
                  aria-pressed={projectFilter === filter.id}
                >
                  <Papicon icon={filter.icon} size={14} />
                  <span>{filter.label}</span>
                  <span class="filter-count">{count}</span>
                </button>
              {/each}
            </div>

            {#if filteredProjects.length === 0}
              <div class="card p-8 flex flex-col items-center gap-3 text-center">
                <p class="text-sm text-ink-muted">
                  Rien dans « {filters.find(f => f.id === projectFilter)?.label} » pour l'instant.
                </p>
                <button onclick={() => projectFilter = "all"} class="pill pill-neutral px-4 py-2 text-xs">
                  Revenir à tous les projets
                </button>
              </div>
            {:else}
              <ProjectGallery items={filteredProjects} screenshots={screenshotMap} onSelect={openProject} />
            {/if}
          </div>
        {:else if activeTab === "contact"}
          <!-- Render Contact Page -->
          <div class="contact-block animate-fade-in">
            <h3 class="contact-title">Une alternance, un projet ?<br /><em>Parlons-en.</em></h3>

            <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 mt-10 relative">
              <form onsubmit={handleFormSubmit} class="flex flex-col gap-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="flex flex-col gap-1">
                    <label for="fullname" class="text-sm contact-muted font-medium">Nom complet</label>
                    <input type="text" id="fullname" bind:value={fullname} required placeholder="Ex : Jeanne Martin" class="field-dark" />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label for="email" class="text-sm contact-muted font-medium">Adresse email</label>
                    <input type="email" id="email" bind:value={email} required placeholder="jeanne@exemple.fr" class="field-dark" />
                  </div>
                </div>

                <div class="flex flex-col gap-1">
                  <label for="message" class="text-sm contact-muted font-medium">Votre message</label>
                  <textarea id="message" bind:value={message} required rows="4" placeholder="Quelques lignes sur votre besoin" class="field-dark resize-none"></textarea>
                </div>

                <button type="submit" disabled={isSending} class="pill contact-submit self-start py-3 px-6 text-sm">
                  {isSending ? "Envoi en cours..." : "Envoyer le message"}
                  {#if !isSending}
                    <Papicon icon="ArrowRight" size={14} />
                  {/if}
                </button>
              </form>

              <div class="flex flex-col gap-5">
                <p class="text-sm contact-muted leading-relaxed">
                  Pour une demande professionnelle, le formulaire ou un mail direct, au choix.
                </p>
                <a href="mailto:{personalInfo.email}" class="contact-link text-sm break-all">
                  <span class="contact-link-icon"><Papicon icon="Mail" size={16} /></span>
                  {personalInfo.email}
                </a>
                <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" class="contact-link text-sm">
                  <span class="contact-link-icon"><Github size={16} /></span>
                  GitHub
                </a>
                <a href={personalInfo.socials.external} target="_blank" rel="noopener noreferrer" class="contact-link text-sm">
                  <span class="contact-link-icon"><Papicon icon="ExternalLink" size={16} /></span>
                  me.klaynight.fr
                </a>
                <p class="flex items-center gap-3 text-sm contact-muted">
                  <span class="contact-link-icon"><Papicon icon="MapPin" size={16} /></span>
                  {personalInfo.location}
                </p>
              </div>
            </div>

            <span class="contact-wordmark" aria-hidden="true">{personalInfo.nickname}</span>
          </div>
        {/if}
      </div>

      <!-- Footer details -->
      <footer class="text-xs text-ink-muted text-center py-2 shrink-0 mb-20 md:mb-2">
        © {new Date().getFullYear()} {personalInfo.name}. Conçu avec Svelte 5 & Bun.
      </footer>
    </main>

    <!-- Mobile Docked Bottom Navbar -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border flex items-center justify-around py-2 px-2">
      {#each tabs as tab}
        <button
          onclick={() => activeTab = tab.id}
          class="flex flex-col items-center gap-1 py-1.5 rounded-2xl transition-colors flex-1 text-center {activeTab === tab.id ? 'text-ink' : 'text-ink-muted'}"
        >
          <span class="w-9 h-9 rounded-full flex items-center justify-center {activeTab === tab.id ? 'bg-surface-muted' : ''}">
            <Papicon icon={tab.icon} size={17} />
          </span>
          <span class="text-[0.65rem] font-medium tracking-tight">{tab.label}</span>
        </button>
      {/each}
    </div>

  </div>

</div>
