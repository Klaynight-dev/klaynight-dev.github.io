<script lang="ts">
  import { PenTool, Code, AppWindow, Quote, ArrowRight } from "lucide-svelte";
  import { projects, type Project } from "../data/projects";
  import { skillCategories, biography, services, testimonials, personalInfo } from "../data/resume";
  import { domainColors } from "../data/domains";
  import Papicon from "./Papicon.svelte";
  import ProjectGallery from "./ProjectGallery.svelte";
  import { reveal } from "../actions/reveal";

  let {
    onViewPortfolio,
    onSelectProject
  }: {
    onViewPortfolio?: () => void;
    onSelectProject?: (project: Project) => void;
  } = $props();

  // Import skill logos so Vite bundles and hashes them correctly
  import pgLogo from "../../../assets/images/Postgresql_elephant.png";
  import mySqlLogo from "../../../assets/images/MySQL.svg";
  import sqlLogo from "../../../assets/images/sql.png";
  import phpLogo from "../../../assets/images/PHP.png";
  import phpMyAdminLogo from "../../../assets/images/phpmyadmin.png";
  import javaLogo from "../../../assets/images/java.png";
  import pythonLogo from "../../../assets/images/Python.png";
  import cLogo from "../../../assets/images/c.png";
  import bootstrapLogo from "../../../assets/images/Bootstrap.svg";
  import tailwindLogo from "../../../assets/images/Tailwind.svg.png";

  const logoMap: Record<string, string> = {
    "Postgresql_elephant.png": pgLogo,
    "MySQL.svg": mySqlLogo,
    "sql.png": sqlLogo,
    "PHP.png": phpLogo,
    "phpmyadmin.png": phpMyAdminLogo,
    "java.png": javaLogo,
    "Python.png": pythonLogo,
    "c.png": cLogo,
    "Bootstrap.svg": bootstrapLogo,
    "Tailwind.svg.png": tailwindLogo
  };

  // Every file in assets/images, keyed by filename as referenced in resume.ts.
  const screenshotMap: Record<string, string> = Object.fromEntries(
    Object.entries(
      import.meta.glob<string>("../../../assets/images/*", { eager: true, import: "default", query: "?url" })
    ).map(([path, url]) => [path.split("/").pop()!, url])
  );

  // Icons relevant to each service's real subject (design tool, web code, app window)
  const serviceIcons = [Code, PenTool, AppWindow];

  // Filter featured projects for preset view
  const featuredProjects = projects.filter(p => p.featured);

  // Stagger delay for cards inside a grid, capped so a long list doesn't
  // drag the last items in for a full second.
  const staggerDelay = (i: number) => Math.min(i, 6) * 60;

  // Section index: anchors and labels for the jump-nav
  const sections = [
    { id: "profil", number: "01", label: "Profil" },
    { id: "savoir-faire", number: "02", label: "Savoir-faire" },
    { id: "selection", number: "03", label: "Sélection" },
    { id: "stack", number: "04", label: "Stack" },
    { id: "recommandations", number: "05", label: "Recommandations" }
  ];
</script>

<div class="flex flex-col gap-12 animate-fade-in">
  <!-- Section jump-nav: quick way to skip a long page, smooth-scrolled -->
  <nav class="flex flex-wrap gap-2" aria-label="Sections de la page">
    {#each sections as section}
      <a href="#{section.id}" class="pill pill-neutral px-3.5 py-1.5 text-xs">
        {section.label}
      </a>
    {/each}
  </nav>

  <!-- Bio Section -->
  <section id="profil" class="flex flex-col gap-4 scroll-mt-6" use:reveal>
    <h2 class="text-3xl md:text-4xl font-display font-semibold text-ink leading-tight max-w-2xl">
      Enchanté, moi c'est <span style="color: var(--accent);">Elouan</span> : je développe des
      applications web et mobiles pensées jusque dans les détails.
    </h2>

    <div class="text-ink-muted leading-relaxed space-y-4 text-base max-w-2xl">
      {#each biography as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  </section>

  <!-- Core Services -->
  <section id="savoir-faire" class="flex flex-col gap-4 scroll-mt-6" use:reveal>
    <h2 class="text-3xl md:text-4xl font-display font-semibold text-ink leading-tight">Ce que je <span class="title-mark">fais</span></h2>

    <!-- Each skill shown through a real project screenshot; the first one spans the full row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
      {#each services as service, i}
        {@const Icon = serviceIcons[i % serviceIcons.length]}
        {@const domain = domainColors[service.domain]}
        {@const wide = i === 0}
        <article
          class="card card-interactive group overflow-hidden flex flex-col {wide ? 'md:col-span-2 md:flex-row' : ''}"
          style="--card-accent: {domain.hue};"
          use:reveal={{ delay: staggerDelay(i) }}
        >
          <div class="p-6 flex flex-col gap-3 {wide ? 'md:w-2/5 md:justify-center' : ''}">
            <span
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-105 group-hover:rotate-3"
              style="background: {domain.bg}; color: {domain.text};"
            >
              <Icon size={19} />
            </span>
            <h3 class="font-display font-semibold text-ink {wide ? 'text-2xl' : 'text-lg'}">{service.title}</h3>
            <p class="text-sm text-ink-muted leading-relaxed">{service.description}</p>
            <div class="flex flex-wrap gap-1.5 mt-1">
              {#each service.projectIds as id}
                {@const project = projects.find((p) => p.id === id)}
                {#if project}
                  <button
                    type="button"
                    class="tag hover:text-ink transition-colors"
                    onclick={() => onSelectProject?.(project)}
                  >
                    {project.title}
                  </button>
                {/if}
              {/each}
            </div>
          </div>
          <div
            class="relative overflow-hidden min-h-56 {wide ? 'md:flex-1 md:min-h-80' : 'flex-1'}"
            style="background: {domain.bg};"
          >
            <img
              src={screenshotMap[service.visual]}
              alt={service.visualAlt}
              loading="lazy"
              class="absolute left-8 top-8 w-[125%] max-w-none rounded-xl border border-border shadow-lg transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </article>
      {/each}
    </div>
  </section>

  <!-- Featured Projects -->
  <section id="selection" class="flex flex-col gap-4 scroll-mt-6" use:reveal>
    <h2 class="text-3xl md:text-4xl font-display font-semibold text-ink leading-tight">Projets <span class="title-mark">phares</span></h2>

    <div class="pt-1">
      <ProjectGallery
        items={featuredProjects}
        screenshots={screenshotMap}
        visitLabel="Voir le site"
        onSelect={onSelectProject}
      />
    </div>

    {#if onViewPortfolio}
      <div class="flex justify-end">
        <button type="button" onclick={onViewPortfolio} class="pill pill-neutral px-4 py-2 text-xs">
          Voir tout le portfolio <ArrowRight size={12} />
        </button>
      </div>
    {/if}
  </section>

  <!-- Skills -->
  <section id="stack" class="flex flex-col gap-4 scroll-mt-6" use:reveal>
    <h2 class="text-3xl md:text-4xl font-display font-semibold text-ink leading-tight">Mes <span class="title-mark">compétences</span></h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
      {#each skillCategories as category, i}
        {@const domain = domainColors[category.domain]}
        <div
          class="card p-5 flex flex-col gap-3 border-t-[3px]"
          style="border-top-color: {domain.hue};"
          use:reveal={{ delay: staggerDelay(i) }}
        >
          <h3 class="text-sm font-semibold uppercase tracking-wide" style="color: {domain.text};">{category.name}</h3>

          <div class="flex flex-wrap gap-2">
            {#each category.skills as skill}
              <div class="pill pill-neutral px-3 py-1.5 text-xs">
                {#if skill.type === 'img' && skill.icon && logoMap[skill.icon]}
                  <img src={logoMap[skill.icon]} alt="" class="w-3.5 h-3.5 object-contain shrink-0" />
                {:else if skill.type === 'cdn' && skill.icon}
                  <img src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}`} alt="" class="w-3.5 h-3.5 object-contain shrink-0" />
                {:else}
                  <span class="shrink-0 flex items-center justify-center" style="color: var(--accent);">
                    <Papicon icon={skill.icon || 'code'} size={12} />
                  </span>
                {/if}
                <span>{skill.name}</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Testimonials -->
  <section id="recommandations" class="flex flex-col gap-4 scroll-mt-6" use:reveal>
    <h2 class="text-3xl md:text-4xl font-display font-semibold text-ink leading-tight">Ce qu'on dit de <span class="title-mark">moi</span></h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
      {#each testimonials as item, i}
        <div class="card p-6 flex flex-col gap-4 relative" use:reveal={{ delay: staggerDelay(i) }}>
          <span class="absolute right-5 top-5" style="color: var(--accent-soft);">
            <Quote size={32} />
          </span>

          <p class="font-display text-lg text-ink leading-relaxed flex-1 z-10 pr-6">
            {item.text}
          </p>

          <div class="flex items-center gap-3.5 border-t border-border pt-4">
            {#if item.avatar.startsWith('http')}
              <div class="w-11 h-11 rounded-xl overflow-hidden bg-surface-muted border border-border flex items-center justify-center p-1 shrink-0">
                <img src={item.avatar} alt={item.name} class="w-full h-full object-contain" />
              </div>
            {:else}
              <div class="w-11 h-11 rounded-xl bg-surface-muted border border-border flex items-center justify-center font-display font-semibold text-sm shrink-0" style="color: var(--accent);">
                {item.name[0]}
              </div>
            {/if}
            <div class="min-w-0">
              <h4 class="text-sm font-semibold text-ink truncate">{item.name}</h4>
              <p class="text-xs text-ink-muted truncate mt-0.5">{item.role}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
