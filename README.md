# 🎓 Guide Fond Virtuel Zoom — École Porteurs de Vie

Site interactif pour guider les étudiants de l'école Porteurs de Vie dans la configuration de leur fond virtuel Zoom.

## 🌐 Fonctionnalités

- **Page d'accueil** professionnelle avec logo et présentation
- **Test de compatibilité interactif** — détecte si l'appareil supporte les fonds virtuels Zoom
- **Section par appareil** — iPhone, iPad, Android, Windows, Mac avec exigences détaillées
- **Guide pas à pas** — instructions adaptées à chaque type d'appareil
- **Téléchargement** — bouton pour télécharger l'image officielle du fond virtuel
- **FAQ** — 10 questions/réponses fréquentes
- **Support** — liens WhatsApp et email
- **Panneau Admin** — personnalisation sans toucher au code

## ⚙️ Personnalisation

### Via le panneau Admin (interface graphique)

Cliquez sur le bouton **"⚙️ Admin"** en bas à gauche du site pour :
- Changer le nom de l'école et le slogan
- Uploader le logo de l'école
- Uploader l'image officielle du fond virtuel
- Gérer les classes et campus
- Configurer les contacts WhatsApp et email

> Note : Les modifications via le panneau Admin sont sauvegardées dans le navigateur (localStorage). Pour une mise en ligne permanente, modifiez directement le fichier `js/main.js`.

### Via le fichier `js/main.js` (permanent)

Modifiez l'objet `CONFIG` en haut du fichier :

```javascript
const CONFIG = {
  school: {
    name: "École Porteurs de Vie",          // Nom de l'école
    shortName: "PDVie",                      // Abréviation
    tagline: "Cours en ligne via Zoom",      // Slogan
    logo: "images/logo.png",                 // Chemin vers le logo
    backgroundImage: "images/fond-zoom.jpg", // Image de fond officielle
    supportWhatsApp: "+33612345678",         // Numéro WhatsApp (ou null)
    supportEmail: "support@porteursdvie.fr", // Email de support
    supportEmailLabel: "support@porteursdvie.fr"
  },
  classes: [
    { name: "Classe A - Campus Principal", campus: "Campus Principal" },
    { name: "Classe B - Campus Nord", campus: "Campus Nord" },
    // Ajoutez autant de classes que nécessaire
  ]
};
```

### Images à placer dans le dossier `images/`

| Fichier | Description | Format recommandé |
|---|---|---|
| `logo.png` | Logo de l'école | PNG transparent, 200×200px |
| `fond-zoom.jpg` | Image officielle du fond virtuel | JPG, 1920×1080px |
| `favicon.png` | Icône du site | PNG, 32×32px |

## 🚀 Déploiement sur Netlify

### Option 1 : Glisser-déposer
1. Allez sur [netlify.com](https://netlify.com)
2. Faites glisser le dossier du projet dans la zone de dépôt
3. Le site est en ligne instantanément

### Option 2 : Via GitHub
1. Connectez votre dépôt GitHub `barrahost/pdvie-zoom-site` à Netlify
2. Configurez : Build command = (vide), Publish directory = `.`
3. Déployez automatiquement à chaque push

## 📁 Structure du projet

```
pdvie-zoom-site/
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles CSS
├── js/
│   └── main.js         # JavaScript (config + interactions)
├── images/
│   ├── logo.png        # Logo de l'école (à ajouter)
│   ├── fond-zoom.jpg   # Image fond virtuel (à ajouter)
│   └── favicon.png     # Favicon (à ajouter)
├── assets/             # Ressources supplémentaires
└── README.md           # Ce fichier
```

## 📋 Informations officielles Zoom

Les exigences de compatibilité sont basées sur la documentation officielle Zoom (mise à jour avril 2025) :
- [Exigences système pour les fonds virtuels](https://support.zoom.com/hc/fr/article?id=zm_kb&sysparm_article=KB0060019)

### Résumé des compatibilités

| Appareil | Compatible | Conditions |
|---|---|---|
| iPhone 8+ | ✅ Oui | iOS 14+, Zoom 5.6.6+ |
| iPhone 7 et antérieur | ❌ Non | Non supporté |
| iPad Pro / iPad 5e gen+ | ✅ Oui | iPadOS 14+, Zoom 5.6.6+ |
| Anciens iPads | ❌ Non | Non supporté |
| Android 8+ (Samsung, Xiaomi...) | ⚠️ Partiel | arm64, 8 cœurs, 3 Go RAM |
| Android 7 et inférieur | ❌ Non | Non supporté |
| Windows 10/11 | ✅ Oui | Intel i3-8000+ ou AMD 8 cœurs |
| macOS Mojave+ | ✅ Oui | Tous Mac modernes |

## 🛠️ Technologies utilisées

- HTML5 / CSS3 / JavaScript vanilla (aucune dépendance externe)
- Compatible tous navigateurs modernes
- Responsive mobile-first
- Aucun framework requis — déploiement statique simple

## 📞 Contact

Pour toute question sur ce site, contactez l'équipe technique de l'école Porteurs de Vie.
