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
}

export default Flat1D;
