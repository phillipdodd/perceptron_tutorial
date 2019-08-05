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

    /**
     * @returns {Matrix} a - b
     */
    static subtract(a, b) {
        let result = new Matrix(a.rows, a.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                result.data[i][j] = a.data[i][j] - b.data[i][j]
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
                    result.data[i][j] = this.data[i][j] + n.data[i][j];
                }
            }
        } else {
            //* Scalor Operation
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    result.data[i][j] = this.data[i][j] + n;
                }
            }
        }

        return result;

    }

    static transpose(matrix) {
        if (!matrix instanceof Matrix) {
            throw new Error("Arg of type Matrix required");
        }
        //* make the rows into columns
        let result = new Matrix(matrix.cols, matrix.rows);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                result.data[j][i] = matrix.data[i][j];
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

    static map(matrix, fn) {
        let result = new Matrix(matrix.rows, matrix.cols);
        //* Apply a function to every element of a matrix
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                let val = matrix.data[i][j];
                result.data[i][j] += fn(val);
            }
        }
        return result;
    }

    multiply(n) {
        if (n instanceof Matrix) {
            //? hadamard product (element-wise)
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n.data[i][j];
                }
            }
        } else {
            //* Scalor Operation
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
        return this;
    }

    //   multiply(n) {
    //       if (n instanceof Matrix) {
    //           if (this.rows !== n.rows || this.cols !== n.cols) {
    //               console.log('Columns and Rows of A must match Columns and Rows of B.');
    //               return;
    //           }
    //           // hadamard product
    //           return this.map((e, i, j) => e * n.data[i][j]);
    //       } else {
    //           // Scalar product
    //           return this.map(e => e * n);
    //       }
    //   }

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