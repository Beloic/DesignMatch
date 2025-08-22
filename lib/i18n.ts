export type Language = 'fr' | 'en'

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      talents: 'Talents',
      missions: 'Missions',
      publish: 'Publier une mission',
      favorites: 'Favoris',
      messages: 'Messages',
      profile: 'Profil',
      login: 'Connexion',
      register: 'Inscription',
      logout: 'Déconnexion'
    },
    
    // Accueil
    home: {
      hero: {
        title: 'La meilleure façon de trouver votre prochain designer — ou votre prochaine mission.',
        subtitle: 'Connectez recruteurs et talents UX/UI Design en France et en Europe',
        searchPlaceholder: 'Recherchez un talent ou une mission...',
        searchButton: 'Rechercher',
        ctaRecruiter: 'Publier une mission',
        ctaTalent: 'Créer mon profil'
      },
      sections: {
        featuredTalents: 'Talents mis en avant',
        recentMissions: 'Missions récentes',
        categories: 'Catégories'
      }
    },
    
    // Filtres
    filters: {
      search: 'Recherche',
      location: 'Localisation',
      contract: 'Contrat',
      workMode: 'Mode de travail',
      seniority: 'Niveau',
      tools: 'Outils',
      salary: 'Salaire',
      dailyRate: 'TJM',
      availability: 'Disponibilité',
      reset: 'Réinitialiser',
      apply: 'Appliquer',
      sortBy: 'Trier par',
      sortOptions: {
        recent: 'Plus récent',
        rate: 'TJM/Salaire',
        relevance: 'Pertinence'
      }
    },
    
    // Contrats
    contracts: {
      freelance: 'Freelance',
      cdi: 'CDI',
      cdd: 'CDD',
      stage: 'Stage',
      alternance: 'Alternance'
    },
    
    // Modes de travail
    workModes: {
      remote: 'Remote',
      hybrid: 'Hybride',
      onsite: 'Sur site'
    },
    
    // Niveaux
    seniority: {
      junior: 'Junior',
      intermediate: 'Intermédiaire',
      senior: 'Senior',
      lead: 'Lead'
    },
    
    // États
    states: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      empty: 'Aucun résultat',
      noResults: 'Aucun résultat pour ces filtres. Essayez d\'élargir votre recherche.',
      retry: 'Réessayer'
    },
    
    // Actions
    actions: {
      view: 'Voir',
      contact: 'Contacter',
      apply: 'Postuler',
      favorite: 'Favori',
      unfavorite: 'Retirer des favoris',
      download: 'Télécharger',
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler',
      next: 'Suivant',
      previous: 'Précédent',
      publish: 'Publier',
      delete: 'Supprimer'
    },
    
    // Pagination
    pagination: {
      page: 'Page',
      of: 'sur',
      next: 'Suivant',
      previous: 'Précédent',
      showing: 'Affichage de',
      to: 'à',
      ofTotal: 'sur'
    },
    
    // Formulaires
    forms: {
      required: 'Champ obligatoire',
      minLength: 'Minimum {min} caractères',
      maxLength: 'Maximum {max} caractères',
      invalidEmail: 'Email invalide',
      invalidUrl: 'URL invalide',
      invalidNumber: 'Nombre invalide'
    },
    
    // Messages
    messages: {
      favoriteAdded: 'Ajouté aux favoris',
      favoriteRemoved: 'Retiré des favoris',
      formSaved: 'Formulaire sauvegardé',
      formPublished: 'Mission publiée avec succès',
      copied: 'Copié dans le presse-papiers',
      errorOccurred: 'Une erreur est survenue'
    },
    
    // Profils
    profile: {
      availability: 'Disponibilité',
      immediate: 'Immédiate',
      in2Weeks: 'Sous 2 semaines',
      in3Weeks: 'Sous 3 semaines',
      in4Weeks: 'Sous 4 semaines',
      languages: 'Langues',
      skills: 'Compétences',
      tools: 'Outils',
      experience: 'Expérience',
      caseStudies: 'Études de cas',
      portfolio: 'Portfolio',
      linkedin: 'LinkedIn',
      website: 'Site web',
      bio: 'Biographie',
      companyHistory: 'Historique professionnel',
      from: 'De',
      to: 'À'
    },
    
    // Missions
    mission: {
      posted: 'Publié',
      ago: 'il y a',
      responsibilities: 'Responsabilités',
      requirements: 'Profil recherché',
      salary: 'Salaire',
      dailyRate: 'TJM',
      tools: 'Outils requis',
      tags: 'Tags',
      company: 'Entreprise',
      location: 'Localisation',
      contract: 'Contrat',
      workMode: 'Mode de travail',
      seniority: 'Niveau requis'
    },
    
    // Auth
    auth: {
      login: 'Connexion',
      register: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      noAccount: 'Pas de compte ?',
      hasAccount: 'Déjà un compte ?',
      demoMessage: 'Démo UI — pas d\'auth réelle',
      loginSuccess: 'Connexion réussie',
      registerSuccess: 'Inscription réussie'
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      talents: 'Talents',
      missions: 'Missions',
      publish: 'Publish a mission',
      favorites: 'Favorites',
      messages: 'Messages',
      profile: 'Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout'
    },
    
    // Home
    home: {
      hero: {
        title: 'The best way to find your next designer — or your next mission.',
        subtitle: 'Connect recruiters and UX/UI Design talents in France and Europe',
        searchPlaceholder: 'Search for a talent or mission...',
        searchButton: 'Search',
        ctaRecruiter: 'Publish a mission',
        ctaTalent: 'Create my profile'
      },
      sections: {
        featuredTalents: 'Featured talents',
        recentMissions: 'Recent missions',
        categories: 'Categories'
      }
    },
    
    // Filters
    filters: {
      search: 'Search',
      location: 'Location',
      contract: 'Contract',
      workMode: 'Work mode',
      seniority: 'Level',
      tools: 'Tools',
      salary: 'Salary',
      dailyRate: 'Daily rate',
      availability: 'Availability',
      reset: 'Reset',
      apply: 'Apply',
      sortBy: 'Sort by',
      sortOptions: {
        recent: 'Most recent',
        rate: 'Rate/Salary',
        relevance: 'Relevance'
      }
    },
    
    // Contracts
    contracts: {
      freelance: 'Freelance',
      cdi: 'Full-time',
      cdd: 'Fixed-term',
      stage: 'Internship',
      alternance: 'Apprenticeship'
    },
    
    // Work modes
    workModes: {
      remote: 'Remote',
      hybrid: 'Hybrid',
      onsite: 'On-site'
    },
    
    // Seniority
    seniority: {
      junior: 'Junior',
      intermediate: 'Intermediate',
      senior: 'Senior',
      lead: 'Lead'
    },
    
    // States
    states: {
      loading: 'Loading...',
      error: 'An error occurred',
      empty: 'No results',
      noResults: 'No results for these filters. Try broadening your search.',
      retry: 'Retry'
    },
    
    // Actions
    actions: {
      view: 'View',
      contact: 'Contact',
      apply: 'Apply',
      favorite: 'Favorite',
      unfavorite: 'Remove from favorites',
      download: 'Download',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      next: 'Next',
      previous: 'Previous',
      publish: 'Publish',
      delete: 'Delete'
    },
    
    // Pagination
    pagination: {
      page: 'Page',
      of: 'of',
      next: 'Next',
      previous: 'Previous',
      showing: 'Showing',
      to: 'to',
      ofTotal: 'of'
    },
    
    // Forms
    forms: {
      required: 'Required field',
      minLength: 'Minimum {min} characters',
      maxLength: 'Maximum {max} characters',
      invalidEmail: 'Invalid email',
      invalidUrl: 'Invalid URL',
      invalidNumber: 'Invalid number'
    },
    
    // Messages
    messages: {
      favoriteAdded: 'Added to favorites',
      favoriteRemoved: 'Removed from favorites',
      formSaved: 'Form saved',
      formPublished: 'Mission published successfully',
      copied: 'Copied to clipboard',
      errorOccurred: 'An error occurred'
    },
    
    // Profiles
    profile: {
      availability: 'Availability',
      immediate: 'Immediate',
      in2Weeks: 'Within 2 weeks',
      in3Weeks: 'Within 3 weeks',
      in4Weeks: 'Within 4 weeks',
      languages: 'Languages',
      skills: 'Skills',
      tools: 'Tools',
      experience: 'Experience',
      caseStudies: 'Case studies',
      portfolio: 'Portfolio',
      linkedin: 'LinkedIn',
      website: 'Website',
      bio: 'Biography',
      companyHistory: 'Work history',
      from: 'From',
      to: 'To'
    },
    
    // Missions
    mission: {
      posted: 'Posted',
      ago: 'ago',
      responsibilities: 'Responsibilities',
      requirements: 'Requirements',
      salary: 'Salary',
      dailyRate: 'Daily rate',
      tools: 'Required tools',
      tags: 'Tags',
      company: 'Company',
      location: 'Location',
      contract: 'Contract',
      workMode: 'Work mode',
      seniority: 'Required level'
    },
    
    // Auth
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      forgotPassword: 'Forgot password?',
      noAccount: 'No account?',
      hasAccount: 'Already have an account?',
      demoMessage: 'UI Demo — no real auth',
      loginSuccess: 'Login successful',
      registerSuccess: 'Registration successful'
    }
  }
}

export function t(key: string, lang: Language = 'fr'): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key // Retourner la clé si la traduction n'existe pas
    }
  }
  
  return typeof value === 'string' ? value : key
}

export function tWithParams(key: string, params: Record<string, string | number>, lang: Language = 'fr'): string {
  let text = t(key, lang)
  
  for (const [param, value] of Object.entries(params)) {
    text = text.replace(`{${param}}`, String(value))
  }
  
  return text
}
