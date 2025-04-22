import Matrix from './matrix.js';
import repl from 'node:repl';

const replServer = repl.start();
// Set up a history file for the REPL
replServer.setupHistory('repl.log', () => {});

[
  ['Naive2D', Matrix.Naive2D],
  ['Flat1D', Matrix.Flat1D],
].forEach(([name, MatrixClass]) => {
  replServer.context[name] = MatrixClass;
});
