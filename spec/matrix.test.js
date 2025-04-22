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

  it('should return the correct indexes', () => {
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

  it('should have the correct number of rows and columns', () => {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const matrix = new MatrixClass(data);
    expect(matrix.rows).toBe(2);
    expect(matrix.cols).toBe(2);
  });

  it('should get elements correctly', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    expect(matrix.get(0, 1)).toBe(2);
  });

  it('should set elements correctly', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    matrix.set(1, 1, 10);
    expect(matrix.get(1, 1)).toBe(10);
  });

  it('should throw an error for out-of-bounds access', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix = new MatrixClass(data);
    expect(() => matrix.get(2, 0)).toThrow('Index out of bounds');
    expect(() => matrix.set(0, 3, 10)).toThrow('Index out of bounds');
  });

  it('should add the matrix correctly', () => {
    const data1 = [
      [1, 2],
      [3, 4],
    ];
    const data2 = [
      [5, 6],
      [7, 8],
    ];
    const matrix1 = new MatrixClass(data1);
    const matrix2 = new MatrixClass(data2);
    matrix1.add(matrix2);
    expect([...matrix1]).toEqual([6, 8, 10, 12]);
  });

  it('should subtract the matrix correctly', () => {
    const data1 = [
      [5, 6],
      [7, 8],
    ];
    const data2 = [
      [1, 2],
      [3, 4],
    ];
    const matrix1 = new MatrixClass(data1);
    const matrix2 = new MatrixClass(data2);
    matrix1.subtract(matrix2);
    expect([...matrix1]).toEqual([4, 4, 4, 4]);
  });

  it('should create a matrix from dimensions', () => {
    const rows = 3;
    const cols = 4;
    const matrix = MatrixClass.from({ rows, cols });
    expect(matrix.rows).toBe(rows);
    expect(matrix.cols).toBe(cols);
    expect([...matrix]).toEqual(Array.from({ length: rows * cols }, () => 0));
  });
});
