import Matrix from '../src/matrix.js';
import { describe, it, expect } from 'vitest';

describe('Matrix', () => {
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
    const matrix = new Matrix(data);
    const elements = Array.from(matrix);
    expect(elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('*indexes', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const indexes = Array.from(matrix.indexes());
    expect(indexes).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]);
  });

  it('*values', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const matrix = new Matrix(data);
    const elements = Array.from(matrix);
    expect(elements).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('*entries', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const entries = Array.from(matrix.entries());
    expect(entries).toEqual([
      [0, 0, 1],
      [0, 1, 2],
      [1, 0, 3],
      [1, 1, 4],
    ]);
  });

  it('fill', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    matrix.fill(0);
    expect(asArray(matrix)).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  it('copy', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const copy = matrix.copy();
    expect(asArray(copy)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(copy).not.toBe(matrix);
  });

  it('from', () => {
    const rows = 3;
    const cols = 4;
    const matrix = Matrix.from({ rows, cols });
    expect(matrix.rows).toBe(rows);
    expect(matrix.cols).toBe(cols);
    expect(asArray(matrix)).toEqual(
      Array.from({ length: rows }, () => Array(cols).fill(0))
    );
  });

  it('zeroes', () => {
    const rows = 3;
    const cols = 4;
    const matrix = Matrix.zeroes({ rows, cols });
    expect(matrix.rows).toBe(rows);
    expect(matrix.cols).toBe(cols);
    expect(asArray(matrix)).toEqual(
      Array.from({ length: rows }, () => Array(cols).fill(0))
    );
  });

  it('identity', () => {
    const size = 3;
    const matrix = Matrix.identity({ size });
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
    const matrix = new Matrix(data);
    expect(matrix.rows).toBe(2);
    expect(matrix.cols).toBe(2);
  });

  it('get', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    expect(matrix.get(0, 1)).toBe(2);
  });

  it('row', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    expect(matrix.row(1)).toEqual([4, 5, 6]);
    expect(matrix.row(0)).toEqual([1, 2, 3]);
  });

  it('col', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    expect(matrix.col(1)).toEqual([2, 5]);
    expect(matrix.col(0)).toEqual([1, 4]);
    expect(matrix.col(2)).toEqual([3, 6]);
  });

  it('set', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    matrix.set(1, 1, 10);
    expect(matrix.get(1, 1)).toBe(10);
  });

  it('checkIndex', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
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
    const a = new Matrix(data1);
    const b = new Matrix(data2);
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
    const a = new Matrix(data1);
    const b = new Matrix(data2);
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
    const a = new Matrix(data1);
    const b = new Matrix(data2);
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
    const a = new Matrix(data1);
    const b = new Matrix(data2);
    const result = a.multiply(b);
    expect(asArray(result)).toEqual([[14], [32]]);
  });

  it('multiplyWithScalar', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const scalar = 2;
    const matrix = new Matrix(data);
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
    const matrix = new Matrix(data);
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
    const matrix = new Matrix(data);
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
    const matrix = new Matrix(data);
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

  it('determinant', () => {
    const data2by2 = [
      [3, 7],
      [1, -4],
    ];
    const matrix2by2 = new Matrix(data2by2);
    const result2by2 = matrix2by2.determinant();
    expect(result2by2).toBe(-19);

    const data3by3 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const matrix3by3 = new Matrix(data3by3);
    const result3by3 = matrix3by3.determinant();
    expect(result3by3).toBe(0);

    const data4by4 = [
      [1, 3, 5, 9],
      [1, 3, 1, 7],
      [4, 3, 9, 7],
      [5, 2, 0, 9],
    ];
    const matrix4by4 = new Matrix(data4by4);
    const result4by4 = matrix4by4.determinant();
    expect(result4by4).toBe(-376);
  });

  it('every', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.every(value => value > 0);
    expect(result).toBe(true);
  });

  it('some', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.some(value => value > 5);
    expect(result).toBe(true);
  });

  it('find', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.find(value => value > 4);
    expect(result).toEqual(5);
  });

  it('findIndex', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.findIndex(value => value > 4);
    expect(result).toEqual([1, 1]);
  });

  it('findLast', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.findLast(value => value > 4);
    expect(result).toEqual(6);
  });

  it('findLastIndex', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.findLastIndex(value => value > 4);
    expect(result).toEqual([1, 2]);
  });

  it('includes', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.includes(5);
    expect(result).toBe(true);
  });

  it('indexOf', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.indexOf(5);
    expect(result).toEqual([1, 1]);
  });

  it('lastIndexOf', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 5, 9],
    ];
    const matrix = new Matrix(data);
    const result = matrix.lastIndexOf(5);
    expect(result).toEqual([2, 1]);
  });

  it('forEach', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const result = [];
    matrix.forEach((value, [i, j]) => {
      result.push([i, j, value]);
    });
    expect(result).toEqual([
      [0, 0, 1],
      [0, 1, 2],
      [1, 0, 3],
      [1, 1, 4],
    ]);
  });

  it('map', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const result = matrix.map(value => value * 2);
    expect(asArray(result)).toEqual([
      [2, 4],
      [6, 8],
    ]);
  });

  it('reduce', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const result = matrix.reduce((acc, value) => acc + value, 0);
    expect(result).toBe(10);
  });

  it('reduceRight', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const result = matrix.reduceRight((acc, value) => acc + value, '');
    expect(result).toBe('4321');
  });

  it('flat', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const result = matrix.flat();
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('flatMap', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new Matrix(data);
    const result = matrix.flatMap(value => [value, value * 2]);
    expect(result).toEqual([1, 2, 2, 4, 3, 6, 4, 8]);
  });

  it('max', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.max();
    expect(result).toBe(6);
  });

  it('maxPerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.maxPerRow();
    expect(result).toEqual([3, 6]);
  });

  it('maxPerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.maxPerCol();
    expect(result).toEqual([4, 5, 6]);
  });

  it('maxIndex', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.maxIndex();
    expect(result).toEqual([1, 2]);
  });

  it('min', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.min();
    expect(result).toBe(1);
  });

  it('minPerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.minPerRow();
    expect(result).toEqual([1, 4]);
  });

  it('minPerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.minPerCol();
    expect(result).toEqual([1, 2, 3]);
  });

  it('minIndex', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.minIndex();
    expect(result).toEqual([0, 0]);
  });

  it('sum', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.sum();
    expect(result).toBe(21);
  });

  it('sumPerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.sumPerRow();
    expect(result).toEqual([6, 15]);
  });

  it('sumPerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.sumPerCol();
    expect(result).toEqual([5, 7, 9]);
  });

  it('prod', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.prod();
    expect(result).toBe(720);
  });

  it('prodPerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.prodPerRow();
    expect(result).toEqual([6, 120]);
  });

  it('prodPerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.prodPerCol();
    expect(result).toEqual([4, 10, 18]);
  });

  it('mean', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.mean();
    expect(result).toBe(3.5);
  });

  it('meanPerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.meanPerRow();
    expect(result).toEqual([2, 5]);
  });

  it('meanPerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.meanPerCol();
    expect(result).toEqual([2.5, 3.5, 4.5]);
  });

  it('variance', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.variance();
    expect(result).toBe(2.9166666666666665);
  });

  it('variancePerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.variancePerRow();
    expect(result).toEqual([0.6666666666666666, 0.6666666666666666]);
  });

  it('variancePerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.variancePerCol();
    expect(result).toEqual([2.25, 2.25, 2.25]);
  });

  it('std', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.std();
    expect(result).toBe(1.707825127659933);
  });

  it('stdPerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.stdPerRow();
    expect(result).toEqual([0.816496580927726, 0.816496580927726]);
  });

  it('stdPerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.stdPerCol();
    expect(result).toEqual([1.5, 1.5, 1.5]);
  });

  it('cumulativeSum', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.cumulativeSum();
    expect(asArray(result)).toEqual([
      [1, 3, 6],
      [10, 15, 21],
    ]);
  });

  it('cumulativeSumPerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.cumulativeSumPerRow();
    expect(asArray(result)).toEqual([
      [1, 3, 6],
      [4, 9, 15],
    ]);
  });

  it('cumulativeSumPerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.cumulativeSumPerCol();
    expect(asArray(result)).toEqual([
      [1, 2, 3],
      [5, 7, 9],
    ]);
  });

  it('cumulativeProd', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.cumulativeProd();
    expect(asArray(result)).toEqual([
      [1, 2, 6],
      [24, 120, 720],
    ]);
  });

  it('cumulativeProdPerRow', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.cumulativeProdPerRow();
    expect(asArray(result)).toEqual([
      [1, 2, 6],
      [4, 20, 120],
    ]);
  });

  it('cumulativeProdPerCol', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new Matrix(data);
    const result = matrix.cumulativeProdPerCol();
    expect(asArray(result)).toEqual([
      [1, 2, 3],
      [4, 10, 18],
    ]);
  });
});
