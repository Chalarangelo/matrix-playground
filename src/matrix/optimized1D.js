import Flat1D from './flat1D.js';

class Matrix extends Flat1D {
  fill(value) {
    this.data.fill(value);
  }

  static zeroes({ rows, cols }) {
    const newMatrix = new Matrix([[]]);
    newMatrix.data = Array.from({ length: rows * cols }).fill(0);
    newMatrix.rows = rows;
    newMatrix.cols = cols;
    return newMatrix;
  }

  static identity({ size }) {
    const newMatrix = new Matrix([[]]);
    newMatrix.data = Array.from({ length: size * size }, (_, i) =>
      i % (size + 1) === 0 ? 1 : 0
    );
    newMatrix.rows = size;
    newMatrix.cols = size;
    return newMatrix;
  }

  col(j) {
    this.checkIndex(0, j);
    const col = [];
    for (let i = j; i < this.data.length; i += this.cols)
      col[col.length] = this.data[i];

    return col;
  }

  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let i = 0; i < this.rows * this.cols; i++)
      newMatrixSparse.data[i] = this.data[i] + matrix.data[i];

    return newMatrixSparse;
  }

  subtract(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let i = 0; i < this.rows * this.cols; i++)
      newMatrixSparse.data[i] = this.data[i] - matrix.data[i];

    return newMatrixSparse;
  }

  multiplyWithScalar(scalar) {
    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let i = 0; i < this.rows * this.cols; i++)
      newMatrixSparse.data[i] = this.data[i] * scalar;

    return newMatrixSparse;
  }

  transpose() {
    const newMatrixSparse = this.constructor.sparseFrom({
      rows: this.cols,
      cols: this.rows,
    });

    for (let [i, j] of this.indexes())
      newMatrixSparse.data[j * this.rows + i] = this.data[i * this.cols + j];

    return newMatrixSparse;
  }

  minorSubmatrix(row, col) {
    const newMatrixSparse = this.constructor.sparseFrom({
      rows: this.rows - 1,
      cols: this.cols - 1,
    });

    for (let i = 0; i < this.data.length; i++) {
      if (Math.floor(i / this.cols) === row || i % this.cols === col) continue;
      newMatrixSparse.data[newMatrixSparse.data.length] = this.data[i];
    }

    return newMatrixSparse;
  }

  submatrix(rowStart, colStart, rowEnd, colEnd) {
    const newMatrixSparse = this.constructor.sparseFrom({
      rows: rowEnd - rowStart + 1,
      cols: colEnd - colStart + 1,
    });

    for (
      let i = rowStart * this.cols + colStart;
      i <= rowEnd * this.cols + colEnd;
      i++
    ) {
      const col = i % this.cols;
      if (col < colStart) {
        i += colStart - col - 1;
        continue;
      }

      if (col > colEnd) {
        i += this.cols - col - 1;
        continue;
      }
      newMatrixSparse.data[newMatrixSparse.data.length] = this.data[i];
    }
    return newMatrixSparse;
  }

  determinant() {
    if (this.rows !== this.cols)
      throw new Error('Determinant is only defined for square matrices');

    if (this.rows === 1) return this.data[0];
    if (this.rows === 2)
      return this.data[0] * this.data[3] - this.data[1] * this.data[2];

    let det = 0;
    for (let j = 0; j < this.cols; j++) {
      const subMatrix = this.minorSubmatrix(0, j);
      det += (j % 2 === 0 ? 1 : -1) * this.data[j] * subMatrix.determinant();
    }
    return det;
  }
}

export default Matrix;
