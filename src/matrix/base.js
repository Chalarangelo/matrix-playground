class Matrix {
  *indexes() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield [i, j];
      }
    }
  }

  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let [i, j] of this.indexes())
      newMatrixSparse.set(i, j, this.get(i, j) + matrix.get(i, j));

    return newMatrixSparse;
  }

  subtract(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols)
      throw new Error('Matrix dimensions do not match');

    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let [i, j] of this.indexes())
      newMatrixSparse.set(i, j, this.get(i, j) - matrix.get(i, j));

    return newMatrixSparse;
  }

  multiply(matrix) {
    if (this.cols !== matrix.rows)
      throw new Error('Matrix dimensions do not match');

    const newMatrixSparse = this.constructor.sparseFrom(this);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.get(i, k) * matrix.get(k, j);
        }
        newMatrixSparse.set(i, j, sum);
      }
    }

    return newMatrixSparse;
  }
}

export default Matrix;
