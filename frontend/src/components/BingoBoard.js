import "./BingoBoard.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

const FrameTitle = styled.div`
  font-family: "cooper";
  font-size: 60px;
  font-weight: normal;
  color: white;
  padding: 10px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BoardContainer = styled.div`
  width: 355px;
  height: 340px;
  margin: auto auto;
`;

const Frame = styled.div`
  background-color: #fc474f;
  width: 368px;
  height: 450px;
  margin: 20px auto;
`;

function BingoBoard({
  board,
  onBoardChange,
  show,
  isMysteryBingo,
  disableClick,
  items,
}) {
  // splitting an array into chunks of 5 items each
  let rows = [];
  const size = 5;
  for (let i = 0; i < items.length; i += size)
    rows.push(items.slice(i, i + size));

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
    return rowNum === 2 && colNum === 2;
  };

  // let unclickable =

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

  // const Square = styled.div`
  //   width: 67px;
  //   height: 67px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   margin: 2px;
  //   flex: 1;
  //   text-overflow: clip;
  //   font-size: ${hasLongWord ? "12px" : "14px"};
  //   font-size: 12px;
  //   word-break: keep-all;
  //   background-color: white;
  // `;

  // let renderSquare = (item, rowNum, colNum) => (
  //   <Square
  //     key={`square${colNum}`}
  //     onClick={() => onClickSquare(rowNum, colNum)}
  //   >
  //     {isFreeSpace(rowNum, colNum) && isMysteryBingo ? "?" : item}
  //     {/* {isFreeSpace(rowNum, colNum) ? "unclickable" : ""} */}
  //   </Square>
  // );

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
      <Frame>
        <div className={`frame ${disableClick ? "disabled" : ""}`}>
          <FrameTitle>
            {"BINGO".split("").map((letter, i) => (
              <span key={`${i}th-letter`}>{letter}</span>
            ))}
          </FrameTitle>
          <BoardContainer key={`container${rows.key}`}>
            {rows.map(renderRow)}
          </BoardContainer>
        </div>
      </Frame>
    </>
  );
}

export default BingoBoard;
