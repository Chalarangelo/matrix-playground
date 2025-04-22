import Flat1D from './flat1D.js';

class Optimized1D extends Flat1D {
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

export default Optimized1D;
