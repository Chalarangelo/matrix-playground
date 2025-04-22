import Matrix from '../src/matrix.js';
import { bench, describe } from 'vitest';

const defaultCandidates = ['Naive2D', 'Flat1D'];

describe.each([
  [
    'from dimensions',
    MatrixClass => () => {
      MatrixClass.from({ rows: 100, cols: 100 });
    },
    { iterations: 500 },
  ],
  [
    'iteration',
    MatrixClass => {
      const matrix = MatrixClass.from({ rows: 10, cols: 10 });
      return () => {
        [...matrix];
      };
    },
    { iterations: 1_000 },
  ],
  [
    'addition',
    MatrixClass => {
      const matrix1 = MatrixClass.from({ rows: 3, cols: 3 });
      const matrix2 = MatrixClass.from({ rows: 3, cols: 3 });
      return () => {
        matrix1.add(matrix2);
      };
    },
    { iterations: 200 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
  [
    'multiplication',
    MatrixClass => {
      const matrix1 = MatrixClass.from({ rows: 4, cols: 3 });
      const matrix2 = MatrixClass.from({ rows: 3, cols: 3 });
      return () => {
        matrix1.multiply(matrix2);
      };
    },
    { iterations: 250 },
  ],
  [
    'scalar multiplication',
    MatrixClass => {
      const matrix = MatrixClass.from({ rows: 20, cols: 20 });
      const scalar = 2;
      return () => {
        matrix.multiplyWithScalar(scalar);
      };
    },
    { iterations: 250 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
  [
    'transpose',
    MatrixClass => {
      const matrix = MatrixClass.from({ rows: 100, cols: 100 });
      return () => {
        matrix.transpose();
      };
    },
    { iterations: 250 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
  [
    'fill',
    MatrixClass => {
      const matrix = MatrixClass.from({ rows: 100, cols: 100 });
      return () => {
        matrix.fill(1);
      };
    },
    { iterations: 100 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
  [
    'zeroes',
    MatrixClass => {
      return () => {
        MatrixClass.zeroes({ rows: 100, cols: 100 });
      };
    },
    { iterations: 100 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
  [
    'identity',
    MatrixClass => {
      return () => {
        MatrixClass.identity({ size: 100 });
      };
    },
    { iterations: 100 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
  [
    'column',
    MatrixClass => {
      const matrix = MatrixClass.from({ rows: 50, cols: 50 });
      return () => {
        matrix.col(1);
      };
    },
    { iterations: 100 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
  [
    'minor submatrix',
    MatrixClass => {
      const matrix = MatrixClass.from({ rows: 50, cols: 50 });
      return () => {
        matrix.minorSubmatrix(1, 1);
      };
    },
    { iterations: 100 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
  [
    'submatrix',
    MatrixClass => {
      const matrix = MatrixClass.from({ rows: 50, cols: 50 });
      return () => {
        matrix.submatrix(10, 10, 30, 30);
      };
    },
    { iterations: 100 },
    ['Naive2D', 'Flat1D', 'Optimized1D'],
  ],
])('%s', (_, benchmarkFn, options, candidates = defaultCandidates) => {
  candidates.forEach(className => {
    const MatrixClass = Matrix[className];
    bench(className, benchmarkFn(MatrixClass), options);
  });
});
