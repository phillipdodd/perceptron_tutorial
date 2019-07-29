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
        if (this.cols !== n.rows) {
            console.log("Number of Columns of A must match number of rows of B");
            return undefined;
        }

        let result = new Matrix(a.rows, b.cols);

        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }

        return result;
    }
    
    static fromArray(arr) {
        //* rows based on length and 1 column
        let m = new Matrix(arr.length, 1);
        for (var i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
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

        let result = new Matrix(this.rows, this.cols);
        if (n instanceof Matrix) {
            //* Element-wise Operation
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    result[i][j] = this.data[i][j] + n.data[i][j];
                }
            }
        } else {
            //* Scalor Operation
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    result[i][j] = this.data[i][j] + n;
                }
            }
        }

        return result;

    }

    transpose() {
        //* make the rows into columns
        let result = new Matrix(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.data[j][i] = this.data[i][j];
            }
        }
        return result;
    }

    map(fn) {
        //* Apply a function to every element of a matrix
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] += fn(val);
            }
        }
        return this;
    }
    multiply(n) {
        //* Scalor Operation
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] += n;
            }
        }
        return this;
    }

    //* Helper Functions
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
        return this;
    }

    print() {
        console.table(this.data);
    }

}