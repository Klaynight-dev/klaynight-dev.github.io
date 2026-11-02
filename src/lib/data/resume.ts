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
  /** Domaine de couleur (voir domains.ts) — associe la carte à sa teinte dans la palette. */
  domain: import('./domains').Domain;
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
  /** Nom de fichier d'un visuel reel, chaine vide si le projet n'en a pas encore. */
  image: string;
  /** Alternative textuelle du visuel, obligatoire des que `image` est renseigne. */
  imageAlt?: string;
  tags: string[];
  featured?: boolean;
  /**
   * Format de tuile dans la galerie. Decoule du contenu a montrer :
   * `wide` pour les projets qui ont une interface large a lire,
   * `tall` pour les pieces graphiques au format portrait.
   */
  tile?: 'wide' | 'tall';
  /** Role tenu sur le projet, affiche en tete de l'etude de cas. */
  role?: string;
  period?: string;
  /** Chiffres tires de l'historique git du depot. */
  stats?: { label: string; value: string }[];
  /** Recit de l'etude de cas ; les paragraphes de `body` sont separes par une ligne vide. */
  sections?: { title: string; body: string; image?: string; imageAlt?: string; caption?: string }[];
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
  email: "elouanpassereau@gmail.com",
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

export const services: {
  title: string;
  description: string;
  domain: import('./domains').Domain;
  /** Capture d'un vrai projet, nom de fichier dans assets/images. */
  visual: string;
  visualAlt: string;
  /** Projets qui illustrent ce savoir-faire, par id. */
  projectIds: string[];
}[] = [
  {
    title: "Développement Web",
    description: "Des applications web complètes, de l'interface en Svelte au back en Bun et PostgreSQL, conteneurisées et déployées sur mes propres serveurs.",
    domain: "webdev",
    visual: "tafac-notes.webp",
    visualAlt: "Page Mes notes de Tafac : moyenne générale, UE validées et dernières notes.",
    projectIds: ["kotbo-fr", "humanitour", "openforms", "tafac"]
  },
  {
    title: "Design Web",
    description: "Maquettes interactives, systèmes de composants et iconographie sur Figma, pensés pour être intégrés tels quels.",
    domain: "design",
    visual: "papicons-sheet.svg",
    visualAlt: "Planche d'icônes Papicons dessinées sur grille 24 px.",
    projectIds: ["papicon-design", "sae-cobrec-design", "affiches-design"]
  },
  {
    title: "Développement App",
    description: "Logiciels de bureau et outils de gestion avec interface graphique, en Java, C ou Python.",
    domain: "apps",
    visual: "Jobi.png",
    visualAlt: "Fenêtre Jobi affichant la table de gestion du stock.",
    projectIds: ["jobi"]
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
    title: "Institut Universitaire de Technologie",
    subtitle: "BUT Informatique (Parcours A : Dével. Web/Mobile)",
    date: "2024 - Aujourd'hui",
    description: "Bachelor Universitaire de Technologie en Informatique, axé sur l'apprentissage pratique du développement web et mobile, des structures de données, et de l'architecture logicielle."
  },
  {
    title: "Lycée Général",
    subtitle: "Baccalauréat Spécialité NSI & SES",
    date: "2021 - 2024",
    description: "Baccalauréat général obtenu avec mention. Options choisies : Numérique et Sciences de l'Informatique (NSI) et Sciences Économiques et Sociales (SES)."
  }
];

export const experiences: TimelineItem[] = [
  {
    title: "Ingénieur Full Stack",
    subtitle: "Labocéa · Stage puis CDD · Ploufragan",
    date: "Avr. 2026 - Août 2026",
    description: "Développement de MyData en ingénierie de production : remise en état de plus de 60 % du code déprécié, site 10 à 24 fois plus rapide et base de code allégée de 4 Mo à 1,3 Mo. Optimisation de l'application mobile, intégration de nouvelles technologies et mise en place de tests automatisés. Stage prolongé en CDD à l'issue de la mission."
  },
  {
    title: "Livreur",
    subtitle: "Amazon",
    date: "Juin 2025 - Août 2025",
    description: "Mission saisonnière de trois mois en livraison de colis."
  },
  {
    title: "Responsable de labyrinthe",
    subtitle: "La ferme de Sous la Ville · CDD · Lantic",
    date: "Juin 2024 - Août 2024",
    description: "Entretien du site, vente des entrées, animation et gestion des ventes annexes. Création d'animations ludiques pour les visiteurs, gestion des stocks et entretien des espaces de jeu ainsi que de l'escape game."
  },
  {
    title: "plinkk.fr",
    subtitle: "Créateur & Développeur Principal",
    date: "2025 - Aujourd'hui",
    description: "Conception, développement et maintenance d'un service d'agrégation de liens thémable en temps réel, déployé avec Bun, EJS et TypeScript.",
    url: "https://github.com/Klaynight-dev/links_website_template",
    urlLabel: "Repository GitHub"
  },
  {
    title: "Chef de Projet HubGames",
    subtitle: "Gestion de projet & Développement",
    date: "2020 - Aujourd'hui",
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
    domain: "webdev",
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
    domain: "backend",
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
    domain: "cloud",
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
    domain: "apps",
    skills: [
      { name: "Java", icon: "java.png", type: "img" },
      { name: "Python", icon: "Python.png", type: "img" },
      { name: "C (langage)", icon: "c.png", type: "img" },
      { name: "Assembleur", icon: "code", type: "lucide" }
    ]
  },
  {
    name: "Design & Outils",
    domain: "design",
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
    id: "humanitour",
    title: "Humanitour",
    category: "Web Development",
    description: "Plateforme du premier institut de sondage citoyen : 4 000 km à vélo, 1 000 personnes interrogées en face-à-face dans les treize régions métropolitaines, et la totalité des données brutes publiée. Explorateur qui croise n'importe quelle question avec n'importe quelle autre, export CSV et JSON, médiathèque et back-office complet.",
    url: "https://humanitour.fr",
    github: "https://github.com/Klaynight-dev/Humanitour_Landing",
    image: "humanitour-accueil.webp",
    imageAlt: "Page d'accueil d'Humanitour : titre « Et si on était enfin écoutés ? », chiffres du tour et photo du vélo chargé devant un pré.",
    tags: ["SvelteKit", "Svelte 5", "Prisma", "PostgreSQL", "ECharts", "Bun", "Docker"],
    featured: true,
    tile: "wide",
    role: "Cofondateur, responsable numérique",
    period: "Depuis septembre 2026",
    stats: [
      { label: "commits", value: "96 / 97" },
      { label: "lignes ajoutées", value: "+115 665" },
      { label: "licence du code", value: "AGPL-3.0" },
      { label: "licence des données", value: "ODbL 1.0" }
    ],
    sections: [
      {
        title: "Le constat",
        body: "Les sondages d'opinion sont presque tous réalisés en ligne, auprès de volontaires rémunérés, par des instituts qui ne publient ni leurs données brutes ni leurs redressements.\n\nAvec l'association, on a pris le problème par l'autre bout : deux mois sur la route, hébergés chez les habitants, pour interroger un échantillon représentatif en face-à-face. Il fallait ensuite un site à la hauteur de cette promesse de transparence, et c'est la partie que je porte.",
        image: "humanitour-tour.webp",
        imageAlt: "Page « Le tour » : titre « Le premier sondage de terrain » et bandeau de chiffres, 4000 kilomètres, 1 000 sondés, 70 % de participation, 50 nuits.",
        caption: "La page du tour, qui raconte le terrain avant de montrer les chiffres."
      },
      {
        title: "Tout est publié",
        body: "L'explorateur de données laisse croiser n'importe quelle variable avec n'importe quelle autre, et chaque résultat se partage par un lien permanent. Les exports CSV et JSON sont accessibles sans compte.\n\nLes garanties sont écrites dans le code plutôt que dans une charte : la non-réponse est une modalité comme une autre, jamais un null filtré ; l'effectif brut accompagne chaque pourcentage ; un redressement, s'il existe, s'affiche à côté du brut ; un seuil de k-anonymat masque les croisements trop fins pour empêcher toute ré-identification.",
        image: "humanitour-donnees.webp",
        imageAlt: "Page « Les données » : titre « Tout est publié. Croisez ce que vous voulez. » et champ de recherche d'enquête.",
        caption: "Point d'entrée de l'explorateur : recherche par enquête ou par question."
      },
      {
        title: "Le back-office",
        body: "Les questionnaires sont collectés par OpenForms, l'outil de formulaires que j'ai écrit pour l'association, puis synchronisés dans la plateforme. Le back-office gère l'import en trois étapes, l'édition des questions, la consultation des réponses, le moteur de redressement (raking réécrit sur des tableaux typés, avec diagnostics de Kish), la newsletter avec double confirmation par mail et l'export des graphiques en affiche PNG."
      }
    ]
  },
  {
    id: "tafac",
    title: "Tafac",
    category: "Web Development",
    description: "Client web alternatif aux ENT universitaires, membre de la famille Papillon : emploi du temps, notes, messagerie, Moodle, menu du CROUS et bus dans une seule application installable. Contributeur principal du back des notes et du planning, et de l'intégration du réseau de bus TILT.",
    url: "https://tafac.fr",
    github: "https://github.com/l-ent-univ/tafac",
    image: "tafac-accueil.webp",
    imageAlt: "Page d'accueil de Tafac : widgets du prochain cours, de la dernière note, des mails récents et des échéances, au-dessus du titre « Ta journée à la fac, en un coup d'œil ».",
    tags: ["React", "Express", "Node.js", "TailwindCSS", "PWA"],
    featured: true,
    tile: "wide",
    role: "Contributeur (back des notes et du planning, bus TILT)",
    period: "Depuis octobre 2026",
    stats: [
      { label: "commits", value: "92" },
      { label: "lignes ajoutées", value: "+29 856" },
      { label: "licence", value: "AGPL-3.0" }
    ],
    sections: [
      {
        title: "Le projet",
        body: "Tafac est né d'un constat partagé par tous les étudiants de l'Université de Rennes : l'emploi du temps, les notes, les mails et Moodle vivent sur quatre sites différents, aucun n'étant pensé pour le téléphone. Le projet est lancé par Tom (tomthings.fr) et fait partie de Papillon ; j'y contribue sur le back et sur les nouvelles fonctionnalités."
      },
      {
        title: "Les notes",
        body: "J'ai écrit la lecture des relevés ScoDoc : relevé par semestre, UE, ressources et SAÉ, message du département, téléchargement du PDF officiel, avec un cache mémoire et un préchargement des semestres pour que la page s'ouvre sans attente.\n\nPar-dessus, un simulateur permet d'ajouter des notes fictives pour voir l'effet sur les moyennes et la validation des UE, sans jamais toucher à ScoDoc.",
        image: "tafac-notes.webp",
        imageAlt: "Section « Suis tes résultats pendant le semestre » : moyenne générale 14,5 sur 20, trois UE validées sur trois et dernières notes.",
        caption: "Mes notes : moyenne, UE validées et dernières évaluations."
      },
      {
        title: "Le planning",
        body: "Côté emploi du temps, j'ai travaillé la lecture d'ADE : détection du groupe TD/TP, majeures, mineures et options ajoutées au groupe, salles libres lues dans la branche Salles, saut au prochain jour de cours.\n\nLes mails de l'université annoncent souvent un cours déplacé ou annulé : des règles locales repèrent ces annonces et marquent le cours concerné directement dans le planning.",
        image: "tafac-planning.webp",
        imageAlt: "Section « Prépare ta semaine de cours » : liste des cours du lendemain avec horaires, salles et menu contextuel « Écrire au sujet de ce cours ».",
        caption: "Planning : cours du jour, salles, enseignants et mail prérempli depuis un cours."
      },
      {
        title: "Bus TILT, CROUS et Moodle",
        body: "J'ai intégré le réseau de bus TILT de Lannion : une page Bus avec les passages et le plan du réseau, les trajets de la semaine calculés à partir du planning, le bus aller et retour affiché dans la fiche d'un cours, et des rappels en notifications push qui ne gardent aucune donnée d'étudiant.\n\nJ'ai aussi proposé et développé le menu du restaurant universitaire (service en direct, une carte par repas) et l'intégration de Moodle avec ses cours, sections et échéances."
      }
    ]
  },
  {
    id: "openforms",
    title: "OpenForms",
    category: "Web Development",
    description: "Alternative auto-hébergeable à Google Forms, développée pour l'association Humanitour. Constructeur de formulaires par glisser-déposer (onze types de champs, validation par regex et bornes), tableur d'administration maison avec formules SUM, AVG, MEDIAN et import/export xlsx, consentement RGPD explicite et chiffrement AES-256-GCM des réponses en base.",
    url: "https://forms.humanitour.fr/",
    github: "https://github.com/Klaynight-dev/Openforms",
    image: "openforms-builder.png",
    imageAlt: "Éditeur de formulaire OpenForms : palette de champs à gauche, formulaire au centre, panneau de configuration du champ à droite.",
    tags: ["SvelteKit", "ElysiaJS", "Prisma", "PostgreSQL", "Bun", "Docker"],
    featured: true,
    tile: "wide",
    role: "Conception et développement",
    period: "Juillet – octobre 2026",
    stats: [
      { label: "commits", value: "126" },
      { label: "types de champs", value: "11" },
      { label: "chiffrement", value: "AES-256-GCM" }
    ],
    sections: [
      {
        title: "Pourquoi un outil maison",
        body: "Humanitour collecte des réponses de citoyens interrogés en face-à-face : les confier à Google Forms n'était pas compatible avec la promesse faite aux répondants. OpenForms s'héberge sur nos serveurs, sans tracker tiers, et chiffre les réponses au repos.",
        image: "openforms-accueil.webp",
        imageAlt: "Page d'accueil d'OpenForms : « Formulaire Humanitour », bouton Espace administration et trois cartes, builder, tableur intégré, RGPD par design.",
        caption: "L'instance de l'association, forms.humanitour.fr."
      }
    ]
  },
  {
    id: "aellyel",
    title: "Aellyel",
    category: "Web Development",
    description: "Hub de découverte de jeux indépendants rangés par humeur plutôt que par genre : bulle cozy, récit poétique, exploration calme, pixel nostalgie. Tirage au sort d'un jeu, notes et commentaires, favoris, liste de souhaits, suggestions de joueurs modérées depuis un back-office.",
    url: "https://aellyel.klaynight.fr/",
    image: "aellyel-accueil.webp",
    imageAlt: "Accueil d'Aellyel : jeu coup de cœur à gauche, nuage d'humeurs en étiquettes colorées à droite.",
    period: "Juin – juillet 2026",
    stats: [{ label: "commits", value: "22" }],
    tags: ["SvelteKit", "ElysiaJS", "Prisma", "PostgreSQL", "Redis", "Bun"]
  },
  {
    id: "plinkk-fr",
    title: "Plinkk.fr",
    category: "Web Development",
    description: "Service d'agrégation de liens hébergé en France : chaque profil est une page personnalisable en temps réel, avec bibliothèque de thèmes, animations et éditeur visuel.",
    url: "https://plinkk.fr",
    github: "https://github.com/Klaynight-dev/links_website_template",
    image: "plinkk-accueil.webp",
    imageAlt: "Accueil de plinkk.fr : titre « Votre univers en un lien. Clair, vivant, mémorisable. » et champ d'inscription par mail.",
    tags: ["EJS", "Bun", "TypeScript", "Tailwind"]
  },
  {
    id: "kotbo-fr",
    title: "kotbo.fr",
    category: "Web Development",
    description: "Site et tableau de bord de Kotbo, un bot de gestion de communauté Discord : configuration des modules, modération, économie et statistiques de serveur depuis le navigateur.",
    url: "https://kotbo.fr",
    github: "https://github.com/Kotbo-Bot",
    image: "kotbo-accueil.webp",
    imageAlt: "Accueil de kotbo.fr : « Le bot Discord qui gère ton serveur pendant que tu dors », boutons Ajouter à Discord et Tester le dashboard.",
    tags: ["Svelte", "TailwindCSS", "Bun", "Vite"],
    featured: true,
    period: "Depuis mars 2026",
    stats: [
      { label: "commits sur le bot", value: "1 793 / 3 530" },
      { label: "modules", value: "58" }
    ],
    sections: [
      {
        title: "Raconter le problème",
        body: "La landing ne liste pas des fonctionnalités : elle met en scène la nuit d'un fondateur de serveur sans Kotbo, notifications et messages de modérateurs à l'appui, puis bascule sur la même scène avec le bot.",
        image: "kotbo-staff.webp",
        imageAlt: "Section comparative de kotbo.fr : salon #staff rempli de demandes de modérateurs à 2 h du matin et écran de téléphone couvert de notifications.",
        caption: "Le comparatif « Sans Kotbo / Avec Kotbo »."
      }
    ]
  },
  {
    id: "synapsejs",
    title: "SynapseJS",
    category: "Web Development",
    description: "Moteur de rendu sans DOM pour le web : le scene graph vit en mémoire et part directement au GPU via WebGPU, en un seul draw call pour des milliers d'éléments. Adaptateurs pour React, Svelte, Angular et Vanilla JS, et banc d'essai intégré contre le DOM.",
    url: "https://synapsejs.klaynight.fr",
    github: "https://github.com/Klaynight-dev/SynapseJS",
    image: "synapsejs-accueil.webp",
    imageAlt: "Site de SynapseJS en post-its : « Le moteur de rendu sans DOM pour le web » et chiffres du banc d'essai, 643 FPS contre 10,4 pour le DOM.",
    tags: ["TypeScript", "WebGPU", "Bun", "Framework"],
    period: "Mai – juillet 2026",
    stats: [
      { label: "commits", value: "15" },
      { label: "plus rapide que le DOM", value: "×46" }
    ]
  },
  {
    id: "sae-cobrec",
    title: "SAE Cobrec",
    category: "Web Development",
    description: "Projet universitaire en équipe : Alizon, une marketplace qui met en relation des producteurs locaux bretons et des consommateurs. Développement du front office et du back office, modélisation de la base de données et restitution des données de vente.",
    url: "https://github.com/SAE-COBREC/main",
    github: "https://github.com/SAE-COBREC/main",
    image: "",
    tags: ["PHP", "JavaScript", "SQL", "BUT Informatique"]
  },
  {
    id: "sae-cobrec-design",
    title: "SAE Cobrec (design UI/UX)",
    category: "Web Design",
    description: "Direction artistique de la marketplace Alizon sur Figma : charte graphique, composants réutilisables et maquettes interactives pour les trois espaces du produit (client, producteur, administrateur).",
    url: "https://www.figma.com/design/oRhwvXX8hZrHIdutk3YQZt/MarketPlace?node-id=0-1&t=0vrF8PrjS2lurRae-1",
    image: "",
    tags: ["Figma", "UI/UX", "Design System", "SAE Cobrec"]
  },
  {
    id: "papicon-design",
    title: "Icônes Papicons",
    category: "Web Design",
    description: "Dessin d'icônes pour Papicons, la bibliothèque d'icônes de l'application Papillon : construction sur grille 24 px, contours pleins, et déclinaison des variantes d'un même signe (panneau ouvert ou fermé, horloge simple ou historique).",
    url: "https://www.figma.com/design/xjPgRmLmqtR16vWkyuXaon/Untitled?node-id=0-1&p=f&t=AeEWavMzmH3kWmqO-0",
    image: "papicons-sheet.svg",
    imageAlt: "Planche de douze icônes Papicons : panneaux latéraux, horloge d'historique, bulle de texte, ajout, utilisateur, réglages, document, tâches, flèche, étoile.",
    tags: ["Figma", "Iconographie", "Design System", "Papillon"]
  },
  {
    id: "affiches-design",
    title: "Affiche « C'est quoi un OS ? »",
    category: "Web Design",
    description: "Affiche pédagogique co-signée avec Guéwen Maréchal : le système d'exploitation expliqué comme un chef d'orchestre, où les programmes sont les musiciens, le matériel les instruments et vos clics la partition.",
    url: "https://www.figma.com/design/8Ssy1x4r895uqdRB88IJgQ/C-est-quoi-un-os-affiche?node-id=0-1&t=Us7LhQsjuHm2UcWO-1",
    image: "affiche-os.webp",
    imageAlt: "Affiche « C'est quoi un OS ? » : un chef d'orchestre au centre, entouré des blocs Les Musiciens, La Partition, Les Instruments et Le Public, et en bas les quatre rôles de l'OS, interpréter les gestes, éviter les fausses notes, gérer les ressources, donner le tempo.",
    tags: ["Figma", "Affiche", "Vulgarisation", "Typographie"],
    tile: "tall"
  },
  {
    id: "jo-surf",
    title: "Site JO de surf",
    category: "Web Design",
    description: "Maquettage sur Figma puis intégration d'un site consacré aux épreuves de surf des Jeux Olympiques de Paris, du choix typographique jusqu'au responsive.",
    url: "https://klaynight.fr/JO_Website_project/",
    github: "https://github.com/klaynight-dev/JO_Website_project/",
    image: "jo-surf-pages.png",
    imageAlt: "Deux pages finies du site JO de surf : la fiche du champion français et l'épreuve de Teahupo'o.",
    tags: ["HTML", "CSS", "JavaScript", "Figma", "Responsive"]
  },
  {
    id: "hubgames",
    title: "HubGames",
    category: "Web Development",
    description: "Portail qui regroupe les mini-jeux et les petits outils web développés en équipe depuis 2020, avec une base commune de comptes et de scores.",
    url: "https://hubgames.klaynight.fr",
    github: "https://github.com/TheHubGames/hub_games",
    image: "HubGames.jpeg",
    imageAlt: "Page d'accueil de HubGames listant les mini-jeux disponibles.",
    tags: ["JavaScript", "HTML5", "CSS3", "PHP"]
  },
  {
    id: "jobi",
    title: "Jobi",
    category: "Applications",
    description: "Application de bureau Java pour les librairies : gestion du stock, fiches clients et suivi des emprunts, avec une base SQL et une interface Swing.",
    url: "https://github.com/Klaynight-dev/stock_gestion_library",
    github: "https://github.com/Klaynight-dev/stock_gestion_library",
    image: "Jobi.png",
    imageAlt: "Fenêtre Jobi affichant la table de gestion du stock.",
    tags: ["Java", "SQL", "Swing", "Database"]
  },
  {
    id: "plinkk-os",
    title: "Plinkk (open source)",
    category: "Web Development",
    description: "Modèle de page de profil à personnaliser puis héberger soi-même, point de départ open source qui a donné naissance à plinkk.fr.",
    url: "https://github.com/Klaynight-dev/links_website_template",
    github: "https://github.com/Klaynight-dev/links_website_template",
    image: "plinkk.png",
    imageAlt: "Page de profil générée à partir du modèle open source Plinkk.",
    tags: ["HTML", "CSS", "JavaScript"]
  }
];
