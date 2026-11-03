<script module lang="ts">
  // Section index: anchors, icons and labels shown in the sticky top bar (App.svelte)
  export const sections = [
    { id: "profil", label: "Profil", icon: "User" },
    { id: "savoir-faire", label: "Savoir-faire", icon: "Palette" },
    { id: "selection", label: "Sélection", icon: "Bookmark" },
    { id: "stack", label: "Stack", icon: "Code" },
    { id: "recommandations", label: "Recommandations", icon: "TextBubble" }
  ];
</script>

<script lang="ts">
  import { projects, type Project } from "../data/projects";
  import { skillCategories, biography, services, testimonials, personalInfo } from "../data/resume";
  import { domainColors } from "../data/domains";
  import Papicon from "./Papicon.svelte";
  import IconCloud from "./IconCloud.svelte";
  import Marked from "./Marked.svelte";
  import ProjectGallery from "./ProjectGallery.svelte";
  import { reveal } from "../actions/reveal";

  let {
    onViewPortfolio,
    onSelectProject
  }: {
    onViewPortfolio?: () => void;
    onSelectProject?: (project: Project) => void;
  } = $props();

  // Every file in assets/images, keyed by its path relative to that folder as referenced in resume.ts.
  const screenshotMap: Record<string, string> = Object.fromEntries(
    Object.entries(
      import.meta.glob<string>("../../../assets/images/**/*", { eager: true, import: "default", query: "?url" })
    ).map(([path, url]) => [path.replace(/^(\.\.\/)+assets\/images\//, ""), url])
  );

  // Icons relevant to each service's real subject (design tool, web code, app window)
  const serviceIcons = ["Code", "Palette", "Grid"];

  // Filter featured projects for preset view
  const featuredProjects = projects.filter(p => p.featured);

  // Stagger delay for cards inside a grid, capped so a long list doesn't
  // drag the last items in for a full second.
  const staggerDelay = (i: number) => Math.min(i, 6) * 60;

</script>

<div class="flex flex-col gap-12 animate-fade-in">
  <!-- Bio Section -->
  <section id="profil" class="flex flex-col gap-4 scroll-mt-32" use:reveal>
    <h2 class="cloud-host text-3xl md:text-4xl font-display font-semibold text-ink leading-tight max-w-2xl"><IconCloud icons={["User", "Heart", "Sparkles", "Star"]} />
      Enchanté, moi c'est <span style="color: var(--accent);">Elouan</span> : je développe des
      applications web et mobiles pensées jusque dans les détails.
    </h2>

    <div class="text-ink-muted leading-relaxed space-y-4 text-base max-w-2xl">
      {#each biography as paragraph}
        <p><Marked text={paragraph} /></p>
      {/each}
    </div>
  </section>

  <!-- Core Services -->
  <section id="savoir-faire" class="flex flex-col gap-4 scroll-mt-32" use:reveal>
    <h2 class="cloud-host text-3xl md:text-4xl font-display font-semibold text-ink leading-tight"><IconCloud icons={["Palette", "Code", "Pen", "Gears"]} />Ce que je <span class="title-mark">fais</span></h2>

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
            <p class="text-sm text-ink-muted leading-relaxed"><Marked text={service.description} /></p>
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
  <section id="selection" class="flex flex-col gap-4 scroll-mt-32" use:reveal>
    <h2 class="cloud-host text-3xl md:text-4xl font-display font-semibold text-ink leading-tight"><IconCloud icons={["Bookmark", "Star", "Gallery", "Heart"]} />Projets <span class="title-mark">phares</span></h2>

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
  <section id="stack" class="flex flex-col gap-4 scroll-mt-32" use:reveal>
    <h2 class="cloud-host text-3xl md:text-4xl font-display font-semibold text-ink leading-tight"><IconCloud icons={["Code", "Gears", "Zap", "Grid"]} />Mes <span class="title-mark">compétences</span></h2>

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
                {#if skill.type === 'img' && skill.icon && screenshotMap[skill.icon]}
                  <img src={screenshotMap[skill.icon]} alt="" class="w-3.5 h-3.5 object-contain shrink-0" />
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
  <!-- Recommandations: strip of flat quote cards that scrolls sideways (papillon.bzh reviews),
       context in a grey pill (beta.tomthings.fr), personal heading (vincelinise.com). -->
  <section id="recommandations" class="flex flex-col gap-6 scroll-mt-32" use:reveal>
    <div class="flex flex-col gap-2">
      <h2 class="cloud-host text-3xl md:text-4xl font-display font-semibold text-ink leading-tight"><IconCloud icons={["TextBubble", "MessageCircle", "Heart", "Star"]} />C'est <span class="title-mark">eux</span> qui le disent.</h2>
      <p class="text-ink-muted max-w-xl">Des personnes avec qui j'ai travaillé, en stage ou sur mes projets.</p>
    </div>

    <!-- tabindex: a scrollable region must be reachable to scroll it with the keyboard -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="quote-strip" role="region" aria-label="Recommandations" tabindex="0">
      <ul class="quote-track">
        {#each testimonials as item}
          {@const avatarSrc = screenshotMap[item.avatar] ?? (item.avatar.startsWith("http") ? item.avatar : "")}
          {@const initials = item.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
          <li class="quote-card">
            {#if item.context}
              <span class="quote-context">{item.context}</span>
            {/if}
            <blockquote class="flex-1 m-0 text-[0.975rem] text-ink leading-relaxed text-pretty">{item.text}</blockquote>
            <figure class="quote-author m-0">
              {#if avatarSrc && !item.isLogo}
                <img src={avatarSrc} alt="" class="quote-avatar" />
              {:else}
                <span class="quote-avatar quote-initials" aria-hidden="true">{initials}</span>
              {/if}
              <figcaption class="text-sm min-w-0">
                <span class="font-semibold text-ink">{item.name}</span>
                <span class="text-ink-muted-strong"> · {item.role}</span>
              </figcaption>
            </figure>
          </li>
        {/each}
      </ul>
    </div>
  </section>
</div>
