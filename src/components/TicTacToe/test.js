const initArray = size => Array.from(new Array(size * size).keys());

const getRowsFromArray = (n = 3) => {
  const arr = initArray(n);
  const result = [];
  for (let i = n; i <= arr.length; i += n) {
    const item = [];
    for (let j = i - n; j < i; j++) {
      item.push(arr[j]);
    }
    result.push(item);
  }
  return result;
};

const getColumnsFromRowsArray = arr =>
  arr[0].map((col, i) => arr.map(row => row[i]));

const getArrayDiagonals = arr => {
  const n = arr.length;
  const primaryDiagonal = [];
  const secondaryDiagonal = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        primaryDiagonal.push(arr[i][j]);
      }
      if (i + j === n - 1) {
        secondaryDiagonal.push(arr[i][j]);
      }
    }
  }
  return [primaryDiagonal, secondaryDiagonal];
};

export const getWinningCombinations = size => {
  const result = [];
  const winningRows = getRowsFromArray(size);
  const winningColumns = getColumnsFromRowsArray(winningRows);
  const winningDiagonals = getArrayDiagonals(winningRows);
  result.push(...winningRows);
  result.push(...winningColumns);
  result.push(...winningDiagonals);
  return result;
};
