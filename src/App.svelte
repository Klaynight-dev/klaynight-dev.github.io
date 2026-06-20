<script lang="ts">
  import { onMount } from "svelte";
  import Sidebar from "./lib/components/Sidebar.svelte";
  import PresetView from "./lib/components/PresetView.svelte";
  import Papicon from "./lib/components/Papicon.svelte";
  import ProjectMockup from "./lib/components/ProjectMockup.svelte";
  import { projects } from "./lib/data/projects";
  import { education, experiences, keyCompetences, skillCategories, personalInfo } from "./lib/data/resume";
  import { Mail, Eye, Github } from "lucide-svelte";
  
  // Import skill logos for Vite static bundling
  import pgLogo from "../assets/images/Postgresql_elephant.png";
  import mySqlLogo from "../assets/images/MySQL.svg";
  import sqlLogo from "../assets/images/sql.png";
  import phpLogo from "../assets/images/PHP.png";
  import phpMyAdminLogo from "../assets/images/phpmyadmin.png";
  import javaLogo from "../assets/images/java.png";
  import pythonLogo from "../assets/images/Python.png";
  import cLogo from "../assets/images/c.png";
  import bootstrapLogo from "../assets/images/Bootstrap.svg";
  import tailwindLogo from "../assets/images/Tailwind.svg.png";

  // Import project screenshots and fallbacks
  import plinkkImg from "../assets/images/plinkk.png";
  import hubgamesImg from "../assets/images/HubGames.jpeg";
  import jobiImg from "../assets/images/Jobi.png";
  import joSurfImg from "../assets/images/DA Site JO.png";
  import defaultMetaImg from "../assets/images/my-avatar.png";
  import iconAppImg from "../assets/images/icon-app.svg";
  import iconDesignImg from "../assets/images/icon-design.svg";
  import iconDevImg from "../assets/images/icon-dev.svg";

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

  const projectImageMap: Record<string, string> = {
    "icon-app.svg": iconAppImg,
    "plinkk.png": plinkkImg,
    "icon-design.svg": iconDesignImg,
    "MySQL.svg": mySqlLogo,
    "HubGames.jpeg": hubgamesImg,
    "Jobi.png": jobiImg,
    "DA Site JO.png": joSurfImg,
    "my-avatar.png": defaultMetaImg,
    "icon-dev.svg": iconDevImg
  };

  const getProjectImage = (imageName: string) => {
    return projectImageMap[imageName] || defaultMetaImg;
  };
  
  // Tab state (only active in Preset mode)
  let activeTab = $state("about"); // 'about', 'resume', 'portfolio', 'contact'

  // Project filtering state
  let projectFilter = $state("all"); // 'all', 'Web Development', 'Web Design', 'Applications'
  const filteredProjects = $derived(
    projectFilter === "all" ? projects : projects.filter(p => p.category === projectFilter)
  );

  // Contact Form Mocking
  let fullname = $state("");
  let email = $state("");
  let message = $state("");
  let isSending = $state(false);
  let showToast = $state(false);

  function handleMockSubmit(e: SubmitEvent) {
    e.preventDefault();
    isSending = true;
    setTimeout(() => {
      isSending = false;
      showToast = true;
      fullname = "";
      email = "";
      message = "";
      setTimeout(() => {
        showToast = false;
      }, 5000);
    }, 1500);
  }
</script>

<!-- Main container holding sidebar, content, and the marker tray -->
<div class="min-h-screen bg-whiteboard text-slate-800 flex flex-col items-center py-6 px-4 md:py-10 relative">
  
  <!-- Decorative Hand-drawn Whiteboard Header -->
  <div class="w-full max-w-6xl mb-6 flex flex-col items-center text-center relative pointer-events-none">
    <!-- Sketch board header -->
    <h1 class="text-3xl md:text-4xl font-hand font-bold text-slate-900 flex flex-col md:flex-row items-center gap-2">
      <span>{personalInfo.name}</span>
      <span class="text-xs px-2 py-0.5 border-2 border-slate-700 rounded rotate-2 bg-yellow-100/80 text-slate-700 pointer-events-auto border-sketch flex items-center gap-1">
        <Papicon icon="terminal" size={12} /> {personalInfo.boardSubtitle}
      </span>
    </h1>
    <p class="text-xs text-slate-500 mt-2 font-marker max-w-md">
      Design tactile : feutres de couleur, scotch, feuilles volantes et post-its. Modifiez la couleur avec le porte-feutres !
    </p>
  </div>

  <div class="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-stretch relative">
    
    <!-- Toast Notification -->
    {#if showToast}
      <div class="fixed top-5 right-5 bg-white border-2 border-green-600 text-green-700 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-[9999] border-sketch font-hand animate-fade-in">
        <div class="w-2.5 h-2.5 rounded-full bg-green-600"></div>
        <p class="text-xs font-semibold">Message envoyé avec succès ! (Simulation locale)</p>
      </div>
    {/if}

    <!-- Always visible responsive Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col gap-6 min-w-0">
      
      <!-- VIEW RENDERER (Whiteboard sheet with border sketch) -->
      <div class="glass-panel rounded-2xl p-6 lg:p-8 flex-1 min-h-[500px] border-sketch relative">
        
        <!-- Tape at the top of main content to make it look hung -->
        <div class="tape-torn absolute top-[-14px] left-[45%] w-24 h-7 opacity-80"></div>
        
        <!-- Red round magnet at top right -->
        <div class="magnet magnet-red top-3 right-3"></div>

        <div class="flex flex-col gap-6">
          <!-- Whiteboard Tabs Navbar (Handdrawn tape and marker style with highlighter colors) -->
          <div class="flex border-b-2 border-dashed border-slate-350 pb-3 overflow-x-auto gap-4 shrink-0 font-hand text-base md:text-lg">
            <button 
              onclick={() => activeTab = "about"}
              class="px-3 py-1.5 rounded-lg relative transition-all duration-150 whitespace-nowrap cursor-pointer
                     {activeTab === 'about' ? 'text-slate-900 font-bold highlight-yellow rotate-1 scale-105' : 'text-slate-500 hover:text-slate-800 hover:rotate--1'}"
            >
              <span class="inline-flex items-center gap-1.5"><Papicon icon="paper" size={14} /> À propos</span>
              {#if activeTab === 'about'}
                <span class="absolute -bottom-1.5 left-0 w-full h-1 bg-yellow-500 rounded"></span>
              {/if}
            </button>
            <button 
              onclick={() => activeTab = "resume"}
              class="px-3 py-1.5 rounded-lg relative transition-all duration-150 whitespace-nowrap cursor-pointer
                     {activeTab === 'resume' ? 'text-slate-900 font-bold highlight-pink rotate--1 scale-105' : 'text-slate-500 hover:text-slate-800 hover:rotate-1'}"
            >
              <span class="inline-flex items-center gap-1.5"><Papicon icon="graduation-hat" size={14} /> Parcours</span>
              {#if activeTab === 'resume'}
                <span class="absolute -bottom-1.5 left-0 w-full h-1 bg-pink-500 rounded"></span>
              {/if}
            </button>
            <button 
              onclick={() => activeTab = "portfolio"}
              class="px-3 py-1.5 rounded-lg relative transition-all duration-150 whitespace-nowrap cursor-pointer
                     {activeTab === 'portfolio' ? 'text-slate-900 font-bold highlight-blue rotate-1 scale-105' : 'text-slate-500 hover:text-slate-800 hover:rotate--1'}"
            >
              <span class="inline-flex items-center gap-1.5"><Papicon icon="grid" size={14} /> Portfolio</span>
              {#if activeTab === 'portfolio'}
                <span class="absolute -bottom-1.5 left-0 w-full h-1 bg-blue-500 rounded"></span>
              {/if}
            </button>
            <button 
              onclick={() => activeTab = "contact"}
              class="px-3 py-1.5 rounded-lg relative transition-all duration-150 whitespace-nowrap cursor-pointer
                     {activeTab === 'contact' ? 'text-slate-900 font-bold highlight-green rotate--1 scale-105' : 'text-slate-500 hover:text-slate-800 hover:rotate-1'}"
            >
              <span class="inline-flex items-center gap-1.5"><Papicon icon="mail" size={14} /> Contact</span>
              {#if activeTab === 'contact'}
                <span class="absolute -bottom-1.5 left-0 w-full h-1 bg-green-500 rounded"></span>
              {/if}
            </button>
          </div>

          <!-- Tab Content Renderer -->
          {#if activeTab === "about"}
            <PresetView />
          {:else if activeTab === "resume"}
            <!-- Render CV/Timeline -->
            <div class="flex flex-col gap-8 animate-fade-in">
              <!-- Scholastic -->
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-[var(--marker-color)] flex items-center">
                    <Papicon icon="graduation-hat" size={20} />
                  </span>
                  <h3 class="text-lg font-hand font-bold text-slate-800 flex items-center gap-2">
                    <span class="rature-marker text-slate-400 font-normal">Études</span> 
                    <span>Parcours Scolaire</span>
                  </h3>
                </div>
                <div class="border-l-2 border-dashed border-[var(--marker-color)] ml-4 pl-6 flex flex-col gap-6 relative">
                  {#each education as item, i}
                    {@const dotColors = ["bg-[var(--marker-red)]", "bg-[var(--marker-blue)]", "bg-[var(--marker-green)]"]}
                    {@const dotColor = dotColors[i % dotColors.length]}
                    <div class="relative py-1">
                      <div class="absolute w-3.5 h-3.5 rounded-full {dotColor} -left-[31px] top-2.5 border-2 border-white"></div>
                      <span class="text-xs font-hand font-bold text-[var(--marker-color)] uppercase tracking-wider">{item.date}</span>
                      <h4 class="text-sm font-hand font-bold text-slate-900 mt-1">{item.title}</h4>
                      <p class="text-xs text-slate-500 font-marker mt-0.5">{item.subtitle}</p>
                      <p class="text-xs text-slate-655 mt-2 leading-relaxed font-sans">{item.description}</p>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Experience -->
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-[var(--marker-color)] flex items-center">
                    <Papicon icon="briefcase" size={20} />
                  </span>
                  <h3 class="text-lg font-hand font-bold text-slate-800 flex items-center gap-2">
                    <span class="rature-marker-double text-slate-400 font-normal">Job</span> 
                    <span>Expériences</span>
                  </h3>
                </div>
                <div class="border-l-2 border-dashed border-[var(--marker-color)] ml-4 pl-6 flex flex-col gap-6 relative">
                  {#each experiences as item, i}
                    {@const dotColors = ["bg-[var(--marker-blue)]", "bg-[var(--marker-red)]", "bg-[var(--marker-green)]"]}
                    {@const dotColor = dotColors[i % dotColors.length]}
                    <div class="relative py-1">
                      <div class="absolute w-3.5 h-3.5 rounded-full {dotColor} -left-[31px] top-2.5 border-2 border-white"></div>
                      <span class="text-xs font-hand font-bold text-[var(--marker-color)] uppercase tracking-wider">{item.date}</span>
                      <h4 class="text-sm font-hand font-bold text-slate-900 mt-1">{item.title}</h4>
                      <p class="text-xs text-slate-500 font-marker mt-0.5">{item.subtitle}</p>
                      <p class="text-xs text-slate-655 mt-2 leading-relaxed font-sans">{item.description}</p>
                      {#if item.url}
                        <a href={item.url} target="_blank" rel="noopener noreferrer" class="text-xs text-[var(--marker-color)] font-bold hover:underline mt-2 inline-block font-hand">
                          {item.urlLabel || "Lien"} →
                        </a>
                      {/if}
                    </div>
                  {/each}
                </div>
              </div>

              <!-- 6 competencies as colored sticky notes -->
              <div>
                <h3 class="text-lg font-hand font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span class="rature-marker text-slate-400 font-normal">Compétences</span>
                  <span>Compétences Clés</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {#each keyCompetences as competence, i}
                    {@const colors = ["yellow", "pink", "blue", "green", "orange"]}
                    {@const tapes = ["pink", "green", "orange", "purple", "blue", "yellow"]}
                    {@const color = colors[i % colors.length]}
                    {@const tapeColor = tapes[i % tapes.length]}
                    {@const rotation = (i % 2 === 0 ? "rotate-1" : "rotate--1")}
                    <div class="post-it post-it-{color} {rotation} rounded-xl p-4 flex flex-col gap-2 relative">
                      <div class="tape-torn tape-{tapeColor} absolute top-[-9px] left-[35%] w-16 h-5 opacity-70"></div>
                      
                      <h4 class="text-xs font-hand font-bold text-slate-800">{competence.title}</h4>
                      <div class="flex flex-wrap gap-2 mt-2">
                        {#each competence.links as link}
                          <a href={link.url} target="_blank" rel="noopener noreferrer" 
                             class="text-[10px] px-2 py-0.5 bg-white/70 hover:bg-white border-2 border-slate-700 text-slate-800 rounded font-marker transition-all transform hover:scale-105 inline-flex items-center gap-1">
                            <span class="text-slate-500"><Papicon icon="link" size={10} /></span> {link.label}
                          </a>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {:else if activeTab === "portfolio"}
            <!-- Render Projects Catalog as sticky notes -->
            <div class="flex flex-col gap-6 animate-fade-in">
              <div class="flex items-center gap-2">
                <span class="text-[var(--marker-color)] flex items-center">
                  <Papicon icon="grid" size={20} />
                </span>
                <h3 class="text-lg font-hand font-bold text-slate-800 flex items-center gap-2">
                  <span class="rature-marker text-slate-400 font-normal">Projets Pro</span>
                  <span>Tous mes projets</span>
                </h3>
              </div>

              <!-- Projects Category Filters -->
              <div class="flex flex-wrap gap-2 pt-2 pb-1 font-hand select-none">
                <button 
                  onclick={() => projectFilter = "all"} 
                  class="px-3.5 py-1.5 border-2 text-xs font-bold rounded-lg cursor-pointer transition-all border-sketch 
                         {projectFilter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'}"
                >
                  Tout
                </button>
                <button 
                  onclick={() => projectFilter = "Web Development"} 
                  class="px-3.5 py-1.5 border-2 text-xs font-bold rounded-lg cursor-pointer transition-all border-sketch 
                         {projectFilter === 'Web Development' ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'}"
                >
                  Développement Web
                </button>
                <button 
                  onclick={() => projectFilter = "Web Design"} 
                  class="px-3.5 py-1.5 border-2 text-xs font-bold rounded-lg cursor-pointer transition-all border-sketch 
                         {projectFilter === 'Web Design' ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'}"
                >
                  Design Web
                </button>
                <button 
                  onclick={() => projectFilter = "Applications"} 
                  class="px-3.5 py-1.5 border-2 text-xs font-bold rounded-lg cursor-pointer transition-all border-sketch 
                         {projectFilter === 'Applications' ? 'bg-slate-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'}"
                >
                  Applications
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                {#each filteredProjects as project, i}
                  {@const colors = ["yellow", "pink", "blue", "green", "orange"]}
                  {@const tapes = ["blue", "purple", "green", "orange", "pink", "yellow"]}
                  {@const color = colors[i % colors.length]}
                  {@const tapeColor = tapes[i % tapes.length]}
                  {@const rotation = (i % 2 === 0 ? "rotate-1.5" : "rotate--1.5")}
                  <div class="post-it post-it-{color} {rotation} rounded-2xl flex flex-col h-full group">
                    <div class="tape-torn tape-{tapeColor} absolute top-[-12px] left-[35%] w-20 h-6 opacity-80"></div>
                    
                    <!-- Polaroid photo container -->
                    <div class="px-3 pt-3 pb-6 bg-white border border-slate-250 shadow-md rotate-[-1deg] mx-4 mt-5 mb-1 relative border-sketch z-10">
                      <div class="tape-torn tape-{tapes[(i + 2) % tapes.length]} absolute top-[-8px] left-[25%] w-14 h-4.5 rotate-[-2deg] opacity-75"></div>
                      <div class="w-full h-32 md:h-36 overflow-hidden bg-slate-50 border border-slate-200">
                        <ProjectMockup category={project.category} />
                      </div>
                    </div>

                    <div class="p-5 flex flex-col gap-3 flex-1">
                      <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/60 text-slate-700 w-fit rounded font-hand">
                        {project.category}
                      </span>
                      <h4 class="text-base font-hand font-bold text-slate-900 group-hover:text-[var(--marker-color)] transition-colors">
                        {project.title}
                      </h4>
                      <p class="text-xs text-slate-700 leading-relaxed flex-1 font-marker">
                        {project.description}
                      </p>
                      <div class="flex flex-wrap gap-1 mt-2">
                        {#each project.tags as tag}
                          <span class="text-[9px] px-1.5 py-0.5 bg-white/40 text-slate-650 rounded border border-slate-300 font-hand">
                            #{tag}
                          </span>
                        {/each}
                      </div>
                    </div>
                    <div class="px-5 py-3 bg-white/40 border-t border-slate-350 rounded-b-2xl flex items-center justify-between font-hand font-bold text-sm">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" class="text-slate-700 hover:text-[var(--marker-color)] flex items-center gap-1">
                        <Eye size={12} /> Visiter
                      </a>
                      {#if project.github}
                        <a href={project.github} target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-[var(--marker-color)]">
                          <Github size={14} />
                        </a>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {:else if activeTab === "contact"}
            <!-- Render Contact Page -->
            <div class="flex flex-col gap-6 animate-fade-in">
              <div class="flex items-center gap-2">
                <span class="text-[var(--marker-color)] flex items-center">
                  <Papicon icon="mail" size={20} />
                </span>
                <h3 class="text-lg font-hand font-bold text-slate-800 flex items-center gap-2">
                  <span class="rature-marker-double text-slate-400 font-normal">Contactez-moi</span>
                  <span>Formulaire de contact</span>
                </h3>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Form -->
                <form onsubmit={handleMockSubmit} class="flex flex-col gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label for="fullname" class="text-xs text-slate-700 font-hand font-bold">Nom complet</label>
                    <input 
                      type="text" 
                      id="fullname" 
                      bind:value={fullname}
                      required
                      placeholder="Ex: John Doe" 
                      class="px-4 py-2.5 bg-white border-2 border-slate-700 focus:border-[var(--marker-color)] rounded-xl text-sm text-slate-800 outline-none transition-colors border-sketch font-hand"
                    />
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label for="email" class="text-xs text-slate-700 font-hand font-bold">Adresse Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      bind:value={email}
                      required
                      placeholder="Ex: john@example.com" 
                      class="px-4 py-2.5 bg-white border-2 border-slate-700 focus:border-[var(--marker-color)] rounded-xl text-sm text-slate-800 outline-none transition-colors border-sketch font-hand"
                    />
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label for="message" class="text-xs text-slate-700 font-hand font-bold">Votre message</label>
                    <textarea 
                      id="message" 
                      bind:value={message}
                      required
                      rows="4" 
                      placeholder="Écrivez votre message ici..." 
                      class="px-4 py-2.5 bg-white border-2 border-slate-700 focus:border-[var(--marker-color)] rounded-xl text-sm text-slate-800 outline-none resize-none transition-colors border-sketch font-hand"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSending}
                    class="btn-sketch self-end font-hand py-2 px-5 cursor-pointer text-xs flex items-center gap-1.5"
                  >
                    {isSending ? "Envoi en cours..." : "Envoyer le message"}
                    {#if !isSending}
                      <Papicon icon="arrow_forward" size={12} />
                    {/if}
                  </button>
                </form>

                <!-- Info & Map Notebook sheets -->
                <div class="flex flex-col gap-6 justify-between">
                  
                  <!-- Spiral Notebook Card -->
                  <div class="notebook-sheet rounded-xl p-5 flex flex-col gap-3 relative min-h-[160px]">
                    <!-- Colored magnets at the top corner -->
                    <div class="magnet magnet-red -top-2 -left-2"></div>
                    <div class="notebook-spiral-holes-left">
                      <div class="notebook-spiral-hole-left"></div>
                      <div class="notebook-spiral-hole-left"></div>
                      <div class="notebook-spiral-hole-left"></div>
                      <div class="notebook-spiral-hole-left"></div>
                    </div>
                    
                    <div class="pl-8">
                      <div class="text-[var(--marker-color)]"><Mail size={20} /></div>
                      <h4 class="text-sm font-hand font-bold text-slate-800 mt-2">Contact direct</h4>
                      <p class="text-xs text-slate-650 leading-relaxed mt-2 font-marker">
                        Le formulaire de contact ci-contre simule une soumission locale. Pour toute demande professionnelle, vous pouvez me contacter directement par mail à :
                      </p>
                      <a href="mailto:{personalInfo.email}" class="text-sm text-[var(--marker-color)] hover:underline font-bold mt-2 block font-hand">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div class="border-2 border-slate-850 rounded-xl overflow-hidden h-48 shadow-md border-sketch relative">
                    <div class="magnet magnet-blue -top-2 -right-2"></div>
                    <iframe 
                      src={personalInfo.mapIframeUrl} 
                      width="100%" 
                      height="100%" 
                      style="border:0;" 
                      allowfullscreen={true} 
                      loading="lazy" 
                      title="Location map"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- Footer details -->
      <footer class="text-[10px] text-slate-500 font-hand text-center py-2 shrink-0">
        © {new Date().getFullYear()} {personalInfo.name}. Conçu avec Svelte 5 & Bun. UI Tableau Blanc.
      </footer>
    </main>

  </div>

</div>
