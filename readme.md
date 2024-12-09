# 🚀 Moniteur VPS

![🕒 Dernière mise à jour](https://img.shields.io/github/last-commit/merlincod/vpsmonitor)
![🐛 Issues](https://img.shields.io/github/issues/merlincod/vpsmonitor)
![🔧 Pull Requests](https://img.shields.io/github/issues-pr/merlincod/vpsmonitor)

👋 Bienvenue sur **Moniteur VPS** ! Ce projet te permet de garder un œil sur les performances de ton VPS en mode cool. C'est un petit dashboard qui te montre en temps réel ce qui se passe sous le capot.

## 🔥 Features

- **🧠 CPU Load** : Visualise l'utilisation de ton CPU en temps réel
- **💾 Mémoire** : Suis de près la mémoire utilisée par rapport au total
- **📦 Disque** : Vérifie combien d'espace disque est utilisé
- **⏱️ Uptime** : Vois depuis combien de temps ton serveur tourne sans broncher
- **🌙 Thème Sombre** : Interface adaptative avec mode sombre
- **📊 Statistiques Détaillées** : Vue approfondie des métriques système
- **🔄 Mise à jour automatique** : Les stats se rafraîchissent toutes les 3 secondes

## 🎨 Nouveautés v1.1.0

- Interface utilisateur améliorée avec thème sombre
- Vue statistiques détaillée
- Correction de bugs et optimisations
- Pour plus de détails, consultez [BUGFIXES.md](BUGFIXES.md)

## 🚧 Prérequis

- **Node.js** >= 14
- **npm** ou **yarn**
- Un VPS ou un environnement de dev local

## ⚙️ Installation & Lancement

1. **Clone le repo :**
   ```bash
   git clone https://github.com/merlincod/vpsmonitor.git
   cd vpsmonitor
   ```

2. **Installe les dépendances :**
   ```bash
   npm install
   ```

3. **Lance l'application :**
   ```bash
   npm start
   ```

4. **Accède au dashboard :**
   - Ouvre ton navigateur à l'adresse : `http://localhost:8000`
   - Ou depuis ton VPS : `http://ipdetonvps:8000`

## 🗂️ Structure du Projet

```
.
├── public/
│   ├── css/
│   │   ├── themes.css
│   │   └── stats.css
│   ├── js/
│   │   ├── charts.js
│   │   ├── navigation.js
│   │   ├── stats.js
│   │   └── theme.js
│   └── index.html
├── src/
│   └── utils/
├── server.js
├── package.json
├── README.md
└── BUGFIXES.md
```

## 🌍 Déploiement en Production

1. **Prépare ton serveur :**
   - Assure-toi que Node.js est installé
   - Clone le repo sur le serveur
   - Configure les droits d'accès si nécessaire

2. **Installation :**
   ```bash
   npm install
   ```

3. **Lancement :**
   ```bash
   npm run start
   ```

4. **Configuration serveur web (optionnel) :**
   - Configure un reverse proxy (nginx, apache)
   - Sécurise l'accès avec HTTPS
   - Configure les en-têtes de sécurité

## 🙌 Contributions

Les PRs sont les bienvenues ! Si tu vois un truc à améliorer, n'hésite pas :
1. Fork le projet
2. Crée une branche pour ta feature
3. Commit tes changements
4. Push sur ta branche
5. Ouvre une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.