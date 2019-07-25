class Matrix {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        //* Add Rows
        for (let i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0
            }
        }
    }

    add(n) {
        switch (n instanceof Matrix) {
            //* Element-wise Operation
            case true:
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] += n.matrix[i][j];
                    }
                }
                break;
            
            //* Scalor Operation
            case false:
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] += n;
                    }
                }
                return this;
                break;
        }

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
                        sum += a.matrix[i][k] * b.matrix[k][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
            return result;
        } else {
            //* Scalor Operation
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n;
                }
            }
            return this;
        }
    }

    //* Helper Functions
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
        return this;
    }

}