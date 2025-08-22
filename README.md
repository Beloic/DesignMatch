# DesignMatch - Plateforme de mise en relation Recruteurs ↔ Talents UX/UI

DesignMatch est une plateforme moderne de mise en relation entre recruteurs et talents UX/UI Design. Cette application front-end complète simule une place de marché avec des données mock et une interface utilisateur riche et responsive.

## 🚀 Fonctionnalités

### Pour les Recruteurs
- **Publier des missions** : Formulaire multi-étapes pour créer des offres d'emploi
- **Rechercher des talents** : Filtres avancés par compétences, localisation, niveau d'expérience
- **Gérer les candidatures** : Interface pour suivre les postulations
- **Favoris** : Marquer et organiser les talents intéressants

### Pour les Talents
- **Créer un profil** : Wizard en 4 étapes pour construire un portfolio complet
- **Rechercher des missions** : Filtres par contrat, localisation, outils requis
- **Gérer les candidatures** : Suivre les missions postulées
- **Portfolio** : Présentation des études de cas et expériences

### Fonctionnalités générales
- **Recherche globale** : Recherche unifiée talents et missions
- **Filtres avancés** : Par compétences, outils, localisation, contrat, niveau
- **Thème clair/sombre** : Support du mode sombre avec persistance
- **Internationalisation** : Support FR/EN avec switch de langue
- **Responsive design** : Optimisé mobile, tablette et desktop
- **Accessibilité** : Navigation clavier, ARIA labels, contrastes optimisés

## 🛠️ Stack technique

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : TailwindCSS + shadcn/ui
- **Icons** : Lucide React
- **Thème** : next-themes
- **Formulaires** : React Hook Form + Zod
- **État** : React Hooks + Context API
- **Données** : Mock JSON avec latence simulée

## 📁 Structure du projet

```
DesignMatch/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal avec providers
│   ├── page.tsx           # Page d'accueil
│   ├── talents/           # Pages des talents
│   ├── missions/          # Pages des missions
│   ├── publier/           # Formulaire de publication
│   ├── profil/            # Éditeurs de profil
│   ├── favoris/           # Gestion des favoris
│   ├── messages/          # Interface de messagerie
│   └── auth/              # Pages d'authentification
├── components/             # Composants React
│   ├── ui/                # Composants shadcn/ui
│   ├── AppNavbar.tsx      # Navigation principale
│   ├── Hero.tsx           # Section héro de l'accueil
│   ├── TalentCard.tsx     # Carte d'affichage talent
│   ├── MissionCard.tsx    # Carte d'affichage mission
│   ├── FilterBar.tsx      # Barre de filtres
│   └── ...                # Autres composants
├── lib/                    # Utilitaires et logique métier
│   ├── api.ts             # API mock avec latence simulée
│   ├── types.ts           # Types TypeScript
│   ├── utils.ts           # Fonctions utilitaires
│   ├── i18n.ts            # Internationalisation
│   └── mock/              # Données mock JSON
├── hooks/                  # Hooks React personnalisés
│   ├── useLanguage.ts     # Gestion de la langue
│   └── useFavorites.ts    # Gestion des favoris
└── styles/                 # Styles globaux
    └── globals.css        # CSS global + variables Tailwind
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ 
- pnpm (recommandé) ou npm

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd DesignMatch
```

2. **Installer les dépendances**
```bash
pnpm install
# ou
npm install
```

3. **Démarrer le serveur de développement**
```bash
pnpm dev
# ou
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

### Scripts disponibles

```bash
pnpm dev          # Démarre le serveur de développement
pnpm build        # Build de production
pnpm start        # Démarre le serveur de production
pnpm lint         # Vérification ESLint
pnpm type-check   # Vérification TypeScript
```

## 🎨 Design System

### Couleurs
- **Primary** : `#6C5CE7` (violet)
- **Accent** : `#00D1B2` (teal)
- **Background** : Variables CSS adaptatives (clair/sombre)
- **Text** : Contrastes optimisés pour l'accessibilité

### Composants
- **Cards** : `rounded-2xl` avec ombres douces
- **Buttons** : Variants primary, secondary, outline, ghost
- **Inputs** : Focus rings visibles avec couleurs primaires
- **Badges** : Pour les tags et statuts
- **Avatars** : Avec fallbacks et images optimisées

### Responsive
- **Mobile First** : Design optimisé mobile
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid** : Adaptatif selon la taille d'écran

## 🌐 Internationalisation

Le système i18n supporte :
- **Français** : Langue par défaut
- **Anglais** : Langue alternative
- **Persistance** : Sauvegarde de la préférence en localStorage
- **Traductions** : Centralisées dans `lib/i18n.ts`

### Ajouter une nouvelle langue

1. Ajouter la langue dans `lib/i18n.ts`
2. Étendre l'interface `Language`
3. Ajouter les traductions dans l'objet `translations`

## 🔧 Configuration

### TailwindCSS
- Configuration personnalisée dans `tailwind.config.ts`
- Variables CSS pour les couleurs et espacements
- Plugins pour les animations et transitions

### TypeScript
- Configuration stricte dans `tsconfig.json`
- Types exportés depuis `lib/types.ts`
- Path mapping avec `@/*` pour les imports

### ESLint & Prettier
- Configuration Next.js pour ESLint
- Prettier avec plugin TailwindCSS
- Formatage automatique des classes CSS

## 📱 Pages et composants

### Page d'accueil (`/`)
- **Hero** : Titre, sous-titre, recherche globale, CTA
- **Talents mis en avant** : Carrousel des talents recommandés
- **Missions récentes** : Dernières offres publiées
- **Catégories** : Spécialités UX/UI avec navigation

### Listing des talents (`/talents`)
- **Filtres avancés** : Recherche, localisation, compétences, outils
- **Grille responsive** : Cartes talent avec informations détaillées
- **Pagination** : Navigation entre les pages de résultats
- **Tri** : Par pertinence, récent, TJM/salaire

### Profil talent (`/talents/[id]`)
- **Header** : Avatar, nom, titre, badges, CTA contact
- **Onglets** : Aperçu, études de cas, expérience, compétences
- **Actions** : Télécharger CV, contacter, ajouter aux favoris

### Publier une mission (`/publier`)
- **Wizard 3 étapes** : Informations générales → Détails → Aperçu
- **Validation** : Zod + React Hook Form
- **Récapitulatif** : Aperçu avant publication (mock)

## 🗄️ Données et API

### Structure des données
- **Talents** : Profils complets avec compétences, expérience, portfolio
- **Missions** : Offres d'emploi avec exigences et détails
- **Entreprises** : Informations sur les recruteurs
- **Villes** : Localisations françaises et européennes

### API Mock
- **Latence simulée** : 300-700ms pour simuler le réseau
- **Filtrage** : Côté client avec paramètres d'URL
- **Pagination** : Gestion des pages et tailles
- **Recherche** : Textuelle et par critères multiples

### Exemple d'utilisation
```typescript
import { getTalents } from '@/lib/api'

const talents = await getTalents({
  q: 'Product Designer',
  city: 'Paris',
  seniority: ['Senior'],
  tools: ['Figma', 'Sketch'],
  page: 1,
  pageSize: 12
})
```

## 🎯 Fonctionnalités avancées

### Système de favoris
- **Persistance** : Stockage localStorage
- **Synchronisation** : État global avec hooks personnalisés
- **Actions** : Ajouter/retirer, compteur, gestion

### Gestion des filtres
- **URL sync** : Paramètres dans l'URL pour le partage
- **État local** : Filtres en cours de modification
- **Réinitialisation** : Bouton pour effacer tous les filtres

### Recherche globale
- **Unifiée** : Talents et missions dans une seule recherche
- **Suggestions** : Résultats en temps réel
- **Navigation** : Redirection vers les pages de résultats

## 🚧 Limitations actuelles

### UI Only
- **Pas de backend** : Toutes les données sont mockées
- **Pas d'authentification** : Formulaires de démonstration uniquement
- **Pas de persistance** : Données réinitialisées au rechargement (sauf favoris)

### Données
- **Statiques** : 10 talents et 10 missions prédéfinies
- **Pas de CRUD** : Impossible de créer/modifier/supprimer
- **Pas de recherche externe** : Résultats limités aux données mock

## 🔮 Évolutions futures

### Backend
- **API REST** : Remplacement des mocks par de vraies API
- **Base de données** : PostgreSQL avec Prisma
- **Authentification** : NextAuth.js ou Auth0

### Fonctionnalités
- **Messagerie temps réel** : WebSockets ou Server-Sent Events
- **Notifications** : Push notifications et emails
- **Analytics** : Suivi des interactions et conversions

### Performance
- **SSR/SSG** : Rendu côté serveur pour le SEO
- **Image optimization** : Next.js Image avec CDN
- **Caching** : Redis pour les données fréquemment consultées

## 🤝 Contribution

### Développement
1. Fork du projet
2. Création d'une branche feature
3. Développement avec tests
4. Pull request avec description détaillée

### Standards de code
- **TypeScript strict** : Types explicites partout
- **ESLint** : Respect des règles de qualité
- **Prettier** : Formatage automatique
- **Conventions** : Nommage cohérent, composants réutilisables

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- **Issues GitHub** : Créer une issue avec description détaillée
- **Documentation** : Consulter ce README et les commentaires de code
- **Communauté** : Discussions dans les issues GitHub

---

**DesignMatch** - Connecter les talents UX/UI Design avec les meilleures opportunités 🚀
