---
name: cv-redesign-pivot
description: >
  Utilise cette skill pour créer ou refaire un CV complet lorsque l'utilisateur
  souhaite postuler à un poste différent de son domaine actuel (pivot de carrière),
  ou pour transformer un CV existant en un document visuellement frappant et
  repositionné pour un nouveau rôle. Déclenche cette skill dès que l'utilisateur
  mentionne : "refaire mon CV", "postuler à un poste de", "adapter mon profil",
  "CV pour un poste multimédia / CM / marketing / design / dev / commercial", ou
  dès qu'un fichier PDF/DOCX de CV est partagé avec une demande de refonte.
  La skill produit toujours deux livrables : un fichier HTML haute-fidélité du CV
  ET un fichier SKILL.md documentant le processus pour réutilisation future.
---

# CV Redesign — Pivot de Poste

## Objectif
Transformer un CV existant pour un nouveau poste cible. Le résultat doit être :
- **Visuellement unique** (pas de template générique)
- **Sémantiquement repositionné** (mêmes expériences, nouveau prisme)
- **Prêt à l'impression** (format A4, HTML exportable en PDF)

---

## Étape 0 — Lire le CV source

Si un fichier est fourni, l'extraire et identifier :
- Informations personnelles (nom, contact, ville)
- Expériences professionnelles (employeur, dates, missions)
- Projets techniques ou personnels
- Formation
- Compétences techniques et soft skills
- Langues
- Centres d'intérêt

> Ne garder que les éléments transférables au poste cible. Reformuler
> les missions en mettant en avant les compétences pertinentes pour le nouveau rôle.

---

## Étape 1 — Identifier le poste cible

Si l'utilisateur ne l'a pas précisé, demander :
1. Quel est le poste exact visé ?
2. Y a-t-il des compétences spécifiques du secteur à mettre en avant ?
3. Préférence de style (minimaliste, coloré, créatif, corporate) ?

---

## Étape 2 — Plan de design

Avant d'écrire le code HTML, définir un système de design en 4 points :

### Palette (4–6 couleurs)
- Fond principal, fond secondaire (sidebar)
- Couleur d'accent primaire, couleur d'accent secondaire
- Texte principal, texte atténué

### Typographie
- Police d'affichage (nom, titres) : choisir sur Google Fonts, caractère fort
- Police de corps : lisible, neutre, complémentaire
- Échelle : définir 4–5 tailles (display, heading, body, caption, tag)

### Layout
- Structure : sidebar gauche + contenu principal OU pleine largeur OU grille mixte
- Format : A4 en pixels (794px × 1123px ou mm équivalent)
- L'élément signature : ce qui rend ce CV immédiatement mémorable

### Repositionnement sémantique
Pour chaque section du CV source, décider :
- ✅ Conserver tel quel
- ✏️ Reformuler (changer l'angle, mettre en avant d'autres aspects)
- 🗑️ Supprimer (non pertinent pour le poste cible)
- ➕ Ajouter (nouvelle section pertinente, ex: "Projets créatifs", "Présence en ligne")

---

## Étape 3 — Créer le fichier HTML

### Structure HTML requise
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <!-- Google Fonts via CDN -->
  <link href="https://fonts.googleapis.com/css2?family=FONT_NAME&display=swap" rel="stylesheet">
  <style>
    /* Variables CSS centralisées */
    :root {
      --dark: #COULEUR;
      --accent: #COULEUR;
      --accent2: #COULEUR;
      --white: #FFFFFF;
    }
    /* Format A4 imprimable */
    html, body { width: 210mm; min-height: 297mm; margin: 0 auto; }
    /* print-color-adjust pour les fonds colorés */
    * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  </style>
</head>
<body>
  <!-- Layout 2 colonnes : sidebar + main, OU autre layout choisi -->
</body>
</html>
```

### Règles de qualité visuelle
- **Sidebar** : fond foncé ou coloré, texte clair, badge avatar avec initiales
- **Titres de section** : petites majuscules + ligne décorative
- **Tags de compétences** : pills colorées (2 variantes : accent primaire / secondaire)
- **Barres de langues** : gradient horizontal
- **Cartes de formation** : grille 2 colonnes, bordure top colorée
- **Expériences** : en-tête avec titre, entreprise, badge de date
- **Bullets** : flèches `▸` colorées, pas de puces standard HTML

### Éléments signature à envisager
- Gradient sur le nom (CSS `background-clip: text`)
- Blobs décoratifs en `::before` / `::after` sur la sidebar
- Badge "rôle" avec gradient linéaire
- Micro-animations CSS au hover (pour version web)

---

## Étape 4 — Repositionnement par poste

### Community Manager / Multimédia
Mettre en avant :
- Toute expérience d'animation, formation, prise de parole
- Gestion de communautés (taille, fréquence, impact)
- Production de contenu (même technique ou pédagogique)
- Compétences relationnelles et service client
- Projets avec interface publique ou dashboard

Reformuler :
- "Analyse d'incidents" → "Résolution rapide de problèmes utilisateurs"
- "Déploiement d'agents Wazuh" → "Mise en place d'outils de monitoring"
- "Club informatique" → "Direction d'une communauté tech active"

### Développeur / Tech
Mettre en avant :
- Projets techniques avec stack précise
- Contributions open source ou personnelles
- Automatisations et scripts produits
- Architecture de systèmes

### Marketing / Commercial
Mettre en avant :
- Métriques de performance (taux de conversion, volume clients)
- Gestion de la relation client
- Communication et persuasion

---

## Étape 5 — Livraison

Sauvegarder le fichier HTML dans `/mnt/user-data/outputs/` avec un nom explicite :
```
cv_[nom]_[poste]_[date].html
```

Appeler `present_files` pour remettre le fichier à l'utilisateur.

Mentionner comment exporter en PDF :
- Ouvrir dans Chrome/Edge → Imprimer → Enregistrer comme PDF
- Ou : `wkhtmltopdf --page-size A4 cv.html cv.pdf`

---

## Étape 6 — SKILL.md de documentation

Après chaque refonte, optionnellement créer un fichier SKILL.md récapitulatif
des choix de design effectués pour ce CV, afin de faciliter les futures
itérations ou déclinaisons (version anglaise, lettre de motivation assortie).

---

## Contraintes à respecter

- **Pas de photo réelle** dans le HTML — utiliser un badge avec les initiales
- **Toujours tester l'impression** : vérifier que `print-color-adjust: exact` est présent
- **Google Fonts uniquement** pour les polices externes (CDN fiable)
- **Pas de JavaScript requis** pour le CV statique — CSS pur suffit
- **Largeur fixe 210mm** — ne pas utiliser de layout responsive pour le CV imprimé
- **Toutes les couleurs en variables CSS** — facilite les ajustements rapides

---

## Exemple de reformulation (Cybersécurité → Community Manager)

| CV d'origine | CV repositionné |
|---|---|
| Responsable Club Informatique | Fondateur &amp; Animateur d'une communauté tech (15+ membres) |
| Organisation d'ateliers cybersécurité | Production et diffusion de contenu pédagogique numérique |
| Sensibilisation phishing | Campagnes de sensibilisation grand public aux risques numériques |
| Conseiller Client MOOV AFRICA | Accompagnement client haute-fréquence (50+/jour) avec formation |
| EasyPass dashboard web | Conception d'interface web grand public — temps réel &amp; UX |

---

## Références de design

Pour l'inspiration :
- [Typewolf](https://www.typewolf.com) — paires de polices
- [Coolors](https://coolors.co) — génération de palettes
- [Google Fonts](https://fonts.google.com) — polices libres
- [Dribbble CV tags](https://dribbble.com/tags/resume) — exemples visuels
