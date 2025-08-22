# 🎨 DesignMatch

**Plateforme de mise en relation Recruteurs ↔ Talents UX/UI Design**

DesignMatch est une plateforme moderne qui connecte recruteurs et talents UX/UI Design en France et en Europe. Trouvez votre prochain designer ou votre prochaine mission.

## ✨ Fonctionnalités

- 🔐 **Authentification complète** avec Supabase
- 👥 **Profils talents et recruteurs** personnalisables
- 🎯 **Système de recherche et filtrage** avancé
- 💼 **Gestion des missions** et candidatures
- ❤️ **Système de favoris** pour sauvegarder les profils
- 💬 **Messagerie intégrée** entre utilisateurs
- 📱 **Interface responsive** et moderne
- 🌍 **Support multilingue** (FR/EN)

## 🚀 Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage)
- **Déploiement**: Vercel (Auto-deploy depuis GitHub)

## 🛠️ Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Beloic/DesignMatch.git
   cd DesignMatch
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration des variables d'environnement**
   ```bash
   cp .env.example .env.local
   # Remplir avec vos clés Supabase
   ```

4. **Lancer en développement**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Variables d'environnement requises

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Base de données Supabase

Le projet utilise les tables suivantes :
- `profiles` - Profils utilisateurs
- `missions` - Offres d'emploi
- `talents` - Profils talents
- `applications` - Candidatures
- `favorites` - Favoris utilisateurs
- `messages` - Messagerie
- `notifications` - Notifications système

## 📱 Pages principales

- **Accueil** (`/`) - Présentation et recherche
- **Inscription/Connexion** (`/auth/*`) - Authentification
- **Talents** (`/talents`) - Découvrir les designers
- **Missions** (`/missions`) - Voir les offres
- **Profil** (`/profil/*`) - Gestion des profils
- **Favoris** (`/favoris`) - Profils sauvegardés
- **Messages** (`/messages`) - Communication

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Connecter le repository GitHub** à Vercel
2. **Variables d'environnement** configurées automatiquement
3. **Auto-deploy** à chaque push sur `main`

### Manuel

```bash
npm run build
npm start
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Email**: contact@designmatch.com
- **GitHub Issues**: [Signaler un bug](https://github.com/Beloic/DesignMatch/issues)
- **Documentation**: [Wiki du projet](https://github.com/Beloic/DesignMatch/wiki)

---

**Fait avec ❤️ en France** 🇫🇷
