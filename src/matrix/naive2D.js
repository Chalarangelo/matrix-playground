class Naive2D {
  constructor(data) {
    this.data = data;
    this.rows = data.length;
    this.cols = data[0].length;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield this.data[i][j];
      }
    }
  }

  *indexes() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield [i, j];
      }
    }
  }

  #checkIndex(i, j) {
    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols)
      throw new RangeError('Index out of bounds');
  }

  get(i, j) {
    this.#checkIndex(i, j);
    return this.data[i][j];
  }

  set(i, j, value) {
    this.#checkIndex(i, j);
    this.data[i][j] = value;
  }

  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    for (let [i, j] of this.indexes())
      this.set(i, j, this.get(i, j) + matrix.get(i, j));
  }
}

export default Naive2D;
