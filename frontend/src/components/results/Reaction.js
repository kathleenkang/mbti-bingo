import definite from "../../images/definite.gif";
import likely from "../../images/likely.gif";
import tie from "../../images/tie.gif";
import surprise from "../../images/surprise.gif";
import { getType, trueCount } from "../../utils/ResultsUtils";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../components/styles/Theme";

const ReactionText = styled.div`
  color: ${(props) => props.theme.purpleAccent};
  font-size: 18px;
  font-weight: bold;
  word-break: keep-all;
  display: inline-block;
  background-color: ${(props) => props.theme.yellowHighlight};
  transform: skewX(-10deg);
  padding: 0px 3.5px;
  padding-top: 3px;
  line-height: 24px;
`;

const ReactionImg = styled.img`
  margin-bottom: 10px;
  border-radius: 15px;
  // width: 320px;
  width: 280px;
  background-color: #fcd9ce;
`;

function ReactionContent({ type, myMbti, firstPlaceArray }) {
  const imageOptions = {
    definite: definite,
    tie: tie,
    surprise: surprise,
    likely: likely,
  };

  const textOptions = {
    definite: <>앞구르기 뒷구르기하면서 봐도 {myMbti}</>,
    tie: (
      <>
        내 안에 싸우고 있는 {firstPlaceArray.length}개의 자아
        <br /> 나...어쩌면{" "}
        {firstPlaceArray
          .filter((obj) => obj.id !== myMbti)
          .map((obj) => obj.id)
          .join("나 ")}
        일지도...?
      </>
    ),
    surprise: (
      <>
        한평생 {myMbti}로 살아온 내가 사실은 {<br />}
        {firstPlaceArray.map((obj) => obj.id).join("나 ")}...?!
      </>
    ),
    likely: <>MBTI는 과학이다— 아무래도 {myMbti} 맞는 듯~!</>,
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ReactionImg src={imageOptions[type]} loop="infinite" />
        <ReactionText>{textOptions[type]}</ReactionText>
      </div>
    </ThemeProvider>
  );
}

function Reaction({ bingoSubmissions, myMbti }) {
  const firstPlaceArray = bingoSubmissions.filter((obj) => obj.ranking === 1);
  const type = getType(bingoSubmissions, myMbti);

  return (
    <ReactionContent
      type={type}
      myMbti={myMbti}
      firstPlaceArray={firstPlaceArray}
    />
  );
}

export default Reaction;
