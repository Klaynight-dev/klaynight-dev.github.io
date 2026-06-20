<script lang="ts">
  import { Papicons } from "@getpapillon/papicons";
  import * as LucideIcons from "lucide-svelte";

  let { 
    icon = "", 
    size = 24, 
    class: className = "" 
  }: { 
    icon?: string; 
    size?: number; 
    class?: string; 
    children?: import('svelte').Snippet;
  } = $props();

  const fallbackIconName = "Grid";

  const iconAliases: Record<string, string> = {
    "alert-triangle": "AlertTriangle",
    "gavel": "Gavel",
    "policy": "Lock",
    "admin_panel_settings": "Lock",
    "book": "Paper",
    "settings": "Gears",
    "search": "Search",
    "chartlineup": "TrendingUp",
    "chatcircledots": "MessageCircle",
    "microphone": "Mic",
    "usersfour": "Users",
    "shieldwarning": "ShieldAlert",
    "shieldcheck": "ShieldCheck",
    "mailopen": "MailOpen",
    "chartpieslice": "PieChart",
    "lightning": "Zap",
    "alert-octagon": "AlertOctagon",
    "close": "Cross",
    "x": "Cross",
    "delete": "Trash",
    "edit": "Pen",
    "forum": "TextBubble",
    "check_circle": "Check",
    "cancel": "Add",
    "error": "AlertCircle",
    "warning": "AlertTriangle",
    "info": "Info",
    "help": "Info",
    "notifications": "Bell",
    "mail": "Mail",
    "person": "User",
    "group": "User",
    "add": "Plus",
    "remove": "Minus",
    "arrow_forward": "ArrowRight",
    "arrow_back": "ArrowLeft",
    "expand_more": "ChevronDown",
    "expand_less": "ChevronUp",
    "chevron_right": "ChevronRight",
    "chevron_left": "ChevronLeft",
    "menu": "Menu",
    "more_vert": "Menu",
    "more_horiz": "Menu",
    "refresh": "Gears",
    "sync": "Gears",
    "cloud_upload": "ArrowUp",
    "cloud_download": "ArrowDown",
    "visibility": "Camera", // No Eye in Papicons
    "visibility_off": "Camera",
    "lock": "Lock",
    "lock_open": "Unlock",
    "key": "Lock",
    "terminal": "Code",
    "code": "Code",
    "database": "Grid",
    "server": "Gears",
    "history": "Clock",
    "timer": "Clock",
    "schedule": "Calendar",
    "event": "Calendar",
    "dashboard": "Grid",
    "analytics": "Grades",
    "pie_chart": "Pie",
    "show_chart": "ArrowRightUp",
    "star": "Star",
    "favorite": "Heart",
    "thumb_up": "Check",
    "thumb_down": "Minus",
    "share": "ExternalLink",
    "download": "ArrowDown",
    "upload": "ArrowUp",
    "link": "Link",
    "logout": "Logout",
    "login": "Login",
    "account_circle": "User",
    "verified": "Check",
    "verified_user": "User",
    "shield": "Lock",
    "security": "Lock",
    "block": "UserCross",
    "robot": "Gears",
    "robot_2": "Gears",
    "bot": "Gears",
    "person_add_disabled": "UserCross",
    "how_to_reg": "User",
    "chat": "TextBubble",
    "message-square": "TextBubble",
    "external-link": "ExternalLink",
    "trash": "Trash",
    "trash-2": "Trash",
    "edit-2": "Pen",
    "plus": "Plus",
    "plus-circle": "Plus",
    "minus-circle": "Minus",
    "alert-circle": "AlertCircle",
    "help-circle": "Info",
    "bell": "Bell",
    "bell-off": "Bell",
    "calendar": "Calendar",
    "clock": "Clock",
    "user": "User",
    "users": "User",
    "user-plus": "User",
    "user-minus": "UserCross",
    "file-text": "Paper",
    "copy": "Paper",
    "save": "Paper",
    "refresh-cw": "Gears",
    "refresh-ccw": "Gears",
    "loader": "Gears",
    "loader-2": "Gears",
    "activity": "Grades",
    "trending-up": "ArrowRightUp",
    "trending-down": "ArrowRightDown",
    "pie-chart": "Pie",
    "bar-chart": "Grades",
    "bar-chart-2": "Grades",
    "layers": "Grid",
    "grid": "Grid",
    "command": "Code",
    "cpu": "Gears",
    "hard-drive": "Grid",
    "layout": "Grid",
    "image": "Gallery",
    "video": "Gallery",
    "music": "Gallery",
    "mic": "Gallery",
    "volume-2": "Gallery",
    "volume-x": "Gallery",
    "camera": "Camera",
    "eye": "Camera",
    "eye-off": "Camera",
    "globe": "Globe",
    "map-pin": "MapPin",
    "navigation": "MapPin",
    "phone": "Phone",
    "send": "ArrowRightUp",
    "log-out": "Logout",
    "log-in": "Login",
    "arrow-down": "ArrowDown",
    "arrow-up": "ArrowUp",
    "arrow-left": "ArrowLeft",
    "arrow-right": "ArrowRight",
    "crosshair": "Plus",
    "maximize": "ArrowRightUpBox",
    "minimize": "ArrowLeftDownBox",
    "circle": "Placeholder",
    "square": "Placeholder",
    "triangle": "Placeholder",
    "crown": "Crown",
    "moon": "Moon",
    "sun": "Sun",
    "cloud": "Placeholder",
    "zap": "Sparkles",
    "sparkles": "Sparkles",
    "edit-3": "Pen",
    "clipboard": "Paper",
    "book-open": "Paper",
    "bookmark": "Bookmark",
    "tag": "Bookmark",
    "hash": "Bookmark",
    "gift": "Placeholder",
    "shopping-bag": "Placeholder",
    "shopping-cart": "Placeholder",
    "credit-card": "Card",
    "wallet": "Card",
    "dollar-sign": "Placeholder",
    "euro-sign": "Placeholder",
    "github": "Butterfly",
    "twitter": "Butterfly",
    "facebook": "Butterfly",
    "instagram": "Gallery",
    "linkedin": "User",
    "slack": "TextBubble",
    "youtube": "Gallery",
    "twitch": "Gallery",
    "box": "Grid",
    "flag": "Bookmark",
    "hammer": "Gears",
    "wrench": "Gears",
    "briefcase": "Paper",
    "tool": "Gears",
    "gears": "Gears",
    "cog": "Gears",
    "coffee": "Placeholder",
    "utility-pole": "Placeholder",
    "pending_actions": "Clock",
    "rss_feed": "Globe",
    "extension": "Grid",
    "hub": "ExternalLink",
    "bolt": "Sparkles",
    "api": "Code",
    "bug_report": "Alert",
    "notifications_active": "Bell",
    "discord": "Butterfly"
  };

  // List of available Papicons to avoid library error logs
  const availablePapicons = new Set([
    "Accessibility", "Add", "AlertCircle", "AlertTriangle", "Alert", "Apple", "Archive",
    "ArrowDownBox", "ArrowDown", "ArrowLeftBox", "ArrowLeftDownBox", "ArrowLeftDown",
    "ArrowLeftUpBox", "ArrowLeftUp", "ArrowLeft", "ArrowRightBox", "ArrowRightDownBox",
    "ArrowRightDown", "ArrowRightUpBox", "ArrowRightUp", "ArrowRight", "ArrowUpBox",
    "ArrowUp", "Bell", "Bold", "Bookmark", "Bus", "Butterfly", "Calendar", "Camera",
    "Card", "Chair", "Check", "ChevronDown", "ChevronLeft", "ChevronRight", "ChevronUp",
    "Clock", "Code", "Coefficient", "ColorTheme", "Cross", "Crown", "Cutlery",
    "Ecoledirecte", "Emoji", "ExternalLink", "Filter", "Font", "Gallery", "Gears",
    "Ghost", "GlobeCross", "Globe", "Grades", "GraduationHat", "Grid", "Heart",
    "Home", "InfoBox", "Info", "Link", "List", "Lock", "Login", "Logout", "Mail",
    "MapPin", "Menu", "Metro", "Minus", "Moon", "Newspaper", "Palette", "Paper",
    "PapillonApp", "PapillonIcon", "Password", "PenAlt", "Pen", "Phone", "Pie",
    "PiggyBank", "Pillar", "Placeholder", "Plus", "PrivatePapillonApp", "PrivatePapillonIcon",
    "Pronote", "QrCode", "Search", "Skolengo", "Sparkles", "Star", "Sun", "Sunrise",
    "Tasks", "TextBubble", "Trash", "Underline", "Unlock", "UserCross", "User", "Walk"
  ]);

  function toPapiconsName(value: unknown) {
    const normalized = typeof value === "string" ? value.trim() : "";
    if (!normalized) return fallbackIconName;

    const lower = normalized.toLowerCase();
    if (iconAliases[lower]) return iconAliases[lower];

    // Handle snake_case to PascalCase
    return normalized
      .split(/[\s_-]+/)
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
      .join("");
  }

  function unwrapReactComponent(node: any) {
    if (!node) return null;
    let current = node;
    let depth = 0;

    while (current && typeof current.type === "function" && depth < 5) {
      current = current.type(current.props || {});
      depth += 1;
    }

    return current;
  }

  function flattenChildren(children: any) {
    if (children == null) return [];
    const stack = Array.isArray(children) ? [...children] : [children];
    const flattened = [];

    while (stack.length > 0) {
      const child = stack.shift();
      if (Array.isArray(child)) {
        stack.unshift(...child);
      } else if (child != null && typeof child === "object") {
        flattened.push(child);
      }
    }

    return flattened;
  }

  const safeIcon = $derived(typeof icon === "string" ? icon : "");
  const iconName = $derived(toPapiconsName(safeIcon));
  const isPapiconAvailable = $derived(availablePapicons.has(iconName));
  
  // Lucide fallback logic
  const lucideIconName = $derived(iconName); // Already PascalCase
  const LucideComponent = $derived((LucideIcons as any)[lucideIconName] || (LucideIcons as any)[safeIcon] || LucideIcons.HelpCircle);

  const reactIcon = $derived.by(() => {
    if (!isPapiconAvailable || !iconName) return null;
    try {
      return unwrapReactComponent(Papicons({ name: iconName, size, className }));
    } catch {
      return null;
    }
  });
  const svgProps = $derived(reactIcon?.props || {});
  const svgChildren = $derived(flattenChildren(svgProps.children));

</script>

{#if isPapiconAvailable && reactIcon}
  <svg
    width={svgProps.width ?? size}
    height={svgProps.height ?? size}
    viewBox={svgProps.viewBox ?? "0 0 24 24"}
    fill={svgProps.fill ?? "none"}
    xmlns="http://www.w3.org/2000/svg"
    class={className}
  >
    {#each svgChildren as child}
      {#if child.type === 'path'}
        <path
          d={child.props?.d}
          fill={child.props?.fill ?? "currentColor"}
          fill-rule={child.props?.fillRule}
          clip-rule={child.props?.clipRule}
        />
      {:else}
        {@const Tag = child.type}
        <Tag 
          {...child.props} 
          fill={child.props?.fill ?? (['line', 'polyline', 'polygon'].includes(child.type) ? 'none' : 'currentColor')}
        />
      {/if}
    {/each}
  </svg>
{:else}
  <LucideComponent size={size} class={className} stroke-width={2.5} />
{/if}
