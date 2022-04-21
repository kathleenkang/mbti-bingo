import "./MyBingoPage.css";
import BingoBoard from "../components/BingoBoard";
import { useState } from "react";
import VerticalCenter from "../components/VerticalCenter";
import CuteButton from "../components/CuteButton";

function MyBingoPage() {
  const myName = localStorage.getItem("myName");
  const myMbti = localStorage.getItem("myMbti");
  // const myMbti = localStorage.getItem("myMbti").join("");
  // const myMbti = JSON.parse(localStorage.getItem("myMbti"));

  const [board, setBoard] = useState([
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
  ]);

  // const clickedCount = clickedArray.filter(Boolean).length;

  // let clickedCount = (array) => {
  //   let count = 0;
  //   for (let i = 0; i < board.length; i++) {
  //     count += array[i].filter(Boolean).length;
  //   }
  //   return count;
  // };

  return (
    <VerticalCenter>
      <div className="bingo-instruction">
        {/* 본인에게 해당되는 설명의 칸을 모두 선택한 후 '완료' 버튼을 눌러주세요! */}
        {myMbti} {myName} 님에게 해당되는 설명의 칸을 <br></br> 모두 선택한 후
        '완료' 버튼을 눌러주세요!
      </div>

      <BingoBoard
        mbti={myMbti}
        board={board}
        onBoardChange={setBoard}
        show={true}
      />

      <div>
        <CuteButton
          to="/mysterybingointro"
          className="btn mybingo"
          onClick={(e) =>
            localStorage.setItem("myMbtiBoard", JSON.stringify(board))
          }
        >
          완료
        </CuteButton>
      </div>
    </VerticalCenter>
  );
}

export default MyBingoPage;
