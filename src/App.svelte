<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
  import PresetView, { sections } from "./lib/components/PresetView.svelte";
  import ProjectGallery from "./lib/components/ProjectGallery.svelte";
  import CustomCursor from "./lib/components/CustomCursor.svelte";
  import SmoothScroll from "./lib/components/SmoothScroll.svelte";
  import ScrollToTop from "./lib/components/ScrollToTop.svelte";
  import ProjectModal from "./lib/components/ProjectModal.svelte";
  import { reveal } from "./lib/actions/reveal";
  import { projects, type Project } from "./lib/data/projects";
  import { education, experiences, keyCompetences, personalInfo } from "./lib/data/resume";
  import { domainColors } from "./lib/data/domains";
  import Papicon from "./lib/components/Papicon.svelte";
  import IconCloud from "./lib/components/IconCloud.svelte";
  import Marked from "./lib/components/Marked.svelte";
  import { Github } from "lucide-svelte";
  import { scrollToTop } from "./lib/scroll";

  // Every file in assets/images, keyed by its path relative to that folder as referenced in resume.ts.
  const screenshotMap: Record<string, string> = Object.fromEntries(
    Object.entries(
      import.meta.glob<string>("../assets/images/**/*", { eager: true, import: "default", query: "?url" })
    ).map(([path, url]) => [path.replace(/^(\.\.\/)+assets\/images\//, ""), url])
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
  // Tabs reachable by link (klaynight.fr/#portfolio), so a link shared on Discord or
  // LinkedIn opens straight on the projects or the contact form. À propos has no hash:
  // its own anchors (#profil, #stack...) stay free for the section summary.
  const tabHashes: Record<string, string> = { resume: "#parcours", portfolio: "#portfolio", contact: "#contact" };
  const tabFromHash = () => Object.keys(tabHashes).find((id) => tabHashes[id] === location.hash);

  let activeTab = $state(tabFromHash() ?? "about"); // 'about', 'resume', 'portfolio', 'contact'

  // A new tab is a new page: start it from the top instead of the old scroll position.
  function goToTab(id: string) {
    activeTab = id;
    history.replaceState(null, "", tabHashes[id] ?? location.pathname + location.search);
    scrollToTop(true);
  }

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

  const currentTab = $derived(tabs.find((t) => t.id === activeTab) ?? tabs[0]);

  // Sticky top bar: its second row holds the current tab's sub-navigation
  // (section summary on À propos, filters on Portfolio).
  let scrollY = $state(0);
  let activeSection = $state(sections[0].id);
  const hasSubnav = $derived(activeTab === "about" || activeTab === "portfolio");

  $effect(() => {
    if (activeTab !== "about") return;
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (activeSection = e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => {
      spy.disconnect();
    };
  });

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

{#snippet settingTile(label: string, icon: string, checked: boolean, toggle: () => void)}
  <button type="button" role="switch" data-no-blobity aria-checked={checked} onclick={toggle} class="setting-tile">
    <Papicon {icon} size={20} />
    <span class="text-sm font-semibold leading-tight">{label}</span>
    <span class="setting-state">{checked ? "Activé" : "Désactivé"}</span>
  </button>
{/snippet}

<svelte:window
  bind:scrollY
  onhashchange={() => {
    const id = tabFromHash();
    if (id) goToTab(id);
  }}
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

      <!-- Sticky nav: a floating capsule (after vincelinise.com) with the current tab's
           sub-navigation hanging underneath like a tag (after beta.tomthings.fr). -->
      <div class="topnav-wrap" class:has-drawer={hasSubnav}>
        <div class="topnav-anchor">
        <div class="topnav" class:is-stuck={scrollY > 120}>
          <button type="button" class="topnav-avatar" data-no-blobity aria-label="Remonter en haut de la page" onclick={() => scrollToTop()}>
            <img src={screenshotMap["profile/my-avatar.png"]} alt="" />
          </button>

          <nav class="hidden md:flex items-center gap-1" aria-label="Onglets">
            {#each tabs as tab}
              <button
                type="button"
                data-no-blobity
                onclick={() => goToTab(tab.id)}
                class="nav-pill"
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                <Papicon icon={tab.icon} size={18} />
                {tab.label}
              </button>
            {/each}
          </nav>
          <span class="md:hidden flex items-center gap-2 px-3 text-sm font-semibold text-ink">
            <Papicon icon={currentTab.icon} size={18} />
            {currentTab.label}
          </span>

          <div class="relative" bind:this={settingsContainer}>
            <button
              type="button"
              data-no-blobity
              class="nav-pill nav-pill-icon"
              aria-label="Paramètres d'affichage"
              aria-expanded={settingsOpen}
              aria-haspopup="dialog"
              onclick={() => (settingsOpen = !settingsOpen)}
            >
              <Papicon icon="Gears" size={18} />
            </button>

            {#if settingsOpen}
              <div role="dialog" aria-label="Paramètres d'affichage" class="settings-menu">
                {@render settingTile("Curseur", "Sparkles", customCursorEnabled, () => (customCursorEnabled = !customCursorEnabled))}
                {@render settingTile("Défilement fluide", "ArrowDown", smoothScrollEnabled, () => (smoothScrollEnabled = !smoothScrollEnabled))}
              </div>
            {/if}
          </div>
        </div>

        <div class="topnav-drawer" class:is-open={hasSubnav} inert={!hasSubnav}>
          <div>
          {#if activeTab === "about"}
            <nav class="drawer-list" aria-label="Sections de la page">
              {#each sections as section}
                <a
                  href="#{section.id}"
                  data-no-blobity
                  class="drawer-pill"
                  aria-current={activeSection === section.id ? "true" : undefined}
                >
                  <Papicon icon={section.icon} size={14} />
                  <span>{section.label}</span>
                </a>
              {/each}
            </nav>
          {:else if activeTab === "portfolio"}
            <div class="drawer-list" role="group" aria-label="Filtrer par catégorie">
              {#each filters as filter}
                {@const count = filter.id === "all" ? projects.length : projects.filter(p => p.category === filter.id).length}
                <button
                  type="button"
                  data-no-blobity
                  onclick={() => projectFilter = filter.id}
                  class="drawer-pill"
                  aria-pressed={projectFilter === filter.id}
                >
                  <Papicon icon={filter.icon} size={14} />
                  <span>{filter.label}</span>
                  <span class="filter-count">{count}</span>
                </button>
              {/each}
            </div>
          {/if}
          </div>
        </div>
        </div>
      </div>

      <!-- View Panel -->
      <div class="card p-6 lg:p-8 flex-1 min-h-125">
        {#if activeTab === "about"}
          <PresetView
            onViewPortfolio={() => goToTab("portfolio")}
            onSelectProject={openProject}
          />
        {:else if activeTab === "resume"}
          <!-- Render CV/Timeline -->
          <div class="flex flex-col gap-16 animate-fade-in">
            {#each [{ title: "Ma formation", items: education, icon: "GraduationHat", cloud: ["GraduationHat", "Paper", "Calendar", "Pen"] }, { title: "Mes expériences", items: experiences, icon: "Tasks", cloud: ["Tasks", "Clock", "TrendingUp", "Gears"] }] as group}
              <section class="flex flex-col gap-8">
                <h3 class="cloud-host title-xl"><IconCloud icons={group.cloud} />{group.title}</h3>
                <ol class="tl">
                  {#each group.items as item, i}
                    <li class="tl-item" use:reveal={{ delay: staggerDelay(i) }}>
                      <span class="tl-logo">
                        {#if item.logo && screenshotMap[item.logo]}
                          <img src={screenshotMap[item.logo]} alt="" />
                        {:else}
                          <Papicon icon={group.icon} size={20} />
                        {/if}
                      </span>
                      <div class="min-w-0">
                        <div class="tl-head">
                          <div class="min-w-0">
                            <h4 class="text-lg md:text-xl font-display font-semibold text-ink leading-snug">{item.title}</h4>
                            <p class="text-sm font-medium text-ink-muted-strong mt-0.5">{item.subtitle}</p>
                          </div>
                          <span class="tl-date">
                            {item.date}
                          </span>
                        </div>
                        <p class="text-[0.95rem] text-ink-muted mt-3 leading-relaxed max-w-prose"><Marked text={item.description} /></p>
                        {#if item.url}
                          <a href={item.url} target="_blank" rel="noopener noreferrer" class="chip mt-3">
                            <span>{item.urlLabel || "Lien"}</span>
                            <Papicon icon="ArrowRightUp" size={11} />
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
                <h3 class="cloud-host title-xl"><IconCloud icons={["Grades", "Crown", "Zap", "Check"]} />Compétences <span class="title-mark">clés</span></h3>
                <p class="text-sm text-ink-muted">Référentiel BUT Informatique · Parcours A (Développement web & applicatif)</p>
              </div>

              <ol class="flex flex-col gap-3 list-none p-0 m-0">
                {#each keyCompetences as competence, i}
                  {@const domain = domainColors[competence.domain]}
                  <li
                    class="competence-row"
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
              <h3 class="cloud-host text-2xl font-display font-semibold text-ink"><IconCloud icons={["Grid", "Gallery", "Bookmark", "Code"]} />Tous mes <span class="title-mark">projets</span></h3>
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
            <h3 class="cloud-host contact-title"><IconCloud icons={["Mail", "Phone", "MessageCircle", "MapPin"]} />Une alternance, un projet ?<br /><em>Parlons-en.</em></h3>

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
          onclick={() => goToTab(tab.id)}
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
