class Flat1D {
  constructor(data) {
    this.rows = data.length;
    this.cols = data[0].length;
    this.data = data.flat(Infinity);
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.rows * this.cols; i++) {
      yield this.data[i];
    }
  }

  *indexes() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield [i, j];
      }
    }
  }

  #index(i, j) {
    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols)
      throw new RangeError('Index out of bounds');

    return i * this.cols + j;
  }

  get(i, j) {
    return this.data[this.#index(i, j)];
  }

  set(i, j, value) {
    this.data[this.#index(i, j)] = value;
  }

  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    for (let [i, j] of this.indexes())
      this.set(i, j, this.get(i, j) + matrix.get(i, j));
  }

  subtract(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    for (let [i, j] of this.indexes())
      this.set(i, j, this.get(i, j) - matrix.get(i, j));
  }
}

export default Flat1D;
