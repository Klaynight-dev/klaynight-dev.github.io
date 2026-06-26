<script lang="ts">
  import Papicon from "./Papicon.svelte";
  import myAvatar from "../../../assets/images/my-avatar.png";
  import { personalInfo } from "../data/resume";
</script>

<aside class="notebook-sheet w-full lg:w-80 rounded-2xl p-6 pl-12 flex flex-col gap-6 lg:sticky lg:top-6 self-start animate-fade-in relative">
  <!-- Notebook metallic spiral holes on the left side -->
  <div class="notebook-spiral-holes-left select-none">
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
    <div class="notebook-spiral-hole-left"></div>
  </div>

  <!-- Tape details at the top corners to secure the sheet -->
  <div class="tape-torn absolute top-[-10px] left-[-6px] w-16 h-5 rotate-[-25deg] opacity-75"></div>
  <div class="tape-torn absolute top-[-10px] right-[-6px] w-16 h-5 rotate-[25deg] opacity-75"></div>

  <!-- Profile info header -->
  <div class="flex flex-row lg:flex-col items-center gap-4 lg:text-center mt-2">
    <div class="relative w-20 h-20 lg:w-32 lg:h-32 rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-800 shadow-sm border-sketch select-none">
      <img src={myAvatar} alt={personalInfo.name} class="w-full h-full object-cover animate-pulse-slow" />
    </div>
    
    <div class="flex flex-col gap-1 items-start lg:items-center">
      <h1 class="text-xl lg:text-2xl font-hand font-bold text-slate-900 tracking-tight">{personalInfo.name}</h1>
      {#if personalInfo.nickname}
        <span class="text-sm px-3 py-0.5 bg-slate-100 border border-slate-400 text-slate-650 rounded-full font-hand font-bold mt-1">
          {personalInfo.nickname}
        </span>
      {/if}
      <div class="flex flex-wrap gap-1 mt-2 justify-center">
        {#each personalInfo.roles as role, idx}
          <span class="text-xs uppercase font-hand font-bold tracking-wider px-2 py-0.5 rounded shadow-sm
                       {idx % 2 === 0 ? 'bg-yellow-100/90 border border-yellow-400/80 rotate-1' : 'bg-sky-100/90 border border-sky-400/80 rotate--1'}">
            {role}
          </span>
        {/each}
      </div>
    </div>
  </div>

  <hr class="border-dashed border-slate-350" />

  <!-- Contacts info - Directly visible -->
  <div class="flex flex-col gap-4">
    <h3 class="text-sm font-hand font-bold uppercase tracking-wider text-slate-600">Coordonnées</h3>
    
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-white border-2 border-slate-700 flex items-center justify-center text-[var(--marker-color)] shrink-0 border-sketch">
        <Papicon icon="mail" size={16} />
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-xs font-hand uppercase text-slate-500 font-bold">Email</p>
        <a href="mailto:{personalInfo.email}" class="text-base font-hand text-slate-800 hover:text-[var(--marker-color)] hover:underline transition-colors block truncate">
          {personalInfo.email}
        </a>
      </div>
    </div>
  </div>

  <hr class="border-dashed border-slate-350" />

  <!-- Alternance Status Card (Styled as a post-it pinned inside the sheet) -->
  {#if personalInfo.alternance}
    <div class="post-it post-it-yellow rounded-xl p-4 flex gap-3 items-start relative rotate-1 shadow-md border-sketch">
      <div class="tape-torn absolute top-[-7px] left-[32%] w-16 h-4.5 opacity-70"></div>
      <div class="w-8 h-8 rounded-lg bg-white/60 border border-yellow-400 flex items-center justify-center text-slate-750 shrink-0 mt-0.5">
        <Papicon icon="briefcase" size={16} />
      </div>
      <div class="flex-1 min-w-0 z-10 font-hand">
        <h4 class="text-sm font-bold text-slate-900 leading-tight">{personalInfo.alternance.title}</h4>
        <p class="text-xs text-slate-700 mt-1 leading-relaxed font-marker">
          {personalInfo.alternance.description}
        </p>
      </div>
    </div>
    <hr class="border-dashed border-slate-350" />
  {/if}

  <!-- Social links with handdrawn icons -->
  <div class="flex justify-center gap-3 mt-1 mb-2">
    {#if personalInfo.socials.github}
      <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" 
         class="w-10 h-10 rounded-lg bg-white border-2 border-slate-700 hover:border-[var(--marker-color)] hover:text-[var(--marker-color)] text-slate-700 flex items-center justify-center transition-all border-sketch hover:scale-105"
         title="GitHub">
        <Papicon icon="github" size={20} />
      </a>
    {/if}
    {#if personalInfo.socials.external}
      <a href={personalInfo.socials.external} target="_blank" rel="noopener noreferrer" 
         class="w-10 h-10 rounded-lg bg-white border-2 border-slate-700 hover:border-[var(--marker-color)] hover:text-[var(--marker-color)] text-slate-700 flex items-center justify-center transition-all border-sketch hover:scale-105"
         title="Linktree">
        <Papicon icon="external-link" size={20} />
      </a>
    {/if}
  </div>
</aside>
