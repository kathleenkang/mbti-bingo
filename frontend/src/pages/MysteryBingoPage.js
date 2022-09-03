import BingoBoard from "../components/BingoBoard";
import { useState } from "react";
import VerticalCenter from "../components/VerticalCenter";
import CuteButton from "../components/CuteButton";
import { useUser } from "../contexts/UserContext";
import styled, { ThemeProvider } from "styled-components";
import theme from "../components/styles/Theme";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const Progress = styled.div`
  color: ${(props) => props.theme.lightPurple};
  font-weight: bold;
  // font-size: 18px;
`;

function MysteryBingoPage() {
  const user = useUser();
  const navigate = useNavigate();
  const myMistypes = user["mistypes"];

  const [loading, setLoading] = useState(false);
  const [curIndex, setCurIndex] = useState(0);

  const [boardArray, setBoardArray] = useState(
    // new Array(myMistypes.length)
    new Array(4)
      .fill(false)
      .map((x) => [
        new Array(5).fill(false),
        new Array(5).fill(false),
        new Array(5).fill(false),
        new Array(5).fill(false),
        new Array(5).fill(false),
      ])
  );

  if (!user || loading) {
    return <LoadingScreen />;
  }

  let getSelectedArray = (board) => {
    let flattenedArr = board.flat();
    flattenedArr = [...flattenedArr.slice(0, 12), ...flattenedArr.slice(13)];
    return flattenedArr.flatMap((bool, index) => (bool ? index : []));
  };

  const mistypes = user["mistypes"];
  let curMistype = mistypes[curIndex];

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
        board={board}
        items={[
          ...curMistype.items.slice(0, 12),
          curMistype.mbti,
          ...curMistype.items.slice(12),
        ]}
        onBoardChange={changeBoardWithIndex(i)}
        show={curIndex === i}
        isMysteryBingo={true}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <VerticalCenter>
        <Progress>
          {curIndex + 1} / {mistypes.length}
        </Progress>

        {boardArray.map(renderBoard)}

        <div>
          <CuteButton
            to="/results"
            onClick={async (e) => {
              e.preventDefault();

              setLoading(true);
              await fetch("https://api.mbtibingo.com/users", {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify({
                  uid: user.uid,
                  mbti: mistypes[curIndex].mbti,
                  boardVersion: 1,
                  selected: getSelectedArray(boardArray[curIndex]),
                }),
              });
              setLoading(false);

              if (curIndex + 1 < mistypes.length) {
                setCurIndex(curIndex + 1);
                // return e.preventDefault();
              } else {
                navigate(`/users/${localStorage.getItem("uid")}/results`);
              }
            }}
          >
            {curIndex + 1 < mistypes.length ? "다음 ➜" : "완료"}
          </CuteButton>
        </div>
      </VerticalCenter>
    </ThemeProvider>
  );
}

export default MysteryBingoPage;
