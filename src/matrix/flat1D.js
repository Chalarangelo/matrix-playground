import BaseMatrix from './base.js';

class Matrix extends BaseMatrix {
  constructor(data) {
    super();
    this.rows = data.length;
    this.cols = data[0].length;
    this.data = data.flat(Infinity);
  }

  fill(value) {
    for (let i = 0; i < this.rows * this.cols; i++) this.data[i] = value;
  }

  static identity({ size }) {
    const newMatrix = this.zeroes({ rows: size, cols: size });
    for (let i = 0; i < size; i++) newMatrix.data[i * size + i] = 1;

    return newMatrix;
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

  row(i) {
    this.checkIndex(i, 0);
    return this.data.slice(i * this.cols, (i + 1) * this.cols);
  }

  col(j) {
    this.checkIndex(0, j);
    return this.data.filter((_, index) => index % this.cols === j);
  }

  set(i, j, value) {
    this.checkIndex(i, j);
    this.data[this.#index(i, j)] = value;
  }
}

export default Matrix;
