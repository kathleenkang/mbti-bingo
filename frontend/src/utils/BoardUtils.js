export function addMbtiToItems(items, mbti) {
  return [...items.slice(0, 12), mbti, ...items.slice(12)];
}

export function selectedToFiveByFive(selected) {
  let board = [
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
  ];

  selected
    .map((n) => (n > 11 ? n + 1 : n))
    .forEach((element) => {
      let row = Math.floor(element / 5);
      let col = element % 5;
      board[row][col] = true;
    });

  return board;
}

export function flatten(board) {
  let flattenedArr = board.flat();
  flattenedArr = [...flattenedArr.slice(0, 12), ...flattenedArr.slice(13)];
  return flattenedArr.flatMap((bool, index) => (bool ? index : []));
}
