import Matrix from '../src/matrix.js';
import { bench, describe } from 'vitest';

describe.each([
  [
    'iteration',
    MatrixClass => () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const matrix = new MatrixClass(data);
      [...matrix];
    },
    { iterations: 10_000 },
  ],
  [
    'getter/setter',
    MatrixClass => () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const matrix = new MatrixClass(data);
      const value = matrix.get(1, 1);
      matrix.set(1, 1, value + 1);
    },
    { iterations: 1_000 },
  ],
  [
    'addition',
    MatrixClass => () => {
      const data1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const data2 = [
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1],
      ];
      const matrix1 = new MatrixClass(data1);
      const matrix2 = new MatrixClass(data2);
      matrix1.add(matrix2);
    },
    { iterations: 1_000 },
  ],
])('%s', (_, benchmarkFn, options) => {
  bench('Naive2D', benchmarkFn(Matrix.Naive2D), options);
  bench('Flat1D', benchmarkFn(Matrix.Flat1D), options);
});
