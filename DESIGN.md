# DESIGN.md — Klaynight Portfolio

## Contexte

Portfolio perso d'un développeur web/app (BUT Informatique) qui cherche une alternance.
Audience : recruteurs, tuteurs, clients potentiels. Doit lire comme un site pro et technique,
pas comme un template IA générique.

## Références (analysées via leur CSS réel, pas juste "vibes")

- **vincelinise.com** — portfolio dev, IBM Plex Sans + police display perso, indigo profond
  (#26214d) + bleu accent (#0054db → #a3c7ff), radius mixtes (pill sur boutons, 7px sur cartes).
- **old.tomthings.fr** — site "widgets" ludique, neutre chaud (#f2f2f2/#000), Inter + mono
  PT Mono pour la donnée (horloge), ombres douces, radius variés (12–50px). Tagline "design that
  feels alive" : interactions palpables plutôt que décor plat.
- **sunmetalon.com** — palette chaude crème/charbon (#ece7e2 / #3e3a33 / #1b170f), un seul accent
  orange (#d96833), gros boutons pilule (radius 2rem).
- **ribbit.dk** — off-white (#FAFAFA) + encre quasi noire (#12120E), police display perso
  (FKTEcho) + grotesk (FKGroteskNeue), cartes à grand radius (16–24px), badges/boutons pilule
  (radius 160–320px).
- **Boutons YouTube** — pilules pleines : gris neutre par défaut, noir plein pour l'action
  principale, contraste au survol par assombrissement, jamais de glow/ombre excessive.

## Dénominateur commun retenu

Fond neutre chaud clair + encre quasi noire, **un seul** accent de couleur utilisé avec
intention, boutons en pilule façon YouTube, cartes à grand radius avec élévation seulement
au survol (pas d'ombre par défaut partout), typographie à deux voix (display + technique).

## Identité

- **Pourquoi un accent indigo-violet et pas bleu/orange générique ?** Clin d'œil direct au nom
  "Klaynight" (night → ciel nocturne indigo). Un seul accent, utilisé sur les CTA, liens actifs,
  et états actifs des pilules de navigation.
- **Pourquoi Fraunces + IBM Plex Sans et pas Inter/Geist/Space Grotesk ?** Fraunces porte le
  caractère éditorial/chaleureux (écho à la police perso de tom things et Ribbit) sur les titres ;
  IBM Plex Sans porte la lisibilité technique (même choix que vincelinise, cohérent avec un
  portfolio de développeur) sur le corps de texte et l'UI. IBM Plex Mono réservé aux métadonnées
  courtes (dates, tags) pour un accent "code".
- **Pourquoi pas de mode sombre ?** Les 4 références sont toutes claires par défaut (aucune
  n'a de bonne raison de marque pour un dark mode forcé), et l'ancien site n'avait qu'un résidu
  de classe `dark` jamais branché à un vrai style. Choix délibéré : thème clair unique, pas de
  toggle à moitié fini.

## Palette

- `--bg` `#f6f4ef` — fond de page, chaud clair (mix tom things / sun metalon)
- `--surface` `#ffffff` — cartes, champs
- `--surface-muted` `#efece4` — pilules neutres, fonds secondaires
- `--border` `#e4e0d6` — bordures fines
- `--ink` `#17151d` — texte principal, quasi noir à sous-teinte indigo (lien avec l'accent)
- `--ink-muted` `#6d6a76` — texte secondaire
- `--accent` `#4338ec` — indigo-violet, unique accent de marque
- `--accent-ink` `#ffffff` — texte sur fond accent
- `--accent-soft` `#ecebfd` — fonds teintés légers (badges, hover liens)

Max 2-3 couleurs neutres + 1 accent (R-29). Pas de dégradé bleu-violet générique : l'accent est
une teinte pleine unique, jamais un gradient.

## Typographie

- Titres : `Fraunces` (600/700, `font-optical-sizing: auto`)
- Corps / UI : `IBM Plex Sans` (400/500/600)
- Métadonnées courtes (dates, tags, labels) : `IBM Plex Mono` (500)

## Rayons

- Boutons, pilules, badges, filtres : `999px` (pleine pilule, façon YouTube)
- Cartes : `20px`
- Champs de formulaire : `12px`
- Pas de radius pilule sur les cartes (évite le "tout en pilule", R-11).

## Ombres / élévation

- Repos : bordure fine `1px solid var(--border)`, pas d'ombre par défaut.
- Survol (cartes projet, boutons) : légère élévation `translateY(-2px)` + ombre douce
  `0 8px 20px rgba(23,21,29,0.08)`. L'ombre signale l'interactivité, jamais un décor statique.

## Dials (antislop)

**Lecture** : portfolio dev pour recruteurs/clients, langage visuel éditorial-technique
(Vince Linise + tom things + sun metalon + Ribbit), boutons pilule façon YouTube.

- ENERGY 2 — posé et pro comme Stripe/Vercel, avec une touche de personnalité via Fraunces
  et l'accent indigo (pas aussi neutre que Linear).
- RHYTHM 2 — composition cohérente avec variation déclarée : bio en texte plein, services en
  cartes icône, projets phares en cartes image, compétences en nuages de pilules, témoignages
  en cartes citation, timeline en ligne verticale à points.
- MOTION 2 — transitions de survol (élévation cartes, assombrissement pilules), fade-in léger
  au changement d'onglet. Pas de parallax ni de choreographie scroll.

## Levers

- Un point focal par écran : le titre + accroche en haut du bloc "À propos", puis les projets
  phares comme second point d'ancrage visuel.
- Contraste hiérarchique : Fraunces en grande taille pour les titres de section vs IBM Plex Sans
  en corps de texte.
- Un accent déployé avec parcimonie : indigo uniquement sur CTA, liens actifs, pilule active,
  jamais en fond de page ni en glow.
- Motif d'identité répété : les pilules (nav, filtres, tags, boutons) forment un langage visuel
  cohérent et reconnaissable du site, inspiré des boutons YouTube.

## Galerie de projets (ajout)

### Pourquoi une galerie et pas une grille uniforme ?

Les projets n'ont pas le même poids ni le même format. Une grille de cartes toutes
identiques les aplatissait : OpenForms, qui a une vraie interface large à lire, occupait
la même vignette que Jobi. Le format de tuile est donc porté par la donnée
(`Project.tile`) et découle du contenu :

- `wide` : le projet a une interface large qui mérite d'être lue. La tuile prend la
  ligne entière et passe en composition horizontale (visuel à gauche, texte à droite).
- `tall` : pièce graphique au format portrait (affiche). La tuile garde un ratio 3/4.
- par défaut : demi-colonne en ratio 16/10.

**Override assumé sur R-05 (antislop)** : le propriétaire a demandé une galerie inspirée
d'une mosaïque type bento, qu'antislop liste comme pattern par défaut. Compromis retenu et
validé : la variation de taille existe, mais elle est **dérivée du contenu**, jamais
décorative, et elle reste sur une grille à deux colonnes qui ne laisse jamais de trou,
quel que soit le filtre de catégorie actif.

### Pourquoi ces aperçus-là ?

- **Capture réelle quand elle existe** (OpenForms, JO de surf, HubGames, Jobi, Plinkk
  open source). La capture OpenForms est recadrée sous la barre de navigation : celle-ci
  affichait l'adresse e-mail du compte administrateur.
- **Planche d'icônes réelle** pour Papicons : générée à partir des fichiers SVG du dépôt,
  pas redessinée. L'aperçu est l'artefact lui-même.
- **Pas de fausse interface** pour les projets sans capture. À la place, la tuile montre
  la vraie stack en pilules de marque. C'est une information vérifiable, et elle reprend
  le motif d'identité du site (la pilule) au lieu d'inventer une maquette.
- La planche Figma complète du site JO était illisible en vignette : l'aperçu est un
  recadrage sur deux pages finies, pas le board entier.

### Contraste

`--ink-muted` sur `--surface-muted` tombe à 4.48:1, sous le seuil AA de 4.5:1 pour du
texte normal. Les tags étant beaucoup plus présents dans la galerie, ils passent sur
`--ink-muted-strong` (`#615e6a`, 5.36:1). Le token d'origine ne bouge pas : sur blanc
(5.29:1) et sur le fond de page (4.81:1), il était déjà conforme.

### Poids des images

Les captures s'affichant plus grand, elles ont été ramenées à 1600 px de large et
recompressées : la charge images du portfolio passe d'environ 5,2 Mo à 0,9 Mo.

## Palette domaines (ajout)

### Pourquoi revenir sur « un seul accent » (R-29) ?

Le propriétaire a jugé le rendu mono-accent (indigo seul) trop plat et trop proche d'un
gabarit générique, et a demandé de s'inspirer à nouveau de old.tomthings.fr, beta.tomthings.fr
et vincelinise.com pour aller vers plus de couleur. Vérification faite sur le CSS réel de ces
trois sites (pas juste le rendu) : aucun n'est en fait multicolore au sens arc-en-ciel. Les deux
tomthings restent quasi entièrement gris/noir/blanc (le vivant vient des illustrations et
micro-interactions, pas de la palette) ; vincelinise.com reste proche de ce que ce site faisait
déjà — un indigo profond + une **rampe** du même accent (`#0054db` → `#a3c7ff`), plus un seul
accent secondaire discret (teal). Présenté ce constat, le propriétaire a tranché pour une palette
plus large et personnelle plutôt qu'une simple rampe : cinq teintes fournies explicitement
(`#B570E5` `#A6D1EA` `#C4BE8E` `#0D837E` `#AFDB8F`), pastel/flashy.

**Override assumé sur R-29** (max 2-3 neutres + 1 accent) : décision explicite et informée du
propriétaire après qu'on lui ait montré que ses propres références ne vont pas aussi loin.
Le garde-fou conservé pour ne pas retomber dans le « 5-7 couleurs sans système » que R-29
décrit vraiment : chaque teinte est assignée à **un domaine de contenu réel** et n'apparaît
jamais de façon décorative (`src/lib/data/domains.ts`) :

- `webdev` `#B570E5` (violet) — catégorie projet *Web Development*, groupe compétence
  *Frameworks & Langages Web*
- `design` `#AFDB8F` (menthe) — catégorie projet *Web Design*, groupe compétence
  *Design & Outils*
- `apps` `#C4BE8E` (sable) — catégorie projet *Applications*, groupe compétence
  *Langages Applicatifs*
- `backend` `#0D837E` (teal) — groupe compétence *Backend & Bases de Données* (pas de
  catégorie projet correspondante)
- `cloud` `#A6D1EA` (ciel) — groupe compétence *Cloud, DevOps & Réseaux* (idem)

Un même domaine garde la même teinte partout où il apparaît (tuile de compétence, service
« Ce que je fais », étiquette de catégorie projet, bordure de survol de carte, pilule de
filtre active) : la couleur code une information stable, elle ne décore pas. `--accent` reste
l'unique accent fonctionnel (liens, CTA, focus ring, timeline) — il change de teinte
(violet `#8a55ae`, variante lisible du `#B570E5` fourni) mais reste seul à ce rôle ; la
palette domaine ne s'y substitue pas.

`tapeColor` (`services`), un champ mort jamais branché à un style, a été remplacé par
`domain` pour la même raison que l'ancien override de galerie : on ne garde pas de données
non exploitées (R-26).

### Contraste

Chaque paire fond/texte de domaine est pré-calculée (pas de calcul au runtime) pour rester
au-dessus de 8:1 sur fond de carte et sur `--bg` — largement au-dessus du seuil AA de 4.5:1,
marge prise pour couvrir les variantes de fond de la page. Les variantes foncées utilisées en
fond plein (pilule de filtre active, prévues pour texte blanc) tombent entre 9:1 et 11:1.
`--accent` (`#8a55ae`) donne 4.79:1 sur `--bg` et 5.26:1 sur `--surface` en texte, et 5.26:1
pour du texte blanc sur fond plein — AA conforme dans les deux usages.

## Hero + scroll-reveal (ajout)

Le propriétaire a demandé un rapprochement d'ambiance avec beta.tomthings.fr et
vincelinise.com, sans refonte de la structure sidebar + onglets (mise de côté explicitement pour
plus tard). Trois changements, dials ENERGY 2 / RHYTHM 2 / MOTION 2 inchangés :

- **Hero de l'onglet À propos** : le h2 générique « À propos de moi » devient une accroche
  personnelle (« Enchanté, moi c'est Elouan... »), écho direct au ton de vincelinise.com
  (« Enchanté, moi c'est Vince »), avec « Elouan » en accent indigo. Un seul mot en accent :
  reste cohérent avec le principe « un accent déployé avec parcimonie ».
- **Scroll-reveal** (`src/lib/actions/reveal.ts`) : réalise le dial MOTION 2 (« scroll-reveal,
  transitions ») déjà déclaré mais pas encore implémenté — jusque-là seul un fade-in global au
  changement d'onglet existait. Un fade-up ponctuel par section/carte à l'entrée dans le
  viewport, jamais répété, jamais de parallax ni de choreographie continue liée à la position de
  scroll (repris tel quel de la ligne MOTION 2 d'origine). Respecte `prefers-reduced-motion`,
  même garde que `SmoothScroll.svelte`/`CustomCursor.svelte`.
- **Galerie de projets** : espacement `gap-5`→`gap-6/7` et padding `p-5`→`p-6` (whitespace comme
  structure), titre `text-lg`→`text-xl` (plus de présence typographique), zoom léger de l'image
  au survol de la tuile (signale l'interactivité, cohérent avec l'élévation déjà en place sur
  `.card-interactive`).

## Fiche projet en modal + navigation (ajout)

- **Fiche projet (`ProjectModal.svelte`)** : cliquer une tuile projet (image ou titre) ouvre le
  détail en overlay plutôt que de dupliquer le contenu de la carte ailleurs sur la page — le
  contenu ne change pas (mêmes champs `Project`), seule sa présentation s'agrandit. Fermeture par
  `Escape`, clic sur le fond, ou bouton dédié ; focus posé sur la fiche à l'ouverture et rendu à
  l'élément d'origine à la fermeture ; `Tab`/`Shift+Tab` bouclent sur les contrôles de la fiche
  (R-32). Le bouton-image qui ouvre la fiche porte `data-no-blobity` : le curseur blob (voir
  `CustomCursor.svelte`) est prévu pour des cibles de taille pilule/bouton, pas pour un visuel de
  17rem de haut, donc il garde sa forme neutre au survol de l'image et ne réagit qu'au clic.
- **« Voir tout le portfolio »** (fin de la section Projets phares) : lien direct vers l'onglet
  Portfolio complet, pour ne pas laisser la sélection restreinte comme cul-de-sac.
- **Bouton remonter en haut** (`ScrollToTop.svelte`) : n'apparaît qu'une fois la page réellement
  scrollée (sinon ce serait un bouton sans effet, R-26), même style `pill-icon` que le reste du
  site plutôt qu'un composant à part, décalé au-dessus de la barre de navigation mobile.

## Élimination des marqueurs « IA générique » et alignement DA (vincelinise.com, tomthings.fr, tafac.fr, papillon.bzh)

Après inspection des captures et retour explicite du propriétaire (« ça fait très IA ») sur les cartes à bordures colorées, les pilules à badges circulaires imbriqués et la barre de filtres surdimensionnée, la DA a été épurée selon les principes antislop (rejet des techniques sans fonction) :

- **Compétences clés** : passage des blocs lourds encombrants à des lignes interactives compactes façon Tom Things et Vince Linise (`.competence-row`). Chaque ligne réunit le badge numéroté dans sa teinte de domaine (`.competence-num-badge`), le titre et sa description concise, et les preuves en pilules (`.chip` cliquable avec flèche ↗ ou `.chip-static` avec coche) alignées sur la droite, garantissant un scan fluide sans surcharge visuelle.
- **Sommaire de l'onglet À propos** (`.index-bar`) : abandon des filets horizontaux austères au profit d'une barre de pilules segmentée douce façon Papillon et Tafac (`.index-pill`), avec pastille numérotée `tabular-nums` (`.index-pill-badge`), icône fine et survol tactile blanc surélevé.
- **Filtres du portfolio** (`.filter-bar`) : compactage et affinement façon contrôle segmenté `tafac.fr` & `papillon.bzh`. Les compteurs ne sont plus enfermés dans des doubles cercles épais, mais intégrés élégamment en texte `tabular-nums` discret (`opacity: 0.6`). L'état actif est une pilule encre `#17151d` nette avec ombre subtile, sans couleurs arc-en-ciel superflues.
- **Compétences de l'accueil** : suppression des bordures supérieures colorées `border-t-[3px]`, remplacées par une pastille de couleur de 8px en coin de carte, discrète et fonctionnelle.
- **Recommandations** : suppression des dégradés verticaux et des boîtes d'icônes violettes répétitives, au profit de cartes de citation mates, lisibles et authentiques.
- **Contact** (`.contact-block`) : bloc encre plein, titre géant « Parlons-en. » (Tom), liens
  directs en icônes et nom géant rogné en pied de bloc (Vince), champs soulignés sur fond sombre.
  La carte Google Maps est retirée : iframe tierce, et la localisation tient en une ligne.
  Contrastes approximatifs sur `--ink` : texte blanc 18:1, texte secondaire à 70 % 9:1, placeholders à 50 % 5:1,
  lavande `#d8c3ea` 11:1 ; le focus passe en blanc dans le bloc.
