/* ==========================================
   BINOKU GAMEPLAY v2.1.0
   ========================================== */

const BinokuGameplay = {
    gridSize: 6,
    currentGrid: [],
    frozenMap: [],
    selectedTile: null,
    gameMode: 1,

    init(size = 6, mode = 1) {
        this.gridSize = size;
        this.gameMode = mode;
        let solved = BinokuGenerator.generateSolvedGrid(this.gridSize);
        let shuffled = BinokuShuffler.shuffle(solved, this.gameMode);

        this.currentGrid = shuffled.grid;
        this.frozenMap = shuffled.frozenMap;
        this.selectedTile = null;

        this.render();
        this.updateStatus();
    },

    render() {
        const gridContainer = document.getElementById('binoku-grid');
        gridContainer.innerHTML = '';

        // Applique la classe CSS de grille (grid-6x6 ou grid-9x9)
        gridContainer.className = `binokub-grid grid-${this.gridSize}x${this.gridSize}`;

        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                const tile = document.createElement('div');
                tile.className = 'binoku-tile';
                tile.textContent = this.currentGrid[r][c];

                // Ajout des bordures visuelles pour détacher les sous-blocs 3x3
                if ((c + 1) % 3 === 0 && c < this.gridSize - 1) {
                    tile.classList.add('border-right-block');
                }
                if ((r + 1) % 3 === 0 && r < this.gridSize - 1) {
                    tile.classList.add('border-bottom-block');
                }

                if (this.frozenMap[r][c]) {
                    tile.classList.add('tile-frozen');
                    tile.title = "Tuile fixe (Ancrage de base)";
                } else {
                    tile.addEventListener('click', () => this.handleTileClick(r, c));
                }

                if (this.selectedTile && this.selectedTile.r === r && this.selectedTile.c === c) {
                    tile.classList.add('selected');
                }

                gridContainer.appendChild(tile);
            }
        }
    },

    handleTileClick(r, c) {
        if (this.frozenMap[r][c]) return;

        if (!this.selectedTile) {
            this.selectedTile = { r, c };
        } else {
            let temp = this.currentGrid[this.selectedTile.r][this.selectedTile.c];
            this.currentGrid[this.selectedTile.r][this.selectedTile.c] = this.currentGrid[r][c];
            this.currentGrid[r][c] = temp;

            this.selectedTile = null;
            this.checkWinCondition();
        }
        this.render();
    },

    checkSubBlock(startR, startC) {
        let sub = [];
        let targetSum = (this.gridSize === 9) ? 15 : 9;

        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(this.currentGrid[startR + i][startC + j]);
            }
            sub.push(row);
        }

        // Vérification des lignes
        for (let i = 0; i < 3; i++) {
            if (sub[i][0] + sub[i][1] + sub[i][2] !== targetSum) return false;
        }
        // Vérification des colonnes
        for (let j = 0; j < 3; j++) {
            if (sub[0][j] + sub[1][j] + sub[2][j] !== targetSum) return false;
        }
        // Vérification de la diagonale principale
        if (sub[0][0] + sub[1][1] + sub[2][2] !== targetSum) return false;

        return true;
    },

    checkWinCondition() {
        let numBlocks = this.gridSize / 3;
        let allValid = true;

        for (let br = 0; br < numBlocks; br++) {
            for (let bc = 0; bc < numBlocks; bc++) {
                if (!this.checkSubBlock(br * 3, bc * 3)) {
                    allValid = false;
                    break;
                }
            }
            if (!allValid) break;
        }

        const statusEl = document.getElementById('binoku-status');

        if (allValid) {
            statusEl.textContent = "Victoire ! Tous les sous-blocs sont parfaitement verrouillés !";
            statusEl.style.color = "var(--success-color)";
        } else {
            statusEl.textContent = `Partie en cours (${this.gridSize}x${this.gridSize}). Ajustez les permutations.`;
            statusEl.style.color = "var(--text-accent)";
        }
    },

    updateStatus() {
        const statusEl = document.getElementById('binoku-status');
        let modeDesc = (this.gameMode === 2) ? "Tactique (Centres ancrés)" : "Libre";
        statusEl.textContent = `Mode ${modeDesc} - Grille ${this.gridSize}x${this.gridSize} active.`;
        statusEl.style.color = "var(--text-accent)";
    }
};

// Gestion des sélections dans le menu principal
document.addEventListener('DOMContentLoaded', () => {
    const menuScreen = document.getElementById('menu-screen');
    const gameScreen = document.getElementById('game-screen');

    let selectedSize = 6;
    let selectedMode = 1;

    // Boutons de taille
    document.getElementById('size-6').addEventListener('click', (e) => {
        document.getElementById('size-6').classList.add('active');
        document.getElementById('size-9').classList.remove('active');
        selectedSize = 6;
    });

    document.getElementById('size-9').addEventListener('click', (e) => {
        document.getElementById('size-9').classList.add('active');
        document.getElementById('size-6').classList.remove('active');
        selectedSize = 9;
    });

    // Boutons de mode
    document.getElementById('mode-1').addEventListener('click', (e) => {
        document.getElementById('mode-1').classList.add('active');
        document.getElementById('mode-2').classList.remove('active');
        selectedMode = 1;
    });

    document.getElementById('mode-2').addEventListener('click', (e) => {
        document.getElementById('mode-2').classList.add('active');
        document.getElementById('mode-1').classList.remove('active');
        selectedMode = 2;
    });

    // Lancement de la partie
    document.getElementById('btn-start-game').addEventListener('click', () => {
        menuScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        BinokuGameplay.init(selectedSize, selectedMode);
    });

    document.getElementById('binoku-menu-btn').addEventListener('click', () => {
        gameScreen.style.display = 'none';
        menuScreen.style.display = 'flex';
    });

    document.getElementById('binoku-reset-btn').addEventListener('click', () => {
        BinokuGameplay.init(BinokuGameplay.gridSize, BinokuGameplay.gameMode);
    });
});
