<script lang="ts">
  import { Sparkles, Eye, Github, Quote } from "lucide-svelte";
  import { projects } from "../data/projects";
  import { skillCategories, biography, services, testimonials } from "../data/resume";
  import Papicon from "./Papicon.svelte";
  import ProjectMockup from "./ProjectMockup.svelte";
  
  import { logoMap, screenshotMap } from "../data/assets";

  // Filter featured projects for preset view
  const featuredProjects = projects.filter(p => p.featured);

  // Template layout helper functions to avoid template-level @const declarations
  const getPostItColor = (i: number) => ["yellow", "pink", "blue", "green", "orange"][i % 5];
  const getRotationClass = (i: number) => (i % 2 === 0 ? "rotate-1" : "rotate--1.5");
  const getFeaturedRotation = (i: number) => (i % 2 === 0 ? "rotate-1.5" : "rotate--1");
  const getTapeColor = (i: number) => ["tape-blue", "tape-yellow", "tape-purple"][i % 3];
  const getMagnetColor4 = (i: number) => ["red", "blue", "green", "yellow"][i % 4];
  const getMagnetColor3 = (i: number) => ["red", "blue", "green"][i % 3];
  const getTestimonialRotation = (i: number) => (i % 2 === 0 ? "rotate-1.5" : "rotate--1.5");
</script>

<div class="flex flex-col gap-10 animate-fade-in text-slate-800">
  <!-- Bio Section -->
  <section class="flex flex-col gap-4 relative">
    <h2 class="text-xl font-hand font-bold text-slate-900 flex items-center gap-2">
      <span class="w-2 h-6 bg-[var(--marker-color)] rounded-full"></span>
      À propos de moi
    </h2>
    
    <div class="text-slate-700 leading-relaxed space-y-4 text-base font-sans pl-1">
      {#each biography as paragraph}
        <p>
          {@html paragraph}
        </p>
      {/each}
    </div>
  </section>

  <!-- Core Services as yellow, pink, blue post-its -->
  <section class="flex flex-col gap-4">
    <h2 class="text-xl font-hand font-bold text-slate-900 flex items-center gap-2">
      <span class="w-2 h-6 bg-[var(--marker-color)] rounded-full"></span>
      Ce que je fais
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
      {#each services as service, i}
        <div class="post-it post-it-{getPostItColor(i)} rounded-xl p-5 flex flex-col gap-3 {getRotationClass(i)} shadow-md border-sketch">
          <!-- Tape at the top -->
          <div class="tape-torn {service.tapeColor || 'tape-pink'} absolute top-[-9px] left-[32%] w-16 h-5 opacity-70"></div>
          <div class="text-slate-850">
            <Sparkles size={20} />
          </div>
          <h3 class="font-hand font-bold text-slate-900 text-lg">{service.title}</h3>
          <p class="text-sm text-slate-700 leading-relaxed font-marker">
            {service.description}
          </p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Featured Projects held by masking tapes -->
  <section class="flex flex-col gap-4">
    <h2 class="text-xl font-hand font-bold text-slate-900 flex items-center gap-2">
      <span class="w-2 h-6 bg-[var(--marker-color)] rounded-full"></span>
      Projets Phares
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
      {#each featuredProjects as project, i}
        <div class="premium-card rounded-2xl flex flex-col h-full group relative {getFeaturedRotation(i)} border-sketch bg-white shadow-sm">
          <!-- Tape angled top-left -->
          <div class="tape-torn {getTapeColor(i)} absolute top-[-10px] left-[-6px] w-14 h-4.5 rotate-[-25deg] opacity-75"></div>
          
          <!-- Polaroid photo container -->
          <div class="px-2.5 pt-2.5 pb-5 bg-white border border-slate-200 shadow-md rotate-[1.5deg] mx-4 mt-5 mb-1 relative border-sketch z-10">
            <div class="tape-torn {['tape-pink', 'tape-green', 'tape-orange'][i % 3]} absolute top-[-8px] left-[30%] w-12 h-4 rotate-[1deg] opacity-75"></div>
            <div class="w-full h-36 md:h-40 overflow-hidden bg-slate-50 border border-slate-200">
              <ProjectMockup category={project.category} image={screenshotMap[project.image]} />
            </div>
          </div>

          <div class="p-5 flex flex-col gap-3 flex-1 mt-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-hand font-bold tracking-wider uppercase px-2 py-0.5 bg-slate-100 border border-slate-300 text-slate-700 rounded-md">
                {project.category}
              </span>
            </div>
            
            <h3 class="text-lg font-hand font-bold text-slate-900 group-hover:text-[var(--marker-color)] transition-colors">
               {project.title}
            </h3>
            
            <p class="text-sm text-slate-600 leading-relaxed flex-1 font-marker">
              {project.description}
            </p>

            <div class="flex flex-wrap gap-1 mt-2">
              {#each project.tags as tag}
                <span class="text-xs px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded border border-slate-200 font-hand">
                  #{tag}
                </span>
              {/each}
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50/80 border-t border-slate-250 rounded-b-2xl flex items-center justify-between font-hand font-bold text-sm">
            <a href={project.url} target="_blank" rel="noopener noreferrer" 
               class="text-slate-700 hover:text-[var(--marker-color)] flex items-center gap-1.5 transition-colors">
              <Eye size={13} /> Voir le site
            </a>
            {#if project.github}
              <a href={project.github} target="_blank" rel="noopener noreferrer" 
                 class="text-slate-500 hover:text-[var(--marker-color)] transition-colors"
                 title="Code Source">
                <Github size={15} />
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Skills Category summary as notebook binder inserts held by magnets -->
  <section class="flex flex-col gap-4">
    <h2 class="text-xl font-hand font-bold text-slate-900 flex items-center gap-2">
      <span class="w-2 h-6 bg-[var(--marker-color)] rounded-full"></span>
      Mes Compétences
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each skillCategories as category, i}
        <div class="notebook-sheet border-2 border-slate-800 rounded-xl p-5 flex flex-col gap-3 relative pt-6 pl-9 shadow-sm">
          <!-- Magnet pins -->
          <div class="magnet magnet-{getMagnetColor4(i)} top-2 right-2"></div>
          
          <!-- Notebook binder lines on the left -->
          <div class="notebook-spiral-holes-left">
            <div class="notebook-spiral-hole-left"></div>
            <div class="notebook-spiral-hole-left"></div>
            <div class="notebook-spiral-hole-left"></div>
          </div>

          <h3 class="text-sm font-hand font-bold text-slate-800 uppercase tracking-wider pl-1">{category.name}</h3>
          
          <div class="flex flex-wrap gap-2 mt-1 pl-1">
            {#each category.skills as skill}
              <div class="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white border border-slate-350 rounded-lg text-sm text-slate-850 hover:border-slate-500 transition-colors font-sans shadow-sm hover:scale-102">
                {#if skill.type === 'img' && skill.icon && logoMap[skill.icon]}
                  <img src={logoMap[skill.icon]} alt={skill.name} class="w-4 h-4 object-contain shrink-0" />
                {:else if skill.type === 'cdn' && skill.icon}
                  <img src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}`} alt={skill.name} class="w-4 h-4 object-contain shrink-0" />
                {:else}
                  <span class="text-[var(--marker-color)] shrink-0 flex items-center justify-center">
                    <Papicon icon={skill.icon || 'code'} size={13} />
                  </span>
                {/if}
                <span class="font-medium text-slate-800">{skill.name}</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Testimonials Grid with board magnets -->
  <section class="flex flex-col gap-4">
    <h2 class="text-xl font-hand font-bold text-slate-900 flex items-center gap-2">
      <span class="w-2 h-6 bg-[var(--marker-color)] rounded-full"></span>
      Recommandations
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
      {#each testimonials as item, i}
        <div class="glass-panel border-2 border-slate-800 rounded-2xl p-6 flex flex-col gap-4 relative {getTestimonialRotation(i)} border-sketch bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
          <!-- Centered Magnet pinning the recommendation -->
          <div class="magnet magnet-{getMagnetColor3(i)} absolute -top-3 left-1/2 -translate-x-1/2 w-5.5 h-5.5 shadow-md"></div>
          
          <div class="text-slate-200 absolute right-4 top-4">
            <Quote size={36} />
          </div>
          
          <p class="text-lg md:text-xl text-slate-850 leading-relaxed font-cursive flex-1 z-10 pt-3">
            "{item.text}"
          </p>

          <div class="flex items-center gap-3.5 border-t border-dashed border-slate-300 pt-4 mt-2">
            {#if item.avatar.startsWith('http')}
              <div class="w-12 h-12 rounded-xl overflow-hidden bg-white border-2 border-slate-700 flex items-center justify-center p-1 shadow-sm border-sketch">
                <img src={item.avatar} alt={item.name} class="w-full h-full object-contain" />
              </div>
            {:else}
              <div class="w-12 h-12 rounded-xl bg-slate-100 border-2 border-slate-700 flex items-center justify-center text-[var(--marker-color)] font-hand font-bold text-base shadow-sm border-sketch">
                {item.name[0]}
              </div>
            {/if}
            <div class="min-w-0">
              <h4 class="text-base font-hand font-bold text-slate-900 truncate">{item.name}</h4>
              <p class="text-sm text-slate-600 font-marker truncate leading-none mt-1.5">{item.role}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
