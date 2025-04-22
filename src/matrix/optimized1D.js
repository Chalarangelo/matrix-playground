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
}

export default Matrix;
