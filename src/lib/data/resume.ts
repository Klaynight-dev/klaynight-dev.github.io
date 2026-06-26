export interface TimelineItem {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  url?: string;
  urlLabel?: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; icon?: string; type: 'ion' | 'img' | 'lucide' | 'cdn' }[];
}

export interface KeyCompetence {
  title: string;
  description?: string;
  links: { label: string; url: string }[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Web Development' | 'Web Design' | 'Applications';
  description: string;
  url: string;
  github?: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

// ==========================================
// CENTRAL PORTFOLIO PERSONAL CONFIGURATION
// ==========================================
export const personalInfo = {
  name: "Elouan Passereau",
  nickname: "Klaynight",
  roles: ["Dev Web", "Dev App"],
  boardSubtitle: "Tableau Blanc de Dev",
  birthDate: "2006-06-30",
  email: "night.psr@gmail.com",
  phone: "+33 7 69 36 67 22",
  location: "Bretagne, France",
  mapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1364720.3214410418!2d-4.397523376645492!3d48.08188428416249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4811ca61ae7e8eaf%3A0x10ca5cd36df24b0!2sBretagne!5e0!3m2!1sfr!2sfr!4v1744028849710!5m2!1sfr!2sfr",
  alternance: {
    title: "Alternance recherchée !",
    description: "Disponible pour un BUT Informatique en alternance dans le développement d'applications web ou mobiles."
  },
  socials: {
    github: "https://github.com/Klaynight-dev",
    external: "https://me.klaynight.fr"
  }
};

export const biography = [
  "Je suis un développeur web et d'applications passionné par la création, le design et le développement technique. Depuis mon plus jeune âge, j'ai développé ma curiosité informatique en commençant par des projets visuels, puis j'ai appris le développement web en autodidacte à partir de 2018 (HTML, CSS, JS).",
  "En 2024, j'ai rejoint l'IUT de Lannion en BUT Informatique pour consolider mes bases théoriques et pratiques dans le développement d'applications web et mobiles complexes. J'administre également mon propre nom de domaine klaynight.fr que j'utilise pour déployer et tester mes projets personnels."
];

export const services = [
  {
    title: "Design Web",
    description: "Création de maquettes interactives et d'interfaces utilisateur modernes et engageantes sur Figma.",
    tapeColor: "tape-pink"
  },
  {
    title: "Développement Web",
    description: "Intégration d'applications web modernes réactives en utilisant les frameworks actuels (Svelte, Vite).",
    tapeColor: "tape-green"
  },
  {
    title: "Développement App",
    description: "Développement d'outils et de logiciels de gestion performants avec interface graphique en Java/C/Python.",
    tapeColor: "tape-orange"
  }
];

export const testimonials = [
  {
    name: "Paco PICARD",
    role: "Collaborateur",
    avatar: "https://cdn.simpleicons.org/postgresql/4169E1",
    text: "J'ai embauché Elouan pour travailler avec moi sur mon agrégateur de liens, et j'ai pu constater son sens de l'humanisme ainsi que son esprit d'équipe. Si vous choisissez de lui confier des tâches, vous pouvez être certain que le travail sera effectué avec soin et, surtout, de manière excellente."
  },
  {
    name: "Cédric RIOU",
    role: "Ingénieur en développement LABOCEA",
    avatar: "https://www.labocea.fr/wp-content/uploads/2024/08/LABOCEA-logo-laboratoire-analyse.svg",
    text: "Elouan apporte de la fraîcheur dans nos pratiques et de l'efficacité. Il est bénéfique pour le projet MyData et plus généralement LABOCEA."
  },
  {
    name: "Fabien RAULIC",
    role: "Chef de Projet MyData · LABOCEA",
    avatar: "https://www.labocea.fr/wp-content/uploads/2024/08/LABOCEA-logo-laboratoire-analyse.svg",
    text: "Travaillant étroitement avec Elouan sur les aspects design et parcours utilisateurs. Les compétences d'Elouan lui ont permis d'acquérir une bonne connaissance du contexte fonctionnel de My Data. Son implication a apporté un plus non négligeable au projet, à la structure et aux utilisateurs."
  }
];

export const education: TimelineItem[] = [
  {
    title: "Institut Universitaire Technologique de Lannion",
    subtitle: "BUT Informatique (Parcours A : Dével. Web/Mobile)",
    date: "2024 - Aujourd'hui",
    description: "Bachelor Universitaire de Technologie en Informatique, axé sur l'apprentissage pratique du développement web et mobile, des structures de données, et de l'architecture logicielle."
  },
  {
    title: "Lycée Eugène Freyssinet de Saint Brieuc",
    subtitle: "Baccalauréat Spécialité NSI & SES",
    date: "2021 - 2024",
    description: "Baccalauréat général obtenu avec mention. Options choisies : Numérique et Sciences de l'Informatique (NSI) et Sciences Économiques et Sociales (SES)."
  }
];

export const experiences: TimelineItem[] = [
  {
    title: "plinkk.fr",
    subtitle: "Créateur & Développeur Principal",
    date: "2025 — Aujourd'hui",
    description: "Conception, développement et maintenance d'un service d'agrégation de liens thémable en temps réel, déployé avec Bun, EJS et TypeScript.",
    url: "https://github.com/Klaynight-dev/links_website_template",
    urlLabel: "Repository GitHub"
  },
  {
    title: "Chef de Projet HubGames",
    subtitle: "Gestion de projet & Développement",
    date: "2020 — Aujourd'hui",
    description: "Regroupement et développement d'une suite de jeux web et d'applications utilitaires en équipe.",
    url: "https://hubgames.klaynight.fr",
    urlLabel: "Visiter HubGames"
  },
  {
    title: "Jobi - Gestion",
    subtitle: "Développeur Application (En pause)",
    date: "2021 - 2024",
    description: "Développement d'une application Java Desktop (Swing/SQL) de gestion de stocks pour les librairies, intégrant le suivi des clients et emprunts.",
    url: "https://github.com/Klaynight-dev/stock_gestion_library",
    urlLabel: "Code Source Jobi"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frameworks & Langages Web",
    skills: [
      { name: "Svelte / SvelteKit", icon: "svelte", type: "cdn" },
      { name: "TypeScript", icon: "typescript", type: "cdn" },
      { name: "Angular", icon: "angular", type: "cdn" },
      { name: "Next.js", icon: "nextdotjs", type: "cdn" },
      { name: "HTML5", icon: "html5", type: "cdn" },
      { name: "CSS3", icon: "css", type: "cdn" },
      { name: "JavaScript", icon: "javascript", type: "cdn" },
      { name: "TailwindCSS", icon: "tailwindcss", type: "cdn" },
      { name: "Bootstrap", icon: "bootstrap", type: "cdn" }
    ]
  },
  {
    name: "Backend & Bases de Données",
    skills: [
      { name: "Bun", icon: "bun", type: "cdn" },
      { name: "Prisma ORM", icon: "prisma", type: "cdn" },
      { name: "Drizzle ORM", icon: "drizzle", type: "cdn" },
      { name: "Node.js", icon: "nodedotjs", type: "cdn" },
      { name: "PostgreSQL", icon: "postgresql", type: "cdn" },
      { name: "MySQL", icon: "mysql", type: "cdn" },
      { name: "SQL", icon: "sql.png", type: "img" },
      { name: "PHP", icon: "php", type: "cdn" },
      { name: "PHPMyAdmin", icon: "phpmyadmin", type: "cdn" }
    ]
  },
  {
    name: "Cloud, DevOps & Réseaux",
    skills: [
      { name: "Cloudflare", icon: "cloudflare", type: "cdn" },
      { name: "Docker", icon: "docker", type: "cdn" },
      { name: "GitHub Actions", icon: "githubactions", type: "cdn" },
      { name: "Gestion DNS", icon: "globe", type: "lucide" },
      { name: "GitHub", icon: "github", type: "cdn" },
      { name: "Réseau / Infrastructure", icon: "server", type: "lucide" },
      { name: "Cisco Packet Tracer", icon: "cisco", type: "cdn" }
    ]
  },
  {
    name: "Langages Applicatifs",
    skills: [
      { name: "Java", icon: "java.png", type: "img" },
      { name: "Python", icon: "Python.png", type: "img" },
      { name: "C (langage)", icon: "c.png", type: "img" },
      { name: "Assembleur", icon: "code", type: "lucide" }
    ]
  },
  {
    name: "Design & Outils",
    skills: [
      { name: "Figma", icon: "figma", type: "cdn" },
      { name: "Canva", icon: "https://cdn.jsdelivr.net/npm/simple-icons@14.0.0/icons/canva.svg", type: "cdn" },
      { name: "GlooMaps", icon: "map-pin", type: "lucide" },
      { name: "Suite Microsoft Office", icon: "https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/microsoft.svg", type: "cdn" },
      { name: "Scene Builder", icon: "layout", type: "lucide" },
      { name: "Visual Paradigm", icon: "layers", type: "lucide" },
      { name: "Git", icon: "git", type: "cdn" }
    ]
  }
];

export const keyCompetences: KeyCompetence[] = [
  {
    title: "Réaliser un développement d'application",
    links: [
      { label: "Console Linux Web", url: "https://github.com/Klaynight-dev/links_website_template" },
      { label: "Plinkk Open Source", url: "https://github.com/Klaynight-dev/plinkk" }
    ]
  },
  {
    title: "Optimiser des applications informatiques",
    links: [
      { label: "Snake Auto", url: "https://github.com/Klaynight-dev/Snake_Auto" }
    ]
  },
  {
    title: "Administrer des systèmes complexes",
    links: [
      { label: "Installation réseau", url: "#" }
    ]
  },
  {
    title: "Gérer des données de l'information",
    links: [
      { label: "Création Base de Données", url: "#" }
    ]
  },
  {
    title: "Conduite de projet",
    links: [
      { label: "Projet HubGames", url: "https://github.com/TheHubGames/hub_games" }
    ]
  },
  {
    title: "Travailler dans une équipe informatique",
    links: [
      { label: "Projet HubGames", url: "https://github.com/TheHubGames/hub_games" }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "sae-cobrec",
    title: "SAE Cobrec",
    category: "Web Development",
    description: "Projet universitaire collaboratif pour la SAE Cobrec. Une entreprise fictive qui commande un site nommé 'Alizon' qui est une marketplace qui met en relation des producteurs locaux Bretons avec des consommateurs. Devleloppement du Front Office et du Back Office avec gestion de base de données et outils de visualisation de données.",
    url: "https://github.com/SAE-COBREC/main",
    github: "https://github.com/SAE-COBREC/main",
    image: "icon-app.svg",
    tags: ["PHP", "JavaScript", "SQL", "BUT Informatique"],
    featured: true
  },
  {
    id: "plinkk-fr",
    title: "Plinkk.fr",
    category: "Web Development",
    description: "Service de centralisation de liens personnalisé et hébergé en France, offrant des thèmes et des animations avancées.",
    url: "https://plinkk.fr",
    github: "https://github.com/Klaynight-dev/links_website_template",
    image: "plinkk.png",
    tags: ["EJS", "Bun", "TypeScript", "Tailwind"],
    featured: true
  },
  {
    id: "papicon-design",
    title: "Design Icônes Papicon",
    category: "Web Design",
    description: "Création et design de la bibliothèque d'icônes personnalisées 'Papicon' réalisée sur Figma pour le projet Papillon.",
    url: "https://www.figma.com/design/xjPgRmLmqtR16vWkyuXaon/Untitled?node-id=0-1&p=f&t=AeEWavMzmH3kWmqO-0",
    image: "icon-design.svg",
    tags: ["Figma", "UI/UX", "Design System", "Iconography"],
    featured: true
  },
  {
    id: "synapsejs",
    title: "SynapseJS",
    category: "Web Development",
    description: "Framework JavaScript performant et orienté événements pour la création rapide d'applications web et bots Discord.",
    url: "https://synapsejs.klaynight.fr",
    github: "https://github.com/Klaynight-dev/SynapseJS",
    image: "MySQL.svg",
    tags: ["TypeScript", "Node.js", "WebSocket", "Framework"],
    featured: true
  },
  {
    id: "kotbo-fr",
    title: "kotbo.fr",
    category: "Web Development",
    description: "Site officiel et centre de contrôle complet pour Kotbo, le bot de gestion de communauté Discord.",
    url: "https://kotbo.fr",
    image: "icon-app.svg",
    tags: ["Svelte", "TailwindCSS", "Bun", "Vite"],
    featured: true
  },
  {
    id: "hubgames",
    title: "HubGames",
    category: "Web Development",
    description: "Projet personnel regroupant divers jeux et applications développés pour le web (Mini-jeux, outils).",
    url: "https://hubgames.klaynight.fr",
    github: "https://github.com/TheHubGames/hub_games",
    image: "HubGames.jpeg",
    tags: ["JavaScript", "HTML5", "CSS3", "PHP"],
    featured: false
  },
  {
    id: "jobi",
    title: "Jobi",
    category: "Applications",
    description: "Application de gestion de stock, de clients et d'emprunts natifs pour les librairies.",
    url: "https://github.com/Klaynight-dev/stock_gestion_library",
    github: "https://github.com/Klaynight-dev/stock_gestion_library",
    image: "Jobi.png",
    tags: ["Java", "SQL", "Swing", "Database"],
    featured: false
  },
  {
    id: "jo-surf",
    title: "Site JO de Surf",
    category: "Web Development",
    description: "Conception UI/UX sur Figma puis développement d'un site web interactif dédié aux épreuves de surf des Jeux Olympiques de Paris.",
    url: "https://klaynight.fr/JO_Website_project/",
    github: "https://github.com/klaynight-dev/JO_Website_project/",
    image: "DA Site JO.png",
    tags: ["HTML", "CSS", "JavaScript", "Figma", "Responsive"],
    featured: false
  },
  {
    id: "plinkk-os",
    title: "Plinkk (Open Source)",
    category: "Web Development",
    description: "Modèle de page de profil personnalisé open-source, ancêtre de plinkk.fr.",
    url: "https://github.com/Klaynight-dev/links_website_template",
    github: "https://github.com/Klaynight-dev/links_website_template",
    image: "plinkk.png",
    tags: ["HTML", "CSS", "JavaScript"],
    featured: false
  }
];
