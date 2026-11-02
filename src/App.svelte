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
  import { Mail, User, GraduationCap, LayoutGrid, Link2, Check, CircleAlert, ArrowRight } from "lucide-svelte";

  // Every file in assets/images, keyed by filename as referenced in resume.ts.
  const screenshotMap: Record<string, string> = Object.fromEntries(
    Object.entries(
      import.meta.glob<string>("../assets/images/*", { eager: true, import: "default", query: "?url" })
    ).map(([path, url]) => [path.split("/").pop()!, url])
  );

  const tabs = [
    { id: "about", label: "À propos", icon: User },
    { id: "resume", label: "Parcours", icon: GraduationCap },
    { id: "portfolio", label: "Portfolio", icon: LayoutGrid },
    { id: "contact", label: "Contact", icon: Mail }
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
            <CircleAlert size={15} />
          {:else}
            <Check size={15} />
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
          {@const Icon = tab.icon}
          <button
            onclick={() => activeTab = tab.id}
            class="pill px-4 py-2 text-sm {activeTab === tab.id ? 'pill-active' : 'pill-ghost'}"
          >
            <Icon size={15} />
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
          <div class="flex flex-col gap-10 animate-fade-in">
            <!-- Scholastic -->
            <div class="flex flex-col gap-4">
              <span class="eyebrow">Parcours scolaire</span>
              <div class="timeline-rail ml-2 pl-6 flex flex-col gap-7 relative">
                {#each education as item, i}
                  <div class="relative py-1" use:reveal={{ delay: staggerDelay(i) }}>
                    <div class="timeline-dot absolute -left-7.75 top-2"></div>
                    <span class="eyebrow">{item.date}</span>
                    <h4 class="text-base font-display font-semibold text-ink mt-1.5">{item.title}</h4>
                    <p class="text-sm text-ink-muted mt-0.5">{item.subtitle}</p>
                    <p class="text-sm text-ink-muted mt-2 leading-relaxed">{item.description}</p>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Experience -->
            <div class="flex flex-col gap-4">
              <span class="eyebrow">Expériences</span>
              <div class="timeline-rail ml-2 pl-6 flex flex-col gap-7 relative">
                {#each experiences as item, i}
                  <div class="relative py-1" use:reveal={{ delay: staggerDelay(i) }}>
                    <div class="timeline-dot absolute -left-7.75 top-2"></div>
                    <span class="eyebrow">{item.date}</span>
                    <h4 class="text-base font-display font-semibold text-ink mt-1.5">{item.title}</h4>
                    <p class="text-sm text-ink-muted mt-0.5">{item.subtitle}</p>
                    <p class="text-sm text-ink-muted mt-2 leading-relaxed">{item.description}</p>
                    {#if item.url}
                      <a href={item.url} target="_blank" rel="noopener noreferrer" class="pill pill-neutral px-3 py-1.5 text-xs mt-3">
                        {item.urlLabel || "Lien"} <ArrowRight size={12} />
                      </a>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>

            <!-- Key competencies -->
            <div class="flex flex-col gap-4">
              <span class="eyebrow">Compétences clés</span>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each keyCompetences as competence, i}
                  <div class="card p-4 flex flex-col gap-2.5" use:reveal={{ delay: staggerDelay(i) }}>
                    <h4 class="text-sm font-semibold text-ink">{competence.title}</h4>
                    <div class="flex flex-wrap gap-2">
                      {#each competence.links as link}
                        <a href={link.url} target="_blank" rel="noopener noreferrer" class="pill pill-neutral px-3 py-1 text-xs">
                          <Link2 size={11} /> {link.label}
                        </a>
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {:else if activeTab === "portfolio"}
          <!-- Render Projects Catalog -->
          <div class="flex flex-col gap-6 animate-fade-in">
            <div class="flex flex-col gap-3">
              <span class="eyebrow">Tous mes projets</span>
              <h3 class="text-2xl font-display font-semibold text-ink">Portfolio</h3>
            </div>

            <!-- Category filter pills — the active pill takes its category's
                 domain color (see domains.ts) so the filter choice is legible
                 as color, not just weight. "Tout" has no domain: stays ink. -->
            <div class="flex flex-wrap gap-2">
              {#each filters as filter}
                {@const domain = filter.id in projectCategoryDomain ? domainColors[projectCategoryDomain[filter.id as keyof typeof projectCategoryDomain]] : null}
                <button
                  onclick={() => projectFilter = filter.id}
                  class="pill px-4 py-2 text-xs {projectFilter === filter.id ? 'pill-active' : 'pill-neutral'}"
                  style={projectFilter === filter.id && domain ? `background: ${domain.text}; color: #fff;` : ''}
                >
                  {filter.label}
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
          <div class="flex flex-col gap-6 animate-fade-in">
            <div class="flex flex-col gap-3">
              <span class="eyebrow">Me contacter</span>
              <h3 class="text-2xl font-display font-semibold text-ink">Formulaire de contact</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Form -->
              <form onsubmit={handleFormSubmit} class="flex flex-col gap-4">
                <div class="flex flex-col gap-1.5">
                  <label for="fullname" class="text-sm text-ink font-medium">Nom complet</label>
                  <input
                    type="text"
                    id="fullname"
                    bind:value={fullname}
                    required
                    placeholder="Ex: John Doe"
                    class="field"
                  />
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="email" class="text-sm text-ink font-medium">Adresse email</label>
                  <input
                    type="email"
                    id="email"
                    bind:value={email}
                    required
                    placeholder="Ex: john@example.com"
                    class="field"
                  />
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="message" class="text-sm text-ink font-medium">Votre message</label>
                  <textarea
                    id="message"
                    bind:value={message}
                    required
                    rows="4"
                    placeholder="Écrivez votre message ici..."
                    class="field resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  class="pill pill-primary self-end py-2.5 px-5 text-sm"
                >
                  {isSending ? "Envoi en cours..." : "Envoyer le message"}
                  {#if !isSending}
                    <ArrowRight size={14} />
                  {/if}
                </button>
              </form>

              <!-- Info & Map -->
              <div class="flex flex-col gap-6 justify-between">
                <div class="card p-5 flex flex-col gap-3">
                  <span class="pill-icon w-10 h-10" style="color: var(--accent);">
                    <Mail size={18} />
                  </span>
                  <h4 class="text-base font-display font-semibold text-ink">Contact direct</h4>
                  <p class="text-sm text-ink-muted leading-relaxed">
                    Pour toute demande professionnelle, vous pouvez utiliser le formulaire ci-contre ou me contacter directement par mail à :
                  </p>
                  <a href="mailto:{personalInfo.email}" class="text-sm font-semibold" style="color: var(--accent);">
                    {personalInfo.email}
                  </a>
                </div>

                <div class="card overflow-hidden h-48">
                  <iframe
                    src={personalInfo.mapIframeUrl}
                    width="100%"
                    height="100%"
                    style="border:0;"
                    allowfullscreen={true}
                    loading="lazy"
                    title="Localisation"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
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
        {@const Icon = tab.icon}
        <button
          onclick={() => activeTab = tab.id}
          class="flex flex-col items-center gap-1 py-1.5 rounded-2xl transition-colors flex-1 text-center {activeTab === tab.id ? 'text-ink' : 'text-ink-muted'}"
        >
          <span class="w-9 h-9 rounded-full flex items-center justify-center {activeTab === tab.id ? 'bg-surface-muted' : ''}">
            <Icon size={17} />
          </span>
          <span class="text-[0.65rem] font-medium tracking-tight">{tab.label}</span>
        </button>
      {/each}
    </div>

  </div>

</div>
