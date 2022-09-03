import gif from "../images/space.gif";
import VerticalCenter from "../components/VerticalCenter";
import CuteButton from "../components/CuteButton";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import styled, { StyleSheetManager, ThemeProvider } from "styled-components";
import theme from "../components/styles/Theme";
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

// 맨 위 마진?

const PinkText = styled.span`
  color: ${(props) => props.theme.hotpinkAccent};
  font-weight: bold;
  font-size: 25px;
`;

// const PinkText = css`
//   color: ${(props) => props.theme.hotpinkAccent};
//   font-weight: bold;
//   font-size: 25px;
// `;

const PinkBigText = styled(PinkText)`
  font-size: 34px;
`;

const PurpleText = styled.span`
  color: ${(props) => props.theme.purpleAccent};
  font-weight: 600;
  font-size: 25px;
`;

const ItalicHighlight = styled.span`
  display: inline-block;
  // background-color: ${(props) => props.theme.yellowHighlight}
  background-color: #f7e97f;
  transform: skewX(-10deg);
  padding: 3px 3.5px 0px 3.5px;
`;

// const HighlightedPinkText = styled(ItalicHighlight)`
//   ${PinkText}// <PinkBigText {...props} />
// `;

// const HighlightedPinkText = styled(ItalicHighlight)`
//   color: ${(props) => props.theme.hotpinkAccent};
//   font-weight: bold;
//   font-size: 25px;
// `;

// css mixin doesn't work
// props yellohighligh doesn't work
const HighlightedPinkText = styled(PinkBigText)`
  display: inline-block;
  background-color: #f7e97f;
  transform: skewX(-10deg);
  padding: 5px 3.5px 0px 3.5px;
`;

const Margin = styled.div`
  margin-bottom: 50px;
  font-size: 21px;
  line-height: 35px;
`;

function MysteryBingoIntroPage() {
  const user = useUser();

  const [loading, setLoading] = useState(false);

  if (!user || loading) {
    return <LoadingScreen />;
  }
  const myName = user["name"];
  const myMbti = user["myMbti"]["mbti"];
  const uid = user["uid"];
  const myMistypes = user["mistypes"];

  return (
    <ThemeProvider theme={theme}>
      <VerticalCenter>
        <h1>
          <PinkBigText>
            {myMbti} {myName}{" "}
          </PinkBigText>
          님의
          <br />
          <HighlightedPinkText>진짜 MBTI</HighlightedPinkText>는?!
        </h1>

        <div className="profiles-image">
          <img src={gif} alt="profiles" width="100%" />
        </div>

        <Margin>
          <PurpleText>
            {myMbti} 맞춤형 <ItalicHighlight>미스테리 빙고</ItalicHighlight>
          </PurpleText>
          가
          <br />
          <PinkText>{myMistypes.length}개</PinkText> 준비되어 있어요!
        </Margin>

        <div>
          <CuteButton to={"/mysterybingo"}>미스테리 빙고 풀러가기!</CuteButton>
        </div>
      </VerticalCenter>
    </ThemeProvider>
  );
}

export default MysteryBingoIntroPage;
