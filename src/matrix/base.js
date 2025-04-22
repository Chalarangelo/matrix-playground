class Matrix {
  *indexes() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield [i, j];
      }
    }
  }

  fill(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.set(i, j, value);
      }
    }
  }

  static zeroes({ rows, cols }) {
    return this.from({ rows, cols });
  }

  static identity({ size }) {
    const newMatrix = this.zeroes({ rows: size, cols: size });
    for (let i = 0; i < size; i++) {
      newMatrix.set(i, i, 1);
    }
    return newMatrix;
  }

  checkIndex(i, j) {
    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols)
      throw new RangeError('Index out of bounds');
  }

  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let [i, j] of this.indexes())
      newMatrixSparse.set(i, j, this.get(i, j) + matrix.get(i, j));

    return newMatrixSparse;
  }

  subtract(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let [i, j] of this.indexes())
      newMatrixSparse.set(i, j, this.get(i, j) - matrix.get(i, j));

    return newMatrixSparse;
  }

  multiply(matrix) {
    if (this.cols !== matrix.rows)
      throw new Error('Matrix dimensions do not match');

    const newMatrixSparse = this.constructor.sparseFrom({
      rows: this.rows,
      cols: matrix.cols,
    });

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.get(i, k) * matrix.get(k, j);
        }
        newMatrixSparse.set(i, j, sum);
      }
    }

    return newMatrixSparse;
  }

  multiplyWithScalar(scalar) {
    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let [i, j] of this.indexes())
      newMatrixSparse.set(i, j, this.get(i, j) * scalar);

    return newMatrixSparse;
  }

  transpose() {
    const newMatrixSparse = this.constructor.sparseFrom({
      rows: this.cols,
      cols: this.rows,
    });

    for (let [i, j] of this.indexes())
      newMatrixSparse.set(j, i, this.get(i, j));

    return newMatrixSparse;
  }

  minorSubmatrix(row, col) {
    const newMatrixSparse = this.constructor.sparseFrom({
      rows: this.rows - 1,
      cols: this.cols - 1,
    });

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (i !== row && j !== col) {
          const newRow = i < row ? i : i - 1;
          const newCol = j < col ? j : j - 1;
          newMatrixSparse.set(newRow, newCol, this.get(i, j));
        }
      }
    }

    return newMatrixSparse;
  }

  submatrix(rowStart, colStart, rowEnd, colEnd) {
    const newMatrixSparse = this.constructor.sparseFrom({
      rows: rowEnd - rowStart + 1,
      cols: colEnd - colStart + 1,
    });

    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        newMatrixSparse.set(i - rowStart, j - colStart, this.get(i, j));
      }
    }

    return newMatrixSparse;
  }

  determinant() {
    if (this.rows !== this.cols)
      throw new Error('Determinant is only defined for square matrices');

    if (this.rows === 1) return this.get(0, 0);
    if (this.rows === 2)
      return this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0);

    let det = 0;
    for (let j = 0; j < this.cols; j++) {
      const subMatrix = this.minorSubmatrix(0, j);
      det += (j % 2 === 0 ? 1 : -1) * this.get(0, j) * subMatrix.determinant();
    }
    return det;
  }
}

export default Matrix;
