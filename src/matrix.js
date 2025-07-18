class Matrix {
  constructor(data) {
    if (Array.isArray(data)) {
      this.rows = data.length;
      this.cols = data[0].length;
      this.data = data;
    } else {
      this.rows = data.rows;
      this.cols = data.cols;
      this.fill(0);
    }
  }

  // Static initializers

  static from({ rows, cols }) {
    return new Matrix({ rows, cols });
  }

  static zeroes({ rows, cols }) {
    return new Matrix({ rows, cols });
  }

  static identity({ size }) {
    return new Matrix(
      Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
      )
    );
  }

  // Iterators

  *indexes() {
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++) yield [i, j];
  }

  *values() {
    yield* this[Symbol.iterator]();
  }

  *entries() {
    for (let [i, j] of this.indexes()) yield [i, j, this.data[i][j]];
  }

  *[Symbol.iterator]() {
    for (let [i, j] of this.indexes()) yield this.data[i][j];
  }

  // Fill & copy

  fill(value) {
    this.data = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => value)
    );
  }

  copy() {
    return new Matrix(this.data.map(row => row.map(value => value)));
  }

  // Out of bounds check

  checkIndex(i, j) {
    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols)
      throw new RangeError('Index out of bounds');
  }

  // Getters and Setters

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

  // Basic math operations

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

    const result = Array.from({ length: this.rows }, () => []);

    for (let i = 0; i < this.rows; i++) {
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

  // Math operations

  max() {
    return this.reduce((acc, value) => Math.max(acc, value), this.data[0][0]);
  }

  maxPerRow() {
    return this.data.map(row => Math.max(...row));
  }

  maxPerCol() {
    const result = Array.from({ length: this.cols }, (_, j) => this.data[0][j]);

    for (let [, j, value] of this.entries())
      if (value > result[j]) result[j] = value;

    return result;
  }

  maxIndex() {
    return this.reduce(
      ([maxValue, maxIndex], value, [i, j]) => {
        if (value > maxValue) {
          maxValue = value;
          maxIndex = [i, j];
        }
        return [maxValue, maxIndex];
      },
      [this.data[0][0], [0, 0]]
    )[1];
  }

  min() {
    return this.reduce((acc, value) => Math.min(acc, value), this.data[0][0]);
  }

  minPerRow() {
    return this.data.map(row => Math.min(...row));
  }

  minPerCol() {
    const result = Array.from({ length: this.cols }, (_, j) => this.data[0][j]);

    for (let [, j, value] of this.entries())
      if (value < result[j]) result[j] = value;

    return result;
  }

  minIndex() {
    return this.reduce(
      ([minValue, minIndex], value, [i, j]) => {
        if (value < minValue) {
          minValue = value;
          minIndex = [i, j];
        }
        return [minValue, minIndex];
      },
      [this.data[0][0], [0, 0]]
    )[1];
  }

  sum() {
    return this.reduce((acc, value) => acc + value, 0);
  }

  sumPerRow() {
    return this.data.map(row => row.reduce((acc, value) => acc + value, 0));
  }

  sumPerCol() {
    const result = Array.from({ length: this.cols }, () => 0);
    for (let [, j, value] of this.entries()) result[j] += value;

    return result;
  }

  prod() {
    return this.reduce((acc, value) => acc * value, 1);
  }

  prodPerRow() {
    return this.data.map(row => row.reduce((acc, value) => acc * value, 1));
  }

  prodPerCol() {
    const result = Array.from({ length: this.cols }, () => 1);
    for (let [, j, value] of this.entries()) result[j] *= value;

    return result;
  }

  mean() {
    return this.sum() / (this.rows * this.cols);
  }

  meanPerRow() {
    return this.sumPerRow().map(sum => sum / this.cols);
  }

  meanPerCol() {
    return this.sumPerCol().map(sum => sum / this.rows);
  }

  variance() {
    const mean = this.mean();
    return (
      this.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) /
      (this.rows * this.cols)
    );
  }

  variancePerRow() {
    return this.meanPerRow().map(
      (mean, i) =>
        this.data[i].reduce(
          (acc, value) => acc + Math.pow(value - mean, 2),
          0
        ) / this.cols
    );
  }

  variancePerCol() {
    return this.meanPerCol().map((mean, j) => {
      let sum = 0;
      for (let i = 0; i < this.rows; i++) {
        sum += Math.pow(this.data[i][j] - mean, 2);
      }
      return sum / this.rows;
    });
  }

  std() {
    return Math.sqrt(this.variance());
  }

  stdPerRow() {
    return this.variancePerRow().map(variance => Math.sqrt(variance));
  }

  stdPerCol() {
    return this.variancePerCol().map(variance => Math.sqrt(variance));
  }

  cumulativeSum() {
    const result = Array.from({ length: this.rows }, () => []);
    let lastValue = 0;

    for (let [i, j, value] of this.entries()) {
      lastValue += value;
      result[i][j] = lastValue;
    }

    return new Matrix(result);
  }

  cumulativeSumPerRow() {
    const result = Array.from({ length: this.rows }, () => []);

    for (let i = 0; i < this.rows; i++) {
      let lastValue = 0;
      for (let j = 0; j < this.cols; j++) {
        lastValue += this.data[i][j];
        result[i][j] = lastValue;
      }
    }
    return new Matrix(result);
  }

  cumulativeSumPerCol() {
    const result = Array.from({ length: this.rows }, () => []);

    for (let j = 0; j < this.cols; j++) {
      let lastValue = 0;
      for (let i = 0; i < this.rows; i++) {
        lastValue += this.data[i][j];
        result[i][j] = lastValue;
      }
    }
    return new Matrix(result);
  }

  cumulativeProd() {
    const result = Array.from({ length: this.rows }, () => []);
    let lastValue = 1;

    for (let [i, j, value] of this.entries()) {
      lastValue *= value;
      result[i][j] = lastValue;
    }

    return new Matrix(result);
  }

  cumulativeProdPerRow() {
    const result = Array.from({ length: this.rows }, () => []);

    for (let i = 0; i < this.rows; i++) {
      let lastValue = 1;
      for (let j = 0; j < this.cols; j++) {
        lastValue *= this.data[i][j];
        result[i][j] = lastValue;
      }
    }
    return new Matrix(result);
  }

  cumulativeProdPerCol() {
    const result = Array.from({ length: this.rows }, () => []);

    for (let j = 0; j < this.cols; j++) {
      let lastValue = 1;
      for (let i = 0; i < this.rows; i++) {
        lastValue *= this.data[i][j];
        result[i][j] = lastValue;
      }
    }
    return new Matrix(result);
  }

  // Transpose

  transpose() {
    const result = Array.from({ length: this.cols }, () => []);

    for (let i = 0; i < this.cols; i++)
      for (let j = 0; j < this.rows; j++) result[i][j] = this.data[j][i];

    return new Matrix(result);
  }

  // Diagonal

  diagonal() {
    const result = [];
    const size = Math.min(this.rows, this.cols);
    for (let i = 0; i < size; i++) result[i] = this.data[i][i];

    return result;
  }

  trace() {
    if (this.rows !== this.cols)
      throw new Error('Matrix must be square to calculate trace');

    return this.diagonal().reduce((acc, value) => acc + value, 0);
  }

  // Determinant and Submatrices

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
      for (let j = colStart; j <= colEnd; j++) newRow.push(this.data[i][j]);

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

  // Predicate matching

  every(callback) {
    for (let [i, j, value] of this.entries())
      if (!callback(value, [i, j], this)) return false;

    return true;
  }

  some(callback) {
    for (let [i, j, value] of this.entries())
      if (callback(value, [i, j], this)) return true;

    return false;
  }

  find(callback) {
    for (let [i, j, value] of this.entries())
      if (callback(value, [i, j], this)) return value;

    return undefined;
  }

  findIndex(callback) {
    for (let [i, j, value] of this.entries())
      if (callback(value, [i, j], this)) return [i, j];

    return undefined;
  }

  findLast(callback) {
    for (let i = this.rows - 1; i >= 0; i--)
      for (let j = this.cols - 1; j >= 0; j--)
        if (callback(this.data[i][j], [i, j], this)) return this.data[i][j];

    return undefined;
  }

  findLastIndex(callback) {
    for (let i = this.rows - 1; i >= 0; i--)
      for (let j = this.cols - 1; j >= 0; j--)
        if (callback(this.data[i][j], [i, j], this)) return [i, j];

    return undefined;
  }

  includes(value) {
    for (let val of this) if (val === value) return true;

    return false;
  }

  indexOf(value) {
    for (let [i, j, val] of this.entries()) if (val === value) return [i, j];

    return undefined;
  }

  lastIndexOf(value) {
    for (let i = this.rows - 1; i >= 0; i--)
      for (let j = this.cols - 1; j >= 0; j--)
        if (this.data[i][j] === value) return [i, j];

    return undefined;
  }

  // Mapping and reducing

  forEach(callback) {
    for (let [i, j, value] of this.entries()) callback(value, [i, j], this);
  }

  map(callback) {
    const result = Array.from({ length: this.rows }, () => []);

    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result[i][j] = callback(this.data[i][j], [i, j], this);

    return new Matrix(result);
  }

  reduce(callback, initialValue) {
    let accumulator = initialValue;

    for (let [i, j, value] of this.entries())
      accumulator = callback(accumulator, value, [i, j], this);

    return accumulator;
  }

  reduceRight(callback, initialValue) {
    let accumulator = initialValue;

    for (let i = this.rows - 1; i >= 0; i--)
      for (let j = this.cols - 1; j >= 0; j--)
        accumulator = callback(accumulator, this.data[i][j], [i, j], this);

    return accumulator;
  }

  // Flattening

  flat() {
    return this.data.flat(2);
  }

  flatMap(callback) {
    return this.map(callback).flat();
  }

  // Filtering

  mask(maskValue) {
    if (Array.isArray(maskValue)) {
      if (this.rows !== maskValue.length || this.cols !== maskValue[0].length)
        throw new Error('Matrix dimensions do not match');
    } else if (maskValue instanceof Matrix) {
      if (this.rows !== maskValue.rows || this.cols !== maskValue.cols)
        throw new Error('Matrix dimensions do not match');
    } else if (typeof maskValue !== 'function')
      throw new TypeError('Mask value must be a function or a matrix');

    const getMaskAt =
      typeof maskValue === 'function'
        ? maskValue
        : Array.isArray(maskValue)
          ? (_, [i, j]) => maskValue[i][j]
          : (_, [i, j]) => maskValue.data[i][j];

    return this.map((value, [i, j]) =>
      getMaskAt(value, [i, j], this) ? value : 0
    );
  }

  filter(callback) {
    return this.map((value, [i, j]) =>
      callback(value, [i, j], this) ? value : undefined
    );
  }

  filterNonZero() {
    return this.map(value => (value !== 0 ? value : undefined));
  }

  findMatches(callback) {
    return this.reduce((acc, value, [i, j]) => {
      if (callback(value, [i, j], this)) acc.push(value);
      return acc;
    }, []);
  }

  findIndexOfMatches(callback) {
    return this.reduce((acc, value, [i, j]) => {
      if (callback(value, [i, j], this)) acc.push([i, j]);
      return acc;
    }, []);
  }

  // Flipping

  flipHorizontal() {
    const result = this.data.map(row => row.toReversed());
    return new Matrix(result);
  }

  flipVertical() {
    const result = this.data.toReversed().map(row => [...row]);
    return new Matrix(result);
  }

  // Rotating

  rotateClockwise() {
    const result = Array.from({ length: this.cols }, () => []);

    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result[j][this.rows - i - 1] = this.data[i][j];

    return new Matrix(result);
  }

  rotateCounterClockwise() {
    const result = Array.from({ length: this.cols }, () => []);

    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result[this.cols - j - 1][i] = this.data[i][j];

    return new Matrix(result);
  }

  // Merging

  mergeCols(matrix) {
    if (this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    return new Matrix(this.data.concat(matrix.data));
  }

  mergeRows(matrix) {
    if (this.rows !== matrix.rows)
      throw new Error('Matrix dimensions do not match');

    return new Matrix(this.data.map((row, i) => row.concat(matrix.data[i])));
  }

  // Expanding

  expandRows(rows, fillValue = 0) {
    const newRows = new Matrix({ rows, cols: this.cols });
    newRows.fill(fillValue);

    return this.mergeCols(newRows);
  }

  expandCols(cols, fillValue = 0) {
    const newCols = new Matrix({ rows: this.rows, cols });
    newCols.fill(fillValue);

    return this.mergeRows(newCols);
  }

  // String

  toString() {
    return this.data.toString();
  }

  toLocaleString() {
    return this.data.toLocaleString();
  }

  // JSON

  toJSON() {
    return JSON.stringify(this.data);
  }

  static fromJSON(json) {
    return new Matrix(JSON.parse(json));
  }
}

export default Matrix;
