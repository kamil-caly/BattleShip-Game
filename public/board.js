export class Board {
    constructor(boardHTML, rows, cols, shipsCount) {
        this.boardHTML = boardHTML;
        this.rows = rows;
        this.cols = cols;
        this.shipsCount = shipsCount;
        this.initGameBoard(rows, cols);
        this.initHTMLBoard(rows, cols);
    }

    initHTMLBoard(rows, cols) {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let newField = document.createElement('div');
                newField.id = `${r}-${c}`;
                newField.classList.add('field');

                // test
                if (this.gameBoard.find(e => e.x === c && e.y === r)?.shipPart)
                    newField.classList.add('hit_field');

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
            let x = ship[ship.length - 1].x;
            let y = ship[ship.length - 1].y;

            switch (dir) {
                case 0:
                    x -= 1;
                    break;
                case 1:
                    y += 1;
                    break;
                case 2:
                    x += 1;
                    break;
                case 3:
                    y -= 1;
                default:
                    break;
            }

            let randomField;
            const existsField = ship.find(e => e.x === x && e.y === y);
            if (!existsField)
                randomField = this.gameBoard.find(e => e.x === x && e.y === y);

            if (!randomField?.shipPart && ship.length < 4) {
                randomField && ship.push(randomField);
                createShip(ship)
            } else {
                if (validateShip(ship)) {
                    for (let s of ship) {
                        this.gameBoard.filter(e => e.x === s.x && e.y === s.y)[0].shipPart = true;
                    }
                    this.shipsCount -= 1
                }
            }
        }

        const validateShip = (ship) => {
            console.log('ship: ', ship);
            for (let s of ship) {
                if (this.gameBoard.find(e => e.x === s.x - 1 & e.y === s.y)?.shipPart)
                    return false;
                if (this.gameBoard.find(e => e.x === s.x & e.y === s.y + 1)?.shipPart)
                    return false;
                if (this.gameBoard.find(e => e.x === s.x + 1 & e.y === s.y)?.shipPart)
                    return false;
                if (this.gameBoard.find(e => e.x === s.x & e.y === s.y - 1)?.shipPart)
                    return false;
            }

            return true;
        }

        while (this.shipsCount > 0) {
            console.log("game board: ", this.gameBoard);

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