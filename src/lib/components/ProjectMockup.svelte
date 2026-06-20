<script lang="ts">
  let { category = "" }: { category?: string } = $props();
</script>

{#if category === "Web Development"}
  <!-- Whiteboard Browser Mockup SVG -->
  <svg viewBox="0 0 200 120" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <!-- Outer window border -->
    <rect x="5" y="5" width="190" height="110" rx="8" fill="#ffffff" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-800" />
    <!-- Header bar line -->
    <line x1="5" y1="25" x2="195" y2="25" stroke="currentColor" stroke-width="2" class="text-slate-800" />
    <!-- Window buttons -->
    <circle cx="15" cy="15" r="3.5" fill="#dc2626" />
    <circle cx="27" cy="15" r="3.5" fill="#eab308" />
    <circle cx="39" cy="15" r="3.5" fill="#15803d" />
    <!-- Address bar -->
    <rect x="55" y="9" width="90" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" class="text-slate-400" />
    <!-- Address bar text line -->
    <line x1="62" y1="15" x2="95" y2="15" stroke="currentColor" stroke-width="1.2" class="text-slate-350" />
    
    <!-- Content Mockup (Whiteboard sketchy style) -->
    <!-- Main image block (highlighted in marker blue) -->
    <rect x="15" y="38" width="60" height="50" rx="4" fill="rgba(29, 78, 216, 0.08)" stroke="currentColor" stroke-width="2" stroke-dasharray="3,3" class="text-blue-600" />
    <!-- Diagonal lines in image box -->
    <line x1="15" y1="38" x2="75" y2="88" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2,2" class="text-blue-600 opacity-60" />
    <!-- Title text line -->
    <line x1="85" y1="46" x2="175" y2="46" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="text-slate-850" />
    <!-- Paragraph lines -->
    <line x1="85" y1="58" x2="185" y2="58" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-slate-500" />
    <line x1="85" y1="68" x2="170" y2="68" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-slate-500" />
    <line x1="85" y1="78" x2="180" y2="78" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-slate-500" />
    
    <!-- Mini button -->
    <rect x="135" y="92" width="45" height="15" rx="3" fill="rgba(234, 179, 8, 0.2)" stroke="currentColor" stroke-width="2" class="text-yellow-600" />
    <line x1="145" y1="99" x2="170" y2="99" stroke="currentColor" stroke-width="1.5" class="text-yellow-700" />
  </svg>
{:else}
  <!-- Applications & Web Design Mockups -->
  {#if category === "Web Design"}
    <!-- Whiteboard Figma Canvas Mockup SVG -->
    <svg viewBox="0 0 200 120" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <!-- Background grids (design layout style) -->
      <path d="M 0,20 L 200,20 M 0,40 L 200,40 M 0,60 L 200,60 M 0,80 L 200,80 M 0,100 L 200,100 M 20,0 L 20,120 M 40,0 L 40,120 M 60,0 L 60,120 M 80,0 L 80,120 M 100,0 L 100,120 M 120,0 L 120,120 M 140,0 L 140,120 M 160,0 L 160,120 M 180,0 L 180,120" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="1" />
      
      <!-- Canvas board border -->
      <rect x="5" y="5" width="190" height="110" rx="4" fill="#ffffff" stroke="currentColor" stroke-width="2.5" class="text-slate-800" />
      
      <!-- Sketchy shapes -->
      <!-- Circle shape -->
      <circle cx="65" cy="55" r="25" fill="rgba(244, 63, 94, 0.08)" stroke="currentColor" stroke-width="2" class="text-rose-600" />
      <!-- Overlapping rectangle -->
      <rect x="85" y="45" width="65" height="45" rx="2" fill="rgba(34, 197, 94, 0.08)" stroke="currentColor" stroke-width="2" stroke-dasharray="4,2" class="text-green-600" />
      
      <!-- Figma ruler markings on top and left -->
      <line x1="5" y1="12" x2="195" y2="12" stroke="currentColor" stroke-width="1.2" class="text-slate-400" />
      <line x1="12" y1="5" x2="12" y2="115" stroke="currentColor" stroke-width="1.2" class="text-slate-400" />
      
      <!-- Mouse Cursor -->
      <path d="M 120,70 L 132,92 L 124,96 L 112,74 L 105,82 L 108,55 Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" class="text-blue-600" />
      
      <!-- Selected border markers -->
      <rect x="82" y="42" width="6" height="6" fill="#fff" stroke="currentColor" stroke-width="1.5" class="text-green-600" />
      <rect x="147" y="42" width="6" height="6" fill="#fff" stroke="currentColor" stroke-width="1.5" class="text-green-600" />
      <rect x="82" y="87" width="6" height="6" fill="#fff" stroke="currentColor" stroke-width="1.5" class="text-green-600" />
      <rect x="147" y="87" width="6" height="6" fill="#fff" stroke="currentColor" stroke-width="1.5" class="text-green-600" />
    </svg>
  {:else}
    <!-- Whiteboard Terminal/Code Editor Mockup SVG (for Applications) -->
    <svg viewBox="0 0 200 120" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer console frame -->
      <rect x="5" y="5" width="190" height="110" rx="6" fill="#1e293b" stroke="currentColor" stroke-width="2.5" class="text-slate-800" />
      <!-- Header bar -->
      <line x1="5" y1="23" x2="195" y2="23" stroke="currentColor" stroke-width="2" class="text-slate-700" />
      <!-- Control buttons -->
      <circle cx="15" cy="14" r="2.5" fill="#ef4444" />
      <circle cx="23" cy="14" r="2.5" fill="#eab308" />
      <circle cx="31" cy="14" r="2.5" fill="#22c55e" />
      <!-- Console title -->
      <text x="100" y="16" fill="#94a3b8" font-family="monospace" font-size="7" text-anchor="middle">terminal@klaynight: ~</text>
      
      <!-- Code lines -->
      <!-- Prompt line -->
      <text x="15" y="40" fill="#38bdf8" font-family="monospace" font-weight="bold" font-size="10">&gt;_</text>
      <!-- Command -->
      <line x1="35" y1="36" x2="85" y2="36" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" />
      
      <!-- Code lines represented by colored sketch lines -->
      <line x1="15" y1="52" x2="55" y2="52" stroke="#4ade80" stroke-width="2" stroke-linecap="round" />
      <line x1="60" y1="52" x2="110" y2="52" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" />
      
      <line x1="25" y1="64" x2="95" y2="64" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />
      <line x1="100" y1="64" x2="135" y2="64" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" />
      
      <line x1="25" y1="76" x2="70" y2="76" stroke="#fb923c" stroke-width="2" stroke-linecap="round" />
      
      <line x1="15" y1="88" x2="65" y2="88" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" />
      <line x1="70" y1="88" x2="105" y2="88" stroke="#4ade80" stroke-width="2" stroke-linecap="round" />

      <!-- Cursor block -->
      <rect x="110" y="82" width="6" height="9" fill="#38bdf8" />
    </svg>
  {/if}
{/if}
