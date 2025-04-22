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

  multiplyWithScalar(scalar) {
    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let i = 0; i < this.rows * this.cols; i++)
      newMatrixSparse.data[i] = this.data[i] * scalar;

    return newMatrixSparse;
  }
}

export default Optimized1D;
