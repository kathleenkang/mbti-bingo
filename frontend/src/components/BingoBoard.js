import "./BingoBoard.css";
import { useLocation } from "react-router-dom";

import bingoContentData from "../data/bingoContentData.json";

// function BingoBoard({ items }) {
function BingoBoard({
  mbti,
  board,
  onBoardChange,
  show,
  isMysteryBingo,
  disableClick,
}) {
  // console.log(bingoContentData);
  // console.log(mbti);
  const items = bingoContentData.find((obj) => obj.id == mbti).items;
  const pathname = useLocation().pathname;
  // const isMysteryBingo = pathname === "/mysterybingo";
  // console.log(pathname);

  // splitting an array into chunks of 5 items each
  let rows = [];
  const size = 5;
  for (let i = 0; i < items.length; i += size)
    rows.push(items.slice(i, i + size));

  // let rowDivs = [];
  // for (let i = 0; i < rows.length; i++) {
  //   let currentRow = rows[i];
  //   let colDivs = [];
  //   for (let j = 0; j < currentRow.length; j++) {
  //     let currentItem = currentRow[j];
  //     colDivs.push(<div className="col">{currentItem}</div>);
  //   }

  //   rowDivs.push(<div className="row">{colDivs}</div>);
  // }

  let onClickSquare = (rowNum, colNum) => {
    if (disableClick) {
      return;
    }
    let newBoard = [...board];
    newBoard[rowNum][colNum] = !newBoard[rowNum][colNum];
    onBoardChange(newBoard);
  };

  let hasLongWord = (text) => {
    return text.split(" ").filter((word) => word.length > 5).length > 0;
  };

  let isFreeSpace = (rowNum, colNum) => {
    return rowNum == 2 && colNum == 2;
  };

  let renderSquare = (item, rowNum, colNum) => (
    <div
      className={`square ${hasLongWord(item) ? "long" : ""} ${
        board[rowNum][colNum] ? "activated" : ""
      } ${isFreeSpace(rowNum, colNum) ? "unclickable" : ""}`}
      key={`square${colNum}`}
      onClick={() => onClickSquare(rowNum, colNum)}
    >
      {isFreeSpace(rowNum, colNum) && isMysteryBingo ? "?" : item}
    </div>
  );

  let renderRow = (row, rowNum) => (
    <div className="row" key={`row${rowNum}`}>
      {row.map((item, colNum) => renderSquare(item, rowNum, colNum))}
    </div>
  );

  if (!show) {
    return;
  }

  return (
    <>
      <div className={`frame ${disableClick ? "disabled" : ""}`}>
        <div className="frame-title">
          {/* key 이렇게 넣는 거 맞나? */}
          {"BINGO".split("").map((letter, i) => (
            <span key={`${i}th-letter`}>{letter}</span>
          ))}
        </div>
        {/* key 이렇게 넣는 거 맞나? */}
        <div className="board-container" key={`container${rows.key}`}>
          {rows.map(renderRow)}
        </div>
      </div>
    </>
  );
}

export default BingoBoard;
