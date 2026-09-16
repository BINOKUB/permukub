/* ==========================================
   BINOKU SHUFFLER v2.2.0
   ========================================== */

const BinokuShuffler = {
    shuffle(solvedGrid, mode = 1) {
        let size = solvedGrid.length;
        let grid = solvedGrid.map(row => [...row]);
        let frozenMap = Array(size).fill(0).map(() => Array(size).fill(false));

        if (mode === 2) {
            // En mode Tactique, on fige une tuile de manière aléatoire dans CHAQUE sous-bloc 3x3
            let numBlocks = size / 3;
            for (let br = 0; br < numBlocks; br++) {
                for (let bc = 0; bc < numBlocks; bc++) {
                    // Choisir une position aléatoire (0, 1 ou 2) à l'intérieur du sous-bloc 3x3
                    let localR = Math.floor(Math.random() * 3);
                    let localC = Math.floor(Math.random() * 3);
                    
                    let targetR = br * 3 + localR;
                    let targetC = bc * 3 + localC;
                    
                    frozenMap[targetR][targetC] = true;
                }
            }
        }

        let movableTiles = [];
        let movableCoords = [];

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (!frozenMap[r][c]) {
                    movableTiles.push(grid[r][c]);
                    movableCoords.push({r, c});
                }
            }
        }

        // Mélange de Fisher-Yates des tuiles mobiles
        for (let i = movableTiles.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = movableTiles[i];
            movableTiles[i] = movableTiles[j];
            movableTiles[j] = temp;
        }

        // Réinjection des tuiles dans les emplacements non figés
        for (let i = 0; i < movableCoords.length; i++) {
            let coord = movableCoords[i];
            grid[coord.r][coord.c] = movableTiles[i];
        }

        return { grid, frozenMap };
    }
};
