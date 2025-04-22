import Matrix from '../src/matrix.js';
import { describe, it, expect } from 'vitest';

describe.each([
  ['Naive2D', Matrix.Naive2D],
  ['Flat1D', Matrix.Flat1D],
])('Matrix %s', (_, MatrixClass) => {
  it('should iterate over the matrix elements', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const matrix = new MatrixClass(data);
    const elements = Array.from(matrix);
    expect(elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should have the correct number of rows and columns', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new MatrixClass(data);
    expect(matrix.rows).toBe(2);
    expect(matrix.cols).toBe(2);
  });
});
