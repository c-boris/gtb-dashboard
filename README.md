# GTB Dashboard - Pilotage Visuel / Visual Monitoring

[Français](#français) | [English](#english)

---

## <a id="français"></a>Français

Ce projet est une interface de supervision de bâtiment (GTB) permettant de visualiser en temps réel l'état des pièces à partir d'une source de données JSON. Il répond aux exigences de clarté, de modularité et de performance attendues pour un outil de pilotage industriel.

### Approche Technique

Le projet a été conçu selon une architecture modulaire et orientée état, sans aucun framework (Vanilla JS ES6+), afin de garantir une performance maximale et une maintenance aisée.

- **Structure Data Driven UI** : Le DOM est généré dynamiquement à partir du JSON. Le fichier `mappings.js` agit comme une couche de traduction pure entre les états bruts du backend et les codes visuels du frontend.
- **State Management & Pattern Pub/Sub (MQTT-Ready)** : L'application implémente un pattern Observer (Pub/Sub) via le `RoomStore`. Cette architecture a été choisie pour sa compatibilité naturelle avec les protocoles IoT standards comme MQTT : le Store agit comme un broker local, facilitant l'intégration future de flux de données asynchrones provenant de capteurs réels.
- **Composants Réutilisables** : La création des widgets est isolée dans une fonction de rendu dédiée (`createRoomWidget`), facilitant l'évolution vers des Web Components.

### Choix d'Architecture : Pourquoi un Pub/Sub Global ?

L'architecture repose sur un Pub/Sub global avec un re-rendu ciblé de la grille. Ce choix a été privilégié pour :

1. **Synchronisation atomique** : Garantir la cohérence visuelle lors des filtrages croisés (Statut + Mode).
2. **Robustesse de l'UI State** : Faciliter la coordination entre les états transversaux (Focus, Expansion) sur l'ensemble des cartes.
3. **Pragmatisme et Performance** : Pour un dashboard de supervision, cette méthode offre le meilleur ratio maintenabilité/performance par rapport à un Pub/Sub granulaire qui ajouterait une complexité de gestion d'abonnements individuels inutile à cette échelle.

### Choix UX / UI

- **Hiérarchie Visuelle** : Utilisation d'icônes à tailles variables pour guider l'œil (Thermomètre 22px pour la donnée maîtresse, indicateurs 18px pour l'état, outils 16px).
- **Feedback Immédiat** : Gestion des états "Focus" pour isoler une pièce et "Détails" (pliage/dépliage) via un volet (overlay) fluide pour ne pas briser la grille de lecture.
- **Design System** : Utilisation de variables CSS (:root) pour une gestion globale des couleurs de statut et faciliter le support natif du Dark Mode.

### Fonctionnalités Implémentées

- **Grille Responsive** : Affichage optimisé sur desktop et mobile grâce à CSS Grid.
- **Système de Thème** : Support natif des modes Clair et Sombre.
- **Filtrage Dynamique** : Filtrage croisé par Statut (Situation normale, Attention requise, Problème détecté) et par Mode (Comfort, Eco, Off).
- **Accessibilité** : Utilisation d'icônes pour doubler l'information colorimétrique (accessibilité aux daltoniens) et attributs ARIA pour les contrôles de navigation.

[↑ Retour en haut](#gtb-dashboard---pilotage-visuel--visual-monitoring)

---

## <a id="english"></a>English

This project is a Building Management System (BMS) interface designed to visualize real-time room status from a JSON data source. It meets the requirements for clarity, modularity, and performance expected in an industrial monitoring tool.

### Technical Approach

The project features a modular, state-oriented architecture built with Vanilla JS (ES6+), ensuring maximum performance and ease of maintenance.

- **Data Driven UI Structure**: The DOM is generated dynamically from JSON. The `mappings.js` file acts as a pure translation layer between raw backend states and frontend visual codes.
- **State Management & Pub/Sub Pattern (MQTT-Ready)**: The application uses an Observer (Pub/Sub) pattern via the `RoomStore`. This architecture is designed to integrate seamlessly with IoT protocols like MQTT: the Store acts as a local broker for asynchronous sensor data.
- **Reusable Components**: Widget creation is isolated in a dedicated rendering function (`createRoomWidget`), allowing for easy evolution toward Web Components.

### Architectural Choice: Why Global Pub/Sub?

The architecture relies on a global Pub/Sub with targeted grid re-rendering. This choice was prioritized for:

1. **Atomic Synchronization**: Ensuring perfect visual consistency during cross-filtering (Status + Mode).
2. **Robust UI State**: Simplifying the coordination of transversal states (Focus, Expansion) across all cards.
3. **Pragmatism and Performance**: For this data volume, this method provides the optimal balance between performance and code maintainability compared to a more complex granular system.

### UX / UI Design Choices

- **Visual Hierarchy**: Variable icon sizes to guide the user's eye (Thermometer 22px, status indicators 18px, tool icons 16px).
- **Immediate Feedback**: Focus mode and smooth detail overlays (expand/collapse) to maintain the readability of the grid.
- **Design System**: CSS variables (:root) for centralized status management and native Dark Mode support.

### Implemented Features

- **Responsive Grid**: CSS Grid layout optimized for desktop and mobile.
- **Theme System**: Native Light and Dark mode support.
- **Dynamic Filtering**: Cross-filtering by Status (Normal, Warning, Error) and by Mode (Comfort, Eco, Off).
- **Accessibility**: Use of icons to double-code color information and ARIA attributes for navigation controls.

[↑ Back to top](#gtb-dashboard---pilotage-visuel--visual-monitoring)

---

## Installation

1. Clone the repository / Cloner le dépôt.
2. Open `index.html` via a local server (e.g., Live Server) for ES6 modules support.
