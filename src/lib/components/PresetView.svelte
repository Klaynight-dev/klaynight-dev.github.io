<script lang="ts">
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
  import pgLogo from "../../../assets/images/tech/Postgresql_elephant.png";
  import mySqlLogo from "../../../assets/images/tech/MySQL.svg";
  import sqlLogo from "../../../assets/images/tech/sql.png";
  import phpLogo from "../../../assets/images/tech/PHP.png";
  import phpMyAdminLogo from "../../../assets/images/tech/phpmyadmin.png";
  import javaLogo from "../../../assets/images/tech/java.png";
  import pythonLogo from "../../../assets/images/tech/Python.png";
  import cLogo from "../../../assets/images/tech/c.png";
  import bootstrapLogo from "../../../assets/images/tech/Bootstrap.svg";
  import tailwindLogo from "../../../assets/images/tech/Tailwind.svg.png";

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
    "Tailwind.svg.png": tailwindLogo,
    "tech/Postgresql_elephant.png": pgLogo,
    "tech/MySQL.svg": mySqlLogo,
    "tech/sql.png": sqlLogo,
    "tech/PHP.png": phpLogo,
    "tech/phpmyadmin.png": phpMyAdminLogo,
    "tech/java.png": javaLogo,
    "tech/Python.png": pythonLogo,
    "tech/c.png": cLogo,
    "tech/Bootstrap.svg": bootstrapLogo,
    "tech/Tailwind.svg.png": tailwindLogo
  };

  // Every file in assets/images, keyed by filename as referenced in resume.ts.
  const screenshotMap: Record<string, string> = Object.fromEntries(
    Object.entries(
      import.meta.glob<string>("../../../assets/images/**/*", { eager: true, import: "default", query: "?url" })
    ).flatMap(([path, url]) => {
      const rel = path.replace(/^(\.\.\/)+assets\/images\//, "");
      const file = path.split("/").pop()!;
      return [[rel, url], [file, url]];
    })
  );

  // Icons relevant to each service's real subject (design tool, web code, app window)
  const serviceIcons = ["Code", "Palette", "Grid"];

  // Filter featured projects for preset view
  const featuredProjects = projects.filter(p => p.featured);

  // Stagger delay for cards inside a grid, capped so a long list doesn't
  // drag the last items in for a full second.
  const staggerDelay = (i: number) => Math.min(i, 6) * 60;

  // Section index: anchors, numbers, icons and labels for the jump-nav
  const sections = [
    { id: "profil", number: "01", label: "Profil", icon: "User" },
    { id: "savoir-faire", number: "02", label: "Savoir-faire", icon: "Palette" },
    { id: "selection", number: "03", label: "Sélection", icon: "Bookmark" },
    { id: "stack", number: "04", label: "Stack", icon: "Code" },
    { id: "recommandations", number: "05", label: "Recommandations", icon: "TextBubble" }
  ];
</script>

<div class="flex flex-col gap-12 animate-fade-in">
  <!-- Section jump-nav: segmented pill bar façon Papillon / Tafac -->
  <nav class="index-bar" aria-label="Sommaire des sections">
    {#each sections as section}
      <a href="#{section.id}" class="index-pill">
        <Papicon icon={section.icon} size={14} />
        <span>{section.label}</span>
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

    <!-- Each skill shown through a real project screenshot, captioned underneath; the first one spans the full row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8 pt-1">
      {#each services as service, i}
        {@const domain = domainColors[service.domain]}
        {@const wide = i === 0}
        <article class="group flex flex-col gap-4 {wide ? 'md:col-span-2' : ''}" use:reveal={{ delay: staggerDelay(i) }}>
          <div
            class="relative overflow-hidden rounded-3xl border border-border {wide ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'}"
            style="background: {domain.bg};"
          >
            <img
              src={screenshotMap[service.visual]}
              alt={service.visualAlt}
              loading="lazy"
              class="absolute left-[8%] top-[10%] w-[110%] max-w-none rounded-2xl border border-border shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
            />
          </div>
          <div class="flex flex-col gap-2 px-1 {wide ? 'md:max-w-2xl' : ''}">
            <h3 class="flex items-center gap-2 font-display font-semibold text-ink text-xl">
              <span style="color: {domain.text};"><Papicon icon={serviceIcons[i % serviceIcons.length]} size={20} /></span>
              {service.title}
            </h3>
            <p class="text-sm text-ink-muted leading-relaxed">{service.description}</p>
            <div class="flex flex-wrap gap-1.5 mt-1">
              {#each service.projectIds as id}
                {@const project = projects.find((p) => p.id === id)}
                {#if project}
                  <button type="button" class="pill pill-neutral px-3 py-1 text-xs" onclick={() => onSelectProject?.(project)}>
                    {project.title}
                  </button>
                {/if}
              {/each}
            </div>
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
          Voir tout le portfolio <Papicon icon="ArrowRight" size={12} />
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
          class="card p-5 md:p-6 flex flex-col gap-3.5"
          use:reveal={{ delay: staggerDelay(i) }}
        >
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted-strong">{category.name}</h3>
            <span class="w-2 h-2 rounded-full shrink-0" style="background: {domain.hue};" title={category.name}></span>
          </div>

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
      {#each testimonials as item, i}{@const avatarSrc = screenshotMap[item.avatar] ?? (item.avatar.startsWith('http') ? item.avatar : '')}{@const initials = item.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
        <figure
          class="quote-card card-interactive m-0 {i === testimonials.length - 1 && testimonials.length % 2 === 1 ? 'md:col-span-2' : ''}"
          use:reveal={{ delay: staggerDelay(i) }}
        >
          {#if item.context}
            <div class="flex items-center justify-between gap-3">
              <span class="tag">{item.context}</span>
            </div>
          {/if}

          <blockquote class="text-[0.975rem] md:text-base text-ink leading-relaxed flex-1 m-0">
            « {item.text} »
          </blockquote>

          <figcaption class="quote-author">
            <div class="flex items-center gap-3 min-w-0">
              {#if avatarSrc && !item.isLogo}
                <img
                  src={avatarSrc}
                  alt={item.name}
                  class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                />
              {:else}
                <div
                  class="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center font-display font-semibold text-xs shrink-0"
                  style="color: #4c2f60;"
                  aria-hidden="true"
                >
                  {initials}
                </div>
              {/if}
              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-ink truncate">{item.name}</h3>
                <p class="text-xs text-ink-muted-strong truncate mt-0.5">{item.role}</p>
              </div>
            </div>

            {#if avatarSrc && item.isLogo}
              <span class="quote-logo-pill" title={item.context || item.role}>
                <img src={avatarSrc} alt="Logo {item.context || item.name}" class="h-4 w-auto object-contain" />
              </span>
            {/if}
          </figcaption>
        </figure>
      {/each}
    </div>
  </section>
</div>
