// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const playerX = document.getElementById('playerX');
    const playerO = document.getElementById('playerO');
    const status = document.getElementById('status');
    let isXTurn = true;
    let gameState = Array(9).fill(null);

    const checkWin = (gameState) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;

        if (!gameState[index]) {
            gameState[index] = isXTurn ? 'X' : 'O';
            e.target.textContent = gameState[index];
            const winner = checkWin(gameState);
            if (winner) {
                status.textContent = `${winner} wins!`;
                cells.forEach(cell => cell.removeEventListener('click', handleClick));
            } else if (gameState.every(cell => cell)) {
                status.textContent = 'Draw!';
            } else {
                isXTurn = !isXTurn;
                updatePlayerIndicator();
            }
        }
    };

    const resetGame = () => {
        gameState = Array(9).fill(null);
        isXTurn = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleClick);
        });
        status.textContent = '';
        updatePlayerIndicator();
    };

    const updatePlayerIndicator = () => {
        if (isXTurn) {
            playerX.classList.add('active');
            playerO.classList.remove('active');
        } else {
            playerX.classList.remove('active');
            playerO.classList.add('active');
        }
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);

    updatePlayerIndicator();
});
