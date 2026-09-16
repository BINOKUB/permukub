/* ==========================================
   BINOKU GENERATOR v2.1.0
   ========================================== */

const BinokuGenerator = {
    // Banque de blocs 3x3 valides pour le format 6x6 (somme = 9, chiffres 1-6)
    validBlocks6x6: [
        [[1, 2, 6], [2, 6, 1], [6, 1, 2]],
        [[1, 6, 2], [6, 2, 1], [2, 1, 6]],
        [[2, 1, 6], [1, 6, 2], [6, 2, 1]],
        [[2, 3, 4], [3, 4, 2], [4, 2, 3]],
        [[2, 4, 3], [4, 3, 2], [3, 2, 4]],
        [[3, 2, 4], [2, 4, 3], [4, 3, 2]],
        [[1, 4, 4], [4, 4, 1], [4, 1, 4]],
        [[4, 1, 4], [1, 4, 4], [4, 4, 1]]
    ],

    // Banque de blocs 3x3 valides pour le format 9x9 (somme = 15, chiffres 1-9)
    validBlocks9x9: [
        [[8, 1, 6], [3, 5, 7], [4, 9, 2]], // Carré magique Lo Shu de base
        [[6, 1, 8], [7, 5, 3], [2, 9, 4]],
        [[4, 3, 8], [9, 5, 1], [2, 7, 6]],
        [[2, 7, 6], [9, 5, 1], [4, 3, 8]],
        [[6, 7, 2], [1, 5, 9], [8, 3, 4]],
        [[8, 3, 4], [1, 5, 9], [6, 7, 2]],
        [[2, 9, 4], [7, 5, 3], [6, 1, 8]],
        [[4, 9, 2], [3, 5, 7], [8, 1, 6]],
        // Variantes semi-magiques robustes
        [[1, 5, 9], [8, 3, 4], [6, 7, 2]],
        [[9, 1, 5], [4, 8, 3], [2, 6, 7]]
    ],

    // Génère une grille complète résolue de taille N (6 ou 9)
    generateSolvedGrid(size = 6) {
        let grid = Array(size).fill(0).map(() => Array(size).fill(0));
        let numBlocks = size / 3; // 2 pour 6x6 (4 blocs), 3 pour 9x9 (9 blocs)
        let blockBank = (size === 9) ? this.validBlocks9x9 : this.validBlocks6x6;

        for (let br = 0; br < numBlocks; br++) {
            for (let bc = 0; bc < numBlocks; bc++) {
                let randIdx = Math.floor(Math.random() * blockBank.length);
                let selectedBlock = blockBank[randIdx];

                // Insertion du sous-bloc 3x3 dans la grande matrice
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        grid[br * 3 + r][bc * 3 + c] = selectedBlock[r][c];
                    }
                }
            }
        }

        return grid;
    }
};
