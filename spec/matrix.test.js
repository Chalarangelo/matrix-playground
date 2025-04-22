import Matrix from '../src/matrix.js';
import { describe, it, expect } from 'vitest';

describe.each(['Naive2D', 'Flat1D', 'Optimized1D'])('Matrix %s', className => {
  const MatrixClass = Matrix[className];
  const asArray = matrix => {
    const result = [];
    for (let i = 0; i < matrix.rows; i++) {
      const row = [];
      for (let j = 0; j < matrix.cols; j++) {
        row.push(matrix.get(i, j));
      }
      result.push(row);
    }
    return result;
  };

  it('*[Symbol.iterator]', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const matrix = new MatrixClass(data);
    const elements = Array.from(matrix);
    expect(elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('*indexes', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new MatrixClass(data);
    const indexes = Array.from(matrix.indexes());
    expect(indexes).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]);
  });

  it('fill', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new MatrixClass(data);
    matrix.fill(0);
    expect(asArray(matrix)).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  it('from', () => {
    const rows = 3;
    const cols = 4;
    const matrix = MatrixClass.from({ rows, cols });
    expect(matrix.rows).toBe(rows);
    expect(matrix.cols).toBe(cols);
    expect(asArray(matrix)).toEqual(
      Array.from({ length: rows }, () => Array(cols).fill(0))
    );
  });

  it('zeroes', () => {
    const rows = 3;
    const cols = 4;
    const matrix = MatrixClass.zeroes({ rows, cols });
    expect(matrix.rows).toBe(rows);
    expect(matrix.cols).toBe(cols);
    expect(asArray(matrix)).toEqual(
      Array.from({ length: rows }, () => Array(cols).fill(0))
    );
  });

  it('identity', () => {
    const size = 3;
    const matrix = MatrixClass.identity({ size });
    expect(matrix.rows).toBe(size);
    expect(matrix.cols).toBe(size);
    expect(asArray(matrix)).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it('rows & cols', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new MatrixClass(data);
    expect(matrix.rows).toBe(2);
    expect(matrix.cols).toBe(2);
  });

  it('get', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    expect(matrix.get(0, 1)).toBe(2);
  });

  it('row', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    expect(matrix.row(1)).toEqual([4, 5, 6]);
    expect(matrix.row(0)).toEqual([1, 2, 3]);
  });

  it('col', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    expect(matrix.col(1)).toEqual([2, 5]);
    expect(matrix.col(0)).toEqual([1, 4]);
    expect(matrix.col(2)).toEqual([3, 6]);
  });

  it('set', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    matrix.set(1, 1, 10);
    expect(matrix.get(1, 1)).toBe(10);
  });

  it('checkIndex', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    expect(() => matrix.get(2, 0)).toThrow('Index out of bounds');
    expect(() => matrix.set(0, 3, 10)).toThrow('Index out of bounds');
  });

  it('add', () => {
    const data1 = [
      [1, 2],
      [3, 4],
    ];
    const data2 = [
      [5, 6],
      [7, 8],
    ];
    const a = new MatrixClass(data1);
    const b = new MatrixClass(data2);
    const result = a.add(b);
    expect(asArray(result)).toEqual([
      [6, 8],
      [10, 12],
    ]);
  });

  it('subtract', () => {
    const data1 = [
      [5, 6],
      [7, 8],
    ];
    const data2 = [
      [1, 2],
      [3, 4],
    ];
    const a = new MatrixClass(data1);
    const b = new MatrixClass(data2);
    const result = a.subtract(b);
    expect(asArray(result)).toEqual([
      [4, 4],
      [4, 4],
    ]);
  });

  it('multiply', () => {
    const data1 = [
      [1, 0, 1],
      [2, 1, 1],
      [0, 1, 1],
      [1, 1, 2],
    ];
    const data2 = [
      [1, 2, 1],
      [2, 3, 1],
      [4, 2, 2],
    ];
    const a = new MatrixClass(data1);
    const b = new MatrixClass(data2);
    const result = a.multiply(b);
    expect(asArray(result)).toEqual([
      [5, 4, 3],
      [8, 9, 5],
      [6, 5, 3],
      [11, 9, 6],
    ]);
  });

  it('multiply with vector', () => {
    const data1 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const data2 = [[1], [2], [3]];
    const a = new MatrixClass(data1);
    const b = new MatrixClass(data2);
    const result = a.multiply(b);
    expect(asArray(result)).toEqual([[14], [32]]);
  });

  it('multiplyWithScalar', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const scalar = 2;
    const matrix = new MatrixClass(data);
    const result = matrix.multiplyWithScalar(scalar);
    expect(asArray(result)).toEqual([
      [2, 4],
      [6, 8],
    ]);
  });

  it('transpose', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    const result = matrix.transpose();
    expect(asArray(result)).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it('minorSubmatrix', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const matrix = new MatrixClass(data);
    const result = matrix.minorSubmatrix(1, 1);
    expect(asArray(result)).toEqual([
      [1, 3],
      [7, 9],
    ]);
  });

  it('submatrix', () => {
    const data = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const matrix = new MatrixClass(data);
    const result = matrix.submatrix(0, 0, 1, 1);
    expect(asArray(result)).toEqual([
      [1, 2],
      [5, 6],
    ]);

    const result2 = matrix.submatrix(2, 1, 3, 2);
    expect(asArray(result2)).toEqual([
      [10, 11],
      [14, 15],
    ]);

    const result3 = matrix.submatrix(1, 2, 3, 3);
    expect(asArray(result3)).toEqual([
      [7, 8],
      [11, 12],
      [15, 16],
    ]);
    const result4 = matrix.submatrix(0, 0, 3, 3);
    expect(asArray(result4)).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);
  });
});
