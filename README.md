# 🍔 Gestion de Fast-Food

Une application web moderne de gestion de fast-food construite avec **Next.js 14**, **React**, **TypeScript** et **Tailwind CSS**. Cette plateforme permet de gérer les menus, les commandes, l'historique des transactions et l'accès administrateur.

## 📋 Table des matières

- [Caractéristiques](#caractéristiques)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Authentification](#authentification)
- [API et contextes](#api-et-contextes)
- [Contribuer](#contribuer)
- [Licence](#licence)

## ✨ Caractéristiques

- 🔐 **Authentification** - Système de login pour administrateurs et serveurs
- 🍽️ **Gestion des menus** - Interface pour consulter et gérer les produits
- 🛒 **Panier** - Système de panier avec contexte global
- 📊 **Historique** - Suivi complet des commandes et transactions
- 👨‍💼 **Espace administrateur** - Dashboard pour les administrateurs
- 🎨 **Interface moderne** - Design élégant avec Tailwind CSS et composants Shadcn/UI
- 📱 **Responsive** - Adapté à tous les appareils (mobile, tablette, desktop)
- 🌍 **Multilingue** - Interface en français

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 14** - Framework React moderne avec SSR
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Shadcn/UI** - Composants UI prédéfinis et réutilisables
- **Radix UI** - Primitives UI accessibles
- **Lucide React** - Icônes
- **React Hook Form** - Gestion des formulaires

### Développement
- **PostCSS** - Outil pour transformer CSS
- **Autoprefixer** - Préfixes CSS automatiques
- **ESLint** - Linter pour le code

## 🚀 Installation

### Prérequis
- **Node.js** 18+ 
- **npm** ou **yarn** ou **pnpm**
- **Git**

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/fast-food-management.git
cd fast-food-management
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Accéder à l'application**
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet (optionnel pour le développement) :

```env
# Ajouter vos variables d'environnement ici si nécessaire
```

### Configuration Next.js

Le fichier `next.config.mjs` contient la configuration Next.js. Modifiez-le selon vos besoins.

### Configuration Tailwind CSS

Le fichier `tailwind.config.js` configure Tailwind CSS et les thèmes personnalisés.

## 📖 Utilisation

### Pages principales

| Page | Chemin | Description |
|------|--------|-------------|
| Accueil | `/` | Page d'accueil principale |
| Menu | `/menu` | Consultation du menu des produits |
| Services | `/services` | Services disponibles |
| Historique | `/historique` | Historique des commandes |
| Admin | `/admin` | Tableau de bord administrateur |
| Admin Login | `/admin/login` | Connexion administrateur |

### Authentification

#### Identifiants de connexion (développement)

**Administrateur :**
- Nom d'utilisateur : `admin`
- Mot de passe : `123*`

**Serveur :**
- Nom d'utilisateur : `serveur`
- Mot de passe : `serveur123`

> ⚠️ **Important** : En production, remplacez cette authentification par un vrai système d'authentification côté serveur et une base de données sécurisée.

## 📁 Structure du projet

```
fast-food-management/
├── app/                          # Pages Next.js (App Router)
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Page d'accueil
│   ├── globals.css              # Styles globaux
│   ├── admin/                   # Section administrateur
│   │   ├── page.tsx             # Dashboard admin
│   │   └── login/
│   │       └── page.tsx         # Page de login admin
│   ├── menu/                    # Page du menu
│   │   └── page.tsx
│   ├── services/                # Page des services
│   │   └── page.tsx
│   └── historique/              # Historique des commandes
│       ├── page.tsx
│       └── loading.tsx
├── components/                  # Composants React réutilisables
│   ├── theme-provider.tsx      # Fournisseur de thème
│   └── ui/                     # Composants UI (Shadcn/UI)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ... (40+ composants)
├── context/                    # Contextes React
│   ├── auth-context.tsx       # Contexte d'authentification
│   └── cart-context.tsx       # Contexte du panier
├── hooks/                     # Hooks React personnalisés
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                       # Utilitaires
│   └── utils.ts
├── public/                    # Fichiers statiques
│   ├── placeholder-logo.png
│   └── placeholder.svg
├── styles/                    # Fichiers CSS
│   └── globals.css
├── next.config.mjs           # Configuration Next.js
├── tailwind.config.js        # Configuration Tailwind CSS
├── tsconfig.json             # Configuration TypeScript
├── postcss.config.mjs        # Configuration PostCSS
├── package.json              # Dépendances du projet
└── README.md                 # Ce fichier
```

## 🔐 Authentification

### Contexte d'authentification (`context/auth-context.tsx`)

Le système d'authentification utilise un contexte React qui gère :
- La connexion/déconnexion des utilisateurs
- La vérification du rôle (admin ou serveur)
- La persistance de session avec localStorage

### Hooks d'authentification

```typescript
const { user, login, logout, isAuthenticated, isAdmin } = useAuth()
```

- `user` : Objet utilisateur actuel
- `login(username, password)` : Connexion utilisateur
- `logout()` : Déconnexion
- `isAuthenticated` : État de connexion
- `isAdmin` : Vérification du rôle admin

## 🛒 Contexte du panier (`context/cart-context.tsx`)

Gérez le panier des clients avec un contexte global React.

```typescript
const { cart, addToCart, removeFromCart, clearCart } = useCart()
```

## 📱 Composants UI

Le projet utilise **Shadcn/UI**, une collection de composants accessibles et personnalisables basés sur Radix UI. Composants disponibles :

- Button, Card, Input, Label
- Dialog, Drawer, Popover
- Accordion, Tabs, Pagination
- Select, Checkbox, Radio Group
- Toast, Alert, Badge
- Et plus encore...

Pour importer un composant :
```tsx
import { Button } from "@/components/ui/button"
```

## 🏗️ Scripts disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Créer une build de production
npm run build

# Lancer l'application en production
npm start

# Exécuter ESLint
npm run lint
```

## 📦 Dépendances principales

- `next` - Framework React moderne
- `react` et `react-dom` - Bibliothèques React
- `tailwindcss` - Framework CSS utilitaire
- `@radix-ui/*` - Primitives UI accessibles
- `lucide-react` - Icônes
- `@hookform/resolvers` - Résolveurs pour formulaires
- `date-fns` - Manipulation de dates
- `zod` - Validation de schémas TypeScript

## 🚀 Déploiement

### Vercel (recommandé pour Next.js)

1. Poussez votre code sur GitHub
2. Connectez votre repository à [Vercel](https://vercel.com)
3. Vercel déploiera automatiquement

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Dépannage

### Port 3000 déjà utilisé
```bash
npm run dev -- -p 3001
```

### Erreurs de cache
```bash
rm -rf .next
npm run dev
```

### Réinitialiser node_modules
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribuer

Les contributions sont bienvenues ! Pour contribuer :

1. Forkez le repository
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Rania** - Développeuse

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

**Version** : 0.1.0  
**Dernière mise à jour** : November 2025  
**Built with ❤️ using Next.js**
