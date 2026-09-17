/* ==========================================
   BINOKU GENERATOR v2.2.1
   ========================================== */

const BinokuGenerator = {
    // Banque unifiée de blocs 3x3 valides : chaque ligne, colonne et diagonale principale somme STRICTEMENT à 9
    validBlocksSum9: [
        [[1, 2, 6], [2, 6, 1], [6, 1, 2]],
        [[1, 3, 5], [3, 5, 1], [5, 1, 3]],
        [[1, 4, 4], [4, 4, 1], [4, 1, 4]],
        [[1, 5, 3], [5, 3, 1], [3, 1, 5]],
        [[1, 6, 2], [6, 2, 1], [2, 1, 6]],
        [[2, 1, 6], [1, 6, 2], [6, 2, 1]],
        [[2, 3, 4], [3, 4, 2], [4, 2, 3]],
        [[2, 4, 3], [4, 3, 2], [3, 2, 4]],
        [[3, 2, 4], [2, 4, 3], [4, 3, 2]],
        [[3, 5, 1], [1, 3, 5], [5, 1, 3]],
        [[4, 1, 4], [1, 4, 4], [4, 4, 1]],
        [[4, 2, 3], [2, 3, 4], [3, 4, 2]],
        [[5, 1, 3], [1, 3, 5], [3, 5, 1]],
        [[6, 1, 2], [1, 2, 6], [2, 6, 1]]
    ],

    // Génère une grille complète résolue de taille N (6 ou 9), toujours basée sur la somme cible de 9
    generateSolvedGrid(size = 6) {
        let grid = Array(size).fill(0).map(() => Array(size).fill(0));
        let numBlocks = size / 3; // 2 pour 6x6 (4 blocs), 3 pour 9x9 (9 blocs)

        for (let br = 0; br < numBlocks; br++) {
            for (let bc = 0; bc < numBlocks; bc++) {
                let randIdx = Math.floor(Math.random() * this.validBlocksSum9.length);
                let selectedBlock = this.validBlocksSum9[randIdx];

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
