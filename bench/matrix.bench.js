import Matrix from '../src/matrix.js';
import { Bench } from 'tinybench';

const data3by3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const benchmarkSetup = [
  {
    name: 'Iterator',
    iterations: 1_000,
    benchmark: (benchmark, name, MatrixClass) => {
      const matrix = new MatrixClass(data3by3);
      benchmark.add(name, () => {
        [...matrix];
      });
    },
  },
];

const benchmarks = benchmarkSetup.map(({ name, iterations, benchmark }) => {
  const bench = new Bench({ name, iterations });

  [
    ['Naive2D', Matrix.Naive2D],
    ['Flat1D', Matrix.Flat1D],
  ].forEach(([name, MatrixClass]) => {
    benchmark(bench, name, MatrixClass);
  });

  return bench;
});

await Promise.all(benchmarks.map(b => b.run()));

benchmarks.forEach(b => {
  console.log(b.name);
  console.table(b.table());
});
