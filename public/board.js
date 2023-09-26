export class Board {
    constructor(rows, cols, shipsCount, gameBoard) {
        this.rows = rows;
        this.cols = cols;
        this.shipsCount = shipsCount;
        this.gameBoard = gameBoard ?? [];
    }

    initGameBoard() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
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
                    tempShipCount -= 1
                }
            }
        }

        const validateShip = (ship) => {
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

        let tempShipCount = this.shipsCount;
        while (tempShipCount > 0) {

            const x = Math.floor(Math.random() * this.cols);
            const y = Math.floor(Math.random() * this.rows);
            const randomField = this.gameBoard.find(e => e.x === x && e.y === y);
            const ship = []

            if (!randomField.shipPart) {
                ship.push(randomField);
                createShip(ship)
            }
        }
    }
}


export class PlayerBoard extends Board {
    constructor(rows, cols, shipsCount, gameBoard) {
        super(rows, cols, shipsCount, gameBoard)
    }

    initHTMLBoard(HTMLBoard) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let newField = document.createElement('div');
                newField.id = `${c}-${r}-Player`;
                newField.classList.add('field');

                if (this.gameBoard.find(e => e.x === c && e.y === r)?.shipPart)
                    newField.classList.add('hit_field');

                HTMLBoard.appendChild(newField);
            }
        }
    }

    checkField(x, y) {
        const checkedField = this.gameBoard.find(e => e.x === x && e.y === y);
        if (!checkedField || this.isFieldChecked(x, y))
            return;

        const clickedDiv = document.getElementById(`${x}-${y}-Player`);

        clickedDiv.classList.add('missed_field');
        const span = document.createElement('span');
        span.classList.add('X_Player');
        clickedDiv.appendChild(span);
    }

    isFieldChecked(x, y) {
        const clickedDiv = document.getElementById(`${x}-${y}-Player`);
        return clickedDiv.classList.contains('missed_field');
    }
}


export class OpponentBoard extends Board {
    constructor(rows, cols, shipsCount, gameBoard) {
        super(rows, cols, shipsCount, gameBoard)
    }

    initHTMLBoard(HTMLBoard) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let newField = document.createElement('div');
                newField.id = `${c}-${r}-Opponent`;
                newField.classList.add('field');

                // if (this.gameBoard.find(e => e.x === c && e.y === r)?.shipPart)
                //     newField.classList.add('hit_field');

                HTMLBoard.appendChild(newField);
            }
        }
    }

    checkField(x, y) {
        const checkedField = this.gameBoard.find(e => e.x === x && e.y === y);
        if (!checkedField || this.isFieldChecked(x, y))
            return;

        const clickedDiv = document.getElementById(`${x}-${y}-Opponent`);
        if (checkedField.shipPart) {
            clickedDiv.classList.add('hit_field');
        } else {
            clickedDiv.classList.add('missed_field');
            const span = document.createElement('span');
            span.classList.add('X_Opponent');
            clickedDiv.appendChild(span);
        }
    }

    isFieldChecked(x, y) {
        const clickedDiv = document.getElementById(`${x}-${y}-Opponent`);
        return clickedDiv.classList.length > 1;
    }

    checkWin(boardHTML) {
        const allFoundShipParts = boardHTML.querySelectorAll('.hit_field');
        return allFoundShipParts?.length >= this.shipsCount * 4;
    }
}