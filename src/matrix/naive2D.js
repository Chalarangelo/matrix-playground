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
}

export default Naive2D;
