# 🚀 Moniteur VPS

![🕒 Dernière mise à jour](https://img.shields.io/github/last-commit/merlincod/vpsmonitor)
![🐛 Issues](https://img.shields.io/github/issues/merlincod/vpsmonitor)
![🔧 Pull Requests](https://img.shields.io/github/issues-pr/merlincod/vpsmonitor)

👋 Bienvenue sur **Moniteur VPS** ! Ce projet te permet de garder un œil sur les performances de ton VPS en mode cool. C’est un petit dashboard qui te montre en temps réel ce qui se passe sous le capot.

## 🔥 Features

- **🧠 CPU Load** : Visualise l'utilisation de ton CPU.
- **💾 Mémoire** : Suis de près la mémoire utilisée par rapport au total.
- **📦 Disque** : Vérifie combien d'espace disque est utilisé.
- **⏱️ Uptime** : Vois depuis combien de temps ton serveur tourne sans broncher.
- **🔄 Mise à jour automatique** : Les stats se rafraîchissent toutes les 5 secondes. Pas besoin de F5 ! 😉

## 🚧 Prérequis

- **Node.js** >= 14
- **npm** ou **yarn**
- Un VPS ou un environnement de dev local (ça marche aussi)

## ⚙️ Installation & Lancement

1. **Clone le repo :**

   ```bash
   git clone https://github.com/merlincod/vpsmonitor.git
   cd vpsmonitor
   npm install
    node app.js```
Check le dashboard :
Ouvre ton navigateur à l'adresse suivante :
http://localhost:8000 ou
http://ipdetonvps:8000

## 🗂️ Structure du Projet
public/index.html : La vue principale pour ton dashboard.
public/style.css : Les styles bien stylés.
app.js : Le backend qui gère les stats du système avec Node.js.
package.json : Parce qu'on aime savoir quelles dépendances on utilise.

## 🌍 Déploiement en Prod
Pour le déployer sur ton serveur de prod :

Assure-toi que Node.js est installé.
Clone le repo sur le serveur.
Installe tout avec npm install et lance l'app avec node app.js.
Optionnel : Configurer un reverse proxy (genre Nginx) si besoin.

## 🙌 Contributions
Les PRs sont les bienvenues ! Si tu vois un truc à améliorer, ou si tu veux ajouter des features, n’hésite pas. Ouvre une issue ou envoie une PR.

## 📝 Licence
Ce projet est sous licence MIT. 📄 Voir le fichier LICENSE pour les détails.
