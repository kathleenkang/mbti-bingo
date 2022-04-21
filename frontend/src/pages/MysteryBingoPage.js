import "./MysteryBingoPage.css";
import BingoBoard from "../components/BingoBoard";
import { useState } from "react";
import VerticalCenter from "../components/VerticalCenter";
import CuteButton from "../components/CuteButton";

function MysteryBingoPage() {
  const myMistypes = JSON.parse(localStorage.getItem("myMistypes"));

  const [curIndex, setCurIndex] = useState(0);

  let curMbti = myMistypes[curIndex].substring(0, 4);

  const [boardArray, setBoardArray] = useState(
    new Array(myMistypes.length)
      .fill(false)
      .map((x) => [
        new Array(5).fill(false),
        new Array(5).fill(false),
        new Array(5).fill(false),
        new Array(5).fill(false),
        new Array(5).fill(false),
      ])
  );

  let changeBoardWithIndex = (index) => {
    return (newBoard) => {
      let newBoardArray = [...boardArray];
      newBoardArray[index] = newBoard;
      setBoardArray(newBoardArray);
    };
  };

  let renderBoard = (board, i) => {
    return (
      <BingoBoard
        mbti={curMbti}
        board={board}
        onBoardChange={changeBoardWithIndex(i)}
        show={curIndex === i}
        isMysteryBingo={true}
      />
    );
  };

  return (
    <VerticalCenter>
      <div className="progress">
        {curIndex + 1} / {myMistypes.length}
      </div>

      {boardArray.map(renderBoard)}

      <div>
        <CuteButton
          to="/results"
          onClick={(e) => {
            if (curIndex + 1 < myMistypes.length) {
              setCurIndex(curIndex + 1);
              return e.preventDefault();
            }

            localStorage.setItem(
              "mistypeBoardArray",
              JSON.stringify(
                myMistypes.map((mistype, i) => {
                  return {
                    mbti: mistype,
                    board: boardArray[i],
                  };
                })
              )
            );
          }}
        >
          {curIndex + 1 < myMistypes.length ? "다음" : "완료"}
        </CuteButton>
      </div>

      {/* <div>
        {curIndex < myMistypes.length ? (
          <Link
            to="/mysterybingo"
            className="btn"
            onClick={(e) => {
              localStorage.setItem(
                `mistype${curIndex + 1}Count`,
                clickedCount(clickedArray)
              );
              curIndex++;
            }}
          >
            완료
          </Link>
        ) : (
          <Link
            to="/results"
            className="btn"
            onClick={(e) =>
              localStorage.setItem(
                `mistype${curIndex + 1}Count`,
                clickedCount(clickedArray)
              )
            }
          >
            완료
          </Link>
        )}
      </div> */}
    </VerticalCenter>
  );
}

export default MysteryBingoPage;
