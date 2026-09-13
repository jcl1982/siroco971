# Site du Siroco des Abymes (Guadeloupe)

Site vitrine du club, construit autour du logo fourni : vert sapin et blanc, avec un accent chaud caribéen.

## Identité visuelle

- Couleurs : vert du blason en couleur principale, blanc cassé en fond, un accent soleil/corail pour les boutons et chiffres clés.
- Logo affiché dans l'en-tête, le pied de page et l'icône de l'onglet du navigateur.
- Typographie sportive : titres condensés en capitales (rappel du lettrage « SIROCO »), texte courant très lisible.
- Ambiance : photos de match plein cadre, blocs nets, motif croissant inspiré du logo en filigrane.

## Pages et contenu

Une page d'accueil complète, en sections :

1. **Bandeau d'accueil** — logo, nom du club, « Les Abymes, Guadeloupe », deux boutons : Nous rejoindre / Voir le calendrier.
2. **Le club** — présentation, valeurs, chiffres clés (nombre de licenciés, équipes, années d'existence).
3. **Équipes** — cartes par catégorie (seniors, U17, U15, U13, école de foot, féminines).
4. **Calendrier & résultats** — derniers résultats et prochains matchs sous forme de liste de rencontres (domicile/extérieur, score, date).
5. **Actualités** — trois articles en vignettes avec image et date.
6. **Nous rejoindre** — informations d'inscription, horaires d'entraînement, documents à fournir.
7. **Contact & pied de page** — adresse du stade, téléphone, e-mail, réseaux sociaux, plan d'accès en texte.

Le menu du haut permet de naviguer entre ces sections, et le site s'adapte au téléphone.

## Contenu à confirmer

Les textes, horaires, coordonnées, résultats et photos seront des exemples réalistes. Dites-moi ensuite les vraies informations (adresse du stade, téléphone, e-mail, catégories réelles, résultats) et je les remplace.

## Détails techniques

- Route unique `/` (remplace la page d'accueil par défaut), sections ancrées.
- Jetons de couleur en oklch dans `src/styles.css` (`--primary` vert du club, `--accent` chaud), aucune couleur codée en dur dans les composants.
- Logo téléversé publié via Lovable Assets, importé par pointeur `.asset.json`.
- Photos d'ambiance générées (terrain, jeunes joueurs, tribune) et stockées dans `src/assets`.
- Métadonnées de page : titre et description propres au club, og/twitter renseignés.
