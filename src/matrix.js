class Matrix {
  constructor(data) {
    if (Array.isArray(data)) {
      this.rows = data.length;
      this.cols = data[0].length;
      this.data = data;
    } else {
      this.rows = data.rows;
      this.cols = data.cols;
      this.data = Array.from({ length: this.rows }, () =>
        Array.from({ length: this.cols }, () => 0)
      );
    }
  }

  fill(value) {
    this.data = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => value)
    );
  }

  static from({ rows, cols }) {
    return new Matrix({ rows, cols });
  }

  static zeroes({ rows, cols }) {
    return new Matrix({ rows, cols });
  }

  static identity({ size }) {
    const data = Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
    );

    return new Matrix(data);
  }

  *indexes() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield [i, j];
      }
    }
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield this.data[i][j];
      }
    }
  }

  checkIndex(i, j) {
    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols)
      throw new RangeError('Index out of bounds');
  }

  get(i, j) {
    this.checkIndex(i, j);
    return this.data[i][j];
  }

  set(i, j, value) {
    this.checkIndex(i, j);
    this.data[i][j] = value;
  }

  row(i) {
    this.checkIndex(i, 0);
    return this.data[i];
  }

  col(j) {
    this.checkIndex(0, j);
    return this.data.map(row => row[j]);
  }

  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    return new Matrix(
      this.data.map((row, i) =>
        row.map((value, j) => value + matrix.data[i][j])
      )
    );
  }

  subtract(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    return new Matrix(
      this.data.map((row, i) =>
        row.map((value, j) => value - matrix.data[i][j])
      )
    );
  }

  multiply(matrix) {
    if (this.cols !== matrix.rows)
      throw new Error('Matrix dimensions do not match');

    const result = [];

    for (let i = 0; i < this.rows; i++) {
      result[i] = [];
      for (let j = 0; j < matrix.cols; j++) {
        result[i][j] = 0;
        for (let k = 0; k < this.cols; k++) {
          result[i][j] += this.data[i][k] * matrix.data[k][j];
        }
      }
    }

    return new Matrix(result);
  }

  multiplyWithScalar(scalar) {
    return new Matrix(this.data.map(row => row.map(value => value * scalar)));
  }

  transpose() {
    const result = [];

    for (let i = 0; i < this.cols; i++) {
      result[i] = [];
      for (let j = 0; j < this.rows; j++) {
        result[i][j] = this.data[j][i];
      }
    }

    return new Matrix(result);
  }

  minorSubmatrix(row, col) {
    const result = [];

    for (let i = 0; i < this.rows; i++) {
      if (i === row) continue;
      const newRow = [];
      for (let j = 0; j < this.cols; j++) {
        if (j === col) continue;
        newRow.push(this.data[i][j]);
      }
      result.push(newRow);
    }

    return new Matrix(result);
  }

  submatrix(rowStart, colStart, rowEnd, colEnd) {
    const result = [];

    for (let i = rowStart; i <= rowEnd; i++) {
      const newRow = [];
      for (let j = colStart; j <= colEnd; j++) {
        newRow.push(this.data[i][j]);
      }
      result.push(newRow);
    }

    return new Matrix(result);
  }

  determinant() {
    if (this.rows !== this.cols)
      throw new Error('Matrix must be square to calculate determinant');

    if (this.rows === 1) return this.data[0][0];

    if (this.rows === 2)
      return (
        this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0]
      );

    let det = 0;

    for (let j = 0; j < this.cols; j++) {
      const minor = this.minorSubmatrix(0, j);
      det += (j % 2 === 0 ? 1 : -1) * this.data[0][j] * minor.determinant();
    }

    return det;
  }
}

export default Matrix;
