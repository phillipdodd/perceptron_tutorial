class Matrix {

    constructor(rows, cols) {

        if (rows && rows > 0) {
            this.rows = rows;
        } else {
            throw new Error("rows arg required")
        }

        if (cols && cols > 0) {
            this.cols = cols;
        } else {
            throw new Error("rows arg required")
        }

        this.data = [];

        //* Add Rows
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0
            }
        }
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) {
            console.log("Number of Columns of A must match number of rows of B");
            return undefined;
        }

        return new Matrix(a.rows, b.cols)
            .map((_, i, j) => {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j]
                }
                return sum;
            });

    }

    /**
     * @returns {Matrix} a - b
     */
    static subtract(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            console.log("Columns and Rows of A must match Columns and Rows of B");
            return;
        }
        return new Matrix(a.rows, a.cols)
        .map((_, i, j) => a.data[i][j] - b.data[i][j]); 
    }
    
    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((_, i) => arr[i]);
    }
    
    toArray() {
        let array = [];
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                array.push(this.data[i][j]);
            }
        }
        return array;
    }
    
    add(n) {
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.log("Columns and Rows of A must match Columns and Rows of B");
                return;
            }
            //* Element-wise
            return this.map((e, i, j) => e + n.data[i][j]);
        } else {
            //* Scalor Operation
            return this.map(e => e + n);
        }
        
    }
    
    static transpose(matrix) {
        return new Matrix(matrix.cols, matrix.rows)
        .map((_, i, j) => matrix.data[j][i]);
    }
    
    map(fn) {
        //* Apply a function to every element of a matrix
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = fn(val, i, j);
            }
        }
        return this;
    }
    
    static map(matrix, fn) {
        return new Matrix(matrix.rows, matrix.cols)
        .map((e, i, j) => fn(matrix.data[i][j], i, j));
    }
    
    multiply(n) {
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.log("Columns and Rows of A must match Columns and Rows of B");
                return;
            }
            //? hadamard product (element-wise)
            return this.map((e, i, j) => e * n.data[i][j]);
        } else {
            //* Scalor Operation
            return this.map(e => e * n);
        }
    }

    //* Helper Functions
    randomize() {
        return this.map(e => Math.random() * 2 - 1);
    }

    print() {
        console.table(this.data);
    }

}