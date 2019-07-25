class Matrix {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        //* Add Rows
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0
            }
        }
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

    multiply(n) {
        if (n instanceof Matrix) {
            //* Matrix Product
            if (this.cols !== n.rows) {
                console.log("Number of Columns of A must match number of rows of B");
                return undefined;
            }
            let a = this;
            let b = n;
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
        } else {
            //* Scalor Operation
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
            return this;
        }
    }

    //* Helper Functions
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.floor(Math.random() * 10);
            }
        }
        return this;
    }

}