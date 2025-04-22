import BaseMatrix from './base.js';

class Matrix extends BaseMatrix {
  constructor(data) {
    super();
    this.data = data;
    this.rows = data.length;
    this.cols = data[0].length;
  }

  static from({ rows, cols }) {
    const newMatrix = new Matrix([[]]);
    newMatrix.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
    newMatrix.rows = rows;
    newMatrix.cols = cols;
    return newMatrix;
  }

  static sparseFrom({ rows, cols }) {
    const newMatrix = new Matrix([[]]);
    newMatrix.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols })
    );
    newMatrix.rows = rows;
    newMatrix.cols = cols;
    return newMatrix;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield this.data[i][j];
      }
    }
  }

  get(i, j) {
    this.checkIndex(i, j);
    return this.data[i][j];
  }

  set(i, j, value) {
    this.checkIndex(i, j);
    this.data[i][j] = value;
  }
}

export default Matrix;
