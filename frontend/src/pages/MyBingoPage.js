import BingoBoard from "../components/BingoBoard";
import { useState } from "react";
import VerticalCenter from "../components/VerticalCenter";
import CuteButton from "../components/CuteButton";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../components/styles/Theme";
import { useUser } from "../contexts/UserContext";
import { flatten, addMbtiToItems } from "../utils/BoardUtils";
import LoadingScreen from "../components/LoadingScreen";

const DarkText = styled.div`
  color: ${(props) => props.theme.darkGrey};
`;

function MyBingoPage() {
  const navigate = useNavigate();
  const user = useUser();

  const [loading, setLoading] = useState(false);

  const [board, setBoard] = useState([
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
    new Array(5).fill(false),
  ]);

  if (!user || loading) {
    return <LoadingScreen />;
  }

  const myName = user["name"];
  const myMbti = user["myMbti"]["mbti"];
  const uid = user["uid"];
  const items = user["myMbti"]["items"];

  return (
    <ThemeProvider theme={theme}>
      <VerticalCenter>
        <DarkText>
          {/* 본인에게 해당되는 설명의 칸을 모두 선택한 후 '완료' 버튼을 눌러주세요! */}
          {myMbti} {myName} 님에게 해당되는 설명의 칸을 <br></br> 모두 선택한 후
          '완료' 버튼을 눌러주세요!
        </DarkText>

        <BingoBoard
          items={addMbtiToItems(items, myMbti)}
          board={board}
          onBoardChange={setBoard}
          show={true}
        />

        <div>
          <CuteButton
            to="/mysterybingointro"
            className="btn mybingo"
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
                  uid: uid,
                  mbti: myMbti,
                  boardVersion: 1,
                  selected: flatten(board),
                }),
              });
              setLoading(false);
              navigate("/mysterybingointro");
            }}
          >
            완료
          </CuteButton>
        </div>
      </VerticalCenter>
    </ThemeProvider>
  );
}

export default MyBingoPage;
