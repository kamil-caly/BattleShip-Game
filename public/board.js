export class Board {
    constructor(boardHTML, rows, cols, shipsCount) {
        this.boardHTML = boardHTML;
        this.rows = rows;
        this.cols = cols;
        this.initHTMLBoard(rows, cols);
        this.initGameBoard(rows, cols);
        this.shipsCount = shipsCount;
    }

    initHTMLBoard(rows, cols) {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let newField = document.createElement('div');
                newField.id = `${r}-${c}`;
                newField.classList.add('field');
                this.boardHTML.appendChild(newField);
            }
        }
    }

    initGameBoard(rows, cols) {
        this.gameBoard = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                this.gameBoard.push({ x: c, y: r, shipPart: false })
            }
        }

        const createShip = (ship) => {
            const dir = Math.floor(Math.random() * 4);
            let x = 0;
            let y = 0;

            switch (dir) {
                case 0:
                    x -= 1;
                case 1:
                    y += 1;
                case 2:
                    x += 1;
                case 3:
                    y -= 1;
                default:
                    break;
            }

            const randomField = this.gameBoard.find(e => e.x === x && e.y === y);

            if (!randomField?.shipPart && ship.length < 4) {
                ship.push(randomField);
                createShip(ship)
            } else {
                if (validateShip(ship)) {
                    // upload game board
                    // ...
                    this.shipsCount -= 1
                }
            }
        }

        while (this.shipsCount > 0) {

            const x = Math.floor(Math.random() * cols);
            const y = Math.floor(Math.random() * rows);
            const randomField = this.gameBoard.find(e => e.x === x && e.y === y);
            const ship = []

            if (!randomField.shipPart) {
                ship.push(randomField);
                createShip(ship)
            }
        }
    }

}