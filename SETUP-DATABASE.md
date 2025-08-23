# 🗄️ Configuration de la Base de Données Supabase

Ce guide vous explique comment configurer la base de données Supabase pour DesignMatch.

## 📋 Prérequis

- Un compte Supabase actif
- L'URL et la clé API de votre projet Supabase
- Accès à l'interface d'administration Supabase

## 🚀 Méthode 1 : Interface Web Supabase (Recommandée)

### Étape 1 : Accéder à l'éditeur SQL
1. Connectez-vous à [Supabase](https://supabase.com)
2. Ouvrez votre projet DesignMatch
3. Allez dans **SQL Editor** dans le menu de gauche
4. Cliquez sur **New Query**

### Étape 2 : Exécuter le script de configuration
1. Copiez le contenu du fichier `database/setup-supabase.sql`
2. Collez-le dans l'éditeur SQL
3. Cliquez sur **Run** (ou appuyez sur `Cmd/Ctrl + Enter`)

### Étape 3 : Vérifier la création
Le script affichera un tableau avec le statut de chaque table :
- ✅ Créée : La table a été créée avec succès
- ❌ Manquante : La table n'a pas pu être créée

## 🔧 Méthode 2 : Script Node.js

### Étape 1 : Installer les dépendances
```bash
npm install @supabase/supabase-js
```

### Étape 2 : Configurer la clé de service
1. Dans Supabase, allez dans **Settings** > **API**
2. Copiez la **Service Role Key** (attention : gardez-la secrète !)
3. Créez un fichier `.env.local` :
```env
SUPABASE_SERVICE_ROLE_KEY=votre_clé_de_service_ici
```

### Étape 3 : Exécuter le script
```bash
node scripts/setup-database.js
```

## 📊 Tables créées

Le script crée les tables suivantes :

| Table | Description |
|-------|-------------|
| `users` | Utilisateurs (talents et recruteurs) |
| `talent_profiles` | Profils des talents UX/UI |
| `company_profiles` | Profils des entreprises |
| `missions` | Offres d'emploi et missions |
| `applications` | Candidatures aux missions |
| `favorites` | Favoris des utilisateurs |
| `messages` | Messages entre utilisateurs |

## 🔐 Sécurité (RLS)

Le script configure automatiquement :
- **Row Level Security (RLS)** activé sur toutes les tables
- **Politiques de sécurité** pour contrôler l'accès aux données
- **Authentification** basée sur `auth.uid()`

## 🚨 Dépannage

### Erreur : "relation does not exist"
- Vérifiez que le script a été exécuté complètement
- Vérifiez les logs dans l'éditeur SQL

### Erreur : "permission denied"
- Vérifiez que vous utilisez la clé de service (pas la clé anonyme)
- Vérifiez que vous avez les droits d'administration

### Tables manquantes
- Relancez le script complet
- Vérifiez les erreurs dans les logs

## ✅ Vérification

Après l'exécution, vous devriez voir :
- 7 tables créées avec succès
- Les index de performance
- Les politiques RLS configurées
- Les triggers de mise à jour automatique

## 🔄 Mise à jour

Pour modifier le schéma :
1. Modifiez le fichier `database/setup-supabase.sql`
2. Exécutez les nouvelles commandes dans l'éditeur SQL
3. Ou relancez le script Node.js

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs d'erreur dans Supabase
2. Consultez la documentation Supabase
3. Vérifiez que toutes les étapes ont été suivies

---

**Note** : Ce script configure une base de données complète et sécurisée. Assurez-vous de tester l'application après la configuration.

