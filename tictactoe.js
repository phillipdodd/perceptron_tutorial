class Square {
    constructor(name) {
        this.name = name;
        this.value = 0;
        this.belongsToRows = [];
        this.html = this.generateHTML();
    }

    generateHTML() {
        let [xbutton, ybutton] = this.generateButtons();
        let div = document.createElement('div');
        div.appendChild(xbutton);
        div.appendChild(ybutton);
        return div;
    }

    generateButtons() {
        var x = document.createElement("button");
        x.innerHTML = "x";
        x.onclick = this.createMoveLoggerForN(1);

        var o = document.createElement("button");
        o.innerHTML = "o";
        o.onclick = this.createMoveLoggerForN(-1);

        return [x, o];
    }

    createMoveLoggerForN(n) {
        var fn = this.logMove;
        return function () {
            fn(n);
        }
    }

    logMove(n) {
        console.log(`logging `)
        let val = this.value;
        if (this.value === 0) {
            this.value += n;
            this.updateRows(n);
        } else {
            throw Error(`This Square already contains a move: ${this.value}`)
        }
    }

    addToRow(row) {
        this.belongsToRows.push(row);
    }

    updateRows(n) {
        this.belongsToRows.forEach(row => {
            row.update(n)
        });
    }


}

class Row {
    constructor(...squares) {
        this.value = 0;
        squares.forEach(square => {
            square.addToRow(this);
        });
    }

    update(n) {
        this.value += n;
        if (Math.abs(this.value) === 3) {
            if (this.value > 0) {
                console.log('x has won')
            } else {
                console.log('o has won')
            }
        }
    }
}

class Grid {
    constructor() {
        this.topLeft = new Square('topLeft');
        this.topMiddle = new Square('topMiddle');
        this.topRight = new Square('topRight');

        this.midLeft = new Square('midLeft');
        this.midMiddle = new Square('midMiddle');
        this.midRight = new Square('midRight');

        this.botLeft = new Square('botLeft');
        this.botMiddle = new Square('botMiddle');
        this.botRight = new Square('botRight');

        this.rows = [
            //* horizontal
            new Row(this.topLeft, this.topMiddle, this.topRight),
            new Row(this.midLeft, this.midMiddle, this.midRight),
            new Row(this.botLeft, this.botMiddle, this.botRight),

            //* vertical
            new Row(this.topLeft, this.midLeft, this.botLeft),
            new Row(this.topMiddle, this.midMiddle, this.botMiddle),
            new Row(this.topRight, this.midRight, this.botRight),

            //* diagonal
            new Row(this.topLeft, this.midMiddle, this.botRight),
            new Row(this.topRight, this.midMiddle, this.botLeft)
        ];

        this.squares = [
            this.topLeft,
            this.topMiddle,
            this.topRight,
            this.midLeft,
            this.midMiddle,
            this.midRight,
            this.botLeft,
            this.botMiddle,
            this.botRight
        ];
    }

    init() {
        for (var i = 0; i < this.squares.length; i++) {
            // var [xbutton, ybutton] = this.squares[i].generateButtons();
            // document.getElementById(`cell${i + 1}`).appendChild(xbutton);
            // document.getElementById(`cell${i + 1}`).appendChild(ybutton);
            document.getElementById(`cell${i + 1}`).appendChild(this.squares[i].html);
            // document.getElementById(`cell${i + 1}`).appendChild(this.squares[i].ybutton);
        }
    }
}

var g = new Grid();
g.init();