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
}

export default Flat1D;
