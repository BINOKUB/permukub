🧩 Permu-kub
📖 Présentation & Objectif
Permu-kub est le petit frère sombre et retors de l'univers Binokub. Il s'agit d'un casse-tête de permutation spatiale et mathématique de haute précision où chaque mouvement sur le plateau déclenche une réaction en chaîne à travers la matrice.

Contrairement aux grilles de type Sudoku fondées sur l'élimination passive, Permu-kub repose sur une dynamique de troc et de tension systémique : l'ensemble du plateau forme une réserve globale où les tuiles doivent être agencées pour satisfaire des contraintes strictes de sommes géométriques.

⚙️ Fonctionnalités & Modes de Jeu
Formats de Grilles Adaptatifs :

6x6 (4 sous-blocs de 3x3) : Chaque ligne, chaque colonne et la diagonale principale de chaque sous-bloc doivent sommer exactement à 9 (chiffres de 1 à 6).

9x9 (9 sous-blocs de 3x3) : Le format expert où chaque sous-bloc vise une somme magique de 15 (chiffres de 1 à 9).

Mode 1 (Libre) : Résolution complète par permutation libre (swap) des tuiles à l'intérieur de la réserve globale du plateau.

Mode 2 (Tactique avec tuiles figées) : Des tuiles de base ancrées de manière aléatoire servent de piliers architecturaux inamovibles, obligeant le joueur à construire toute sa stratégie de permutation autour de ces contraintes.

Design Industriel & Minimaliste : Interface sombre, lisibilité chirurgicale et séparation nette des sous-blocs par des bordures renforcées.

🛠️ Détails Techniques & Architecture
Pile Technologique : Pur HTML5, CSS3 et JavaScript vanilla.

Compatibilité Locale : Conçu sans modules externes ES6 (utilisation d'objets globaux synchrones) pour garantir une exécution locale fluide et instantanée, même directement depuis le protocole file:// sans serveur web requis.

Modularité du Code : Séparation stricte des responsabilités en trois scripts distincts :

binoku_generator.js : Moteur de génération mathématique des blocs valides.

binoku_shuffler.js : Algorithme de mélange (Fisher-Yates) et gestion des ancrages fixes (Mode Tactique).

binoku_gameplay.js : Gestionnaire d'interactions, de sélection, de permutation et de validation dynamique des victoires.

🚀 Accès & Déploiement
Le jeu est accessible en ligne sur le sous-domaine officiel :
👉 permukub.binokub.com
