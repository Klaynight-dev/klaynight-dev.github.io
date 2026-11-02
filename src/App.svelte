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
      import.meta.glob<string>("../assets/images/*", { eager: true, import: "default", query: "?url" })
    ).map(([path, url]) => [path.split("/").pop()!, url])
  );

  const tabs = [
    { id: "about", label: "À propos", icon: "User" },
    { id: "resume", label: "Parcours", icon: "GraduationHat" },
    { id: "portfolio", label: "Portfolio", icon: "Grid" },
    { id: "contact", label: "Contact", icon: "Mail" }
  ] as const;

  const filters = [
    { id: "all", label: "Tout" },
    { id: "Web Development", label: "Développement Web" },
    { id: "Web Design", label: "Design Web" },
    { id: "Applications", label: "Applications" }
  ] as const;

  // Stagger delay for timeline/competence cards, capped so a long list
  // doesn't drag the last items in for a full second.
  const staggerDelay = (i: number) => Math.min(i, 6) * 60;

  // Tab state (only active in Preset mode)
  let activeTab = $state("about"); // 'about', 'resume', 'portfolio', 'contact'

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

<CustomCursor />
<SmoothScroll />
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
                        <p class="text-sm font-medium text-ink-muted mt-1">{item.subtitle}</p>
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

            <!-- Key competencies -->
            <section class="flex flex-col gap-8">
              <h3 class="title-xl">Compétences clés</h3>
              <ol class="border-y border-border divide-y divide-border">
                {#each keyCompetences as competence, i}
                  <li class="grid md:grid-cols-[10rem_1fr] gap-y-2 py-6" use:reveal={{ delay: staggerDelay(i) }}>
                    <span class="eyebrow md:text-right md:pr-8 pt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div class="md:pl-8">
                      <h4 class="text-lg font-display font-semibold text-ink">{competence.title}</h4>
                      <div class="flex flex-wrap gap-x-5 gap-y-1.5 mt-2">
                        {#each competence.links as link}
                          <a href={link.url} target="_blank" rel="noopener noreferrer" class="text-link">
                            {link.label} <Papicon icon="ArrowRight" size={12} />
                          </a>
                        {/each}
                      </div>
                    </div>
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

            <!-- Category filter tabs — the active underline takes its category's
                 domain color (see domains.ts). "Tout" has no domain: stays ink. -->
            <div class="filter-tabs">
              {#each filters as filter}
                {@const domain = filter.id in projectCategoryDomain ? domainColors[projectCategoryDomain[filter.id as keyof typeof projectCategoryDomain]] : null}
                <button
                  onclick={() => projectFilter = filter.id}
                  class="filter-tab"
                  aria-pressed={projectFilter === filter.id}
                  style={domain ? `--tab-color: ${domain.text};` : ''}
                >
                  {filter.label}
                  <span class="filter-count">{filter.id === "all" ? projects.length : projects.filter(p => p.category === filter.id).length}</span>
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
