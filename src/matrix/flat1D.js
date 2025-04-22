import BaseMatrix from './base.js';

class Matrix extends BaseMatrix {
  constructor(data) {
    super();
    this.rows = data.length;
    this.cols = data[0].length;
    this.data = data.flat(Infinity);
  }

  static from({ rows, cols }) {
    const newMatrix = new Matrix([[]]);
    newMatrix.data = Array.from({ length: rows * cols }, () => 0);
    newMatrix.rows = rows;
    newMatrix.cols = cols;
    return newMatrix;
  }

  static sparseFrom({ rows, cols }) {
    const newMatrix = new Matrix([[]]);
    Array.from({ length: rows * cols });
    newMatrix.rows = rows;
    newMatrix.cols = cols;
    return newMatrix;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.rows * this.cols; i++) {
      yield this.data[i];
    }
  }

  #index(i, j) {
    return i * this.cols + j;
  }

  get(i, j) {
    this.checkIndex(i, j);
    return this.data[this.#index(i, j)];
  }

  set(i, j, value) {
    this.checkIndex(i, j);
    this.data[this.#index(i, j)] = value;
  }
}

export default Matrix;
