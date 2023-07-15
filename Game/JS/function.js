export function createCheckersBoard() {
    const boardContainer = document.getElementById('board');
    const squares = [];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleSquareClick);
            squares.push(cell);
            boardContainer.appendChild(cell);
        }
    }

    for (let i = 0; i < squares.length; i++) {
        const cell = squares[i];
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if ((row + col) % 2 === 0) {
            cell.classList.add('black');
        } else {
            cell.classList.add('red');
        }
    }
}

function handleSquareClick() {
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);
    console.log('Clicked on cell:', row, col);
}

