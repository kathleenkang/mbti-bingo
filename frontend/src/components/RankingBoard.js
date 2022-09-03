import styled, { ThemeProvider } from "styled-components";
import theme from "../components/styles/Theme";

const RankingContainer = styled.div`
  background-color: ${(prop) => prop.theme.peach};
  // width: 320px;
  width: 280px;
  margin: 30px auto;
  border-radius: 15px;
  padding-bottom: 10px;
`;

const RankingBoardTitle = styled.div`
  color: white;
  font-size: 30px;
  font-family: "cooper";
  padding: 15px;
`;

const RankingItem = styled.div`
  display: flex;
  padding: 10px 22px 15px;
  justify-content: space-evenly;
`;

const ImgContainer = styled.div`
  width: 50px;
  position: relative;
  top: -6px;
  left: -10px;
  z-index: 90;
`;

const FrontImg = styled.img`
  position: relative;
  top: 10px;
  left: 4px;
`;

const BackImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  filter: brightness(135%);
`;

const Rank = styled.div`
  font-family: "cooper";
  font-size: 30px;
  color: #faf2b3;
  width: 10px;
  position: relative;
  top: -15px;
  z-index: 100;
`;

const MbtiName = styled.div`
  font-family: "cooper";
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  font-size: 30px;
  color: white;
  // padding-right: 10px;
  // width: 120px;
  // text-align: left;
  z-index: 80;
`;

const MbtiCount = styled.div`
  font-family: "Courier New", Courier, monospace;
  width: 46px;
`;

const NumberCounted = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: ${(prop) => prop.theme.lemon};
  line-height: 36px;
`;

const Unit = styled.span`
  font-family: "bingre";
  font-size: 16px;
  color: white;
`;

function RankingBoard({ ranking }) {
  // let hasCog = (text) => {
  //   return text.length > 4;
  // };

  let renderRankingItem = (item, i) => {
    return (
      <ThemeProvider theme={theme}>
        <RankingItem key={`rank${i}`}>
          <Rank>{item.ranking}</Rank>
          <ImgContainer>
            <BackImg src={require(`../images/circle.png`)} width="50px" />
            <FrontImg
              src={require(`../images/${item.id
                .slice(0, 4)
                .toLowerCase()}.png`)}
              width="43px"
            />
          </ImgContainer>
          <MbtiName>
            <span className="mbti-main">{item.id.slice(0, 4)}</span>
            {/* <span className="mbti-cog">{item.id.slice(5, 8)}</span> */}
          </MbtiName>
          <MbtiCount>
            <NumberCounted>{item.count}</NumberCounted>
            <Unit>개</Unit>
          </MbtiCount>
        </RankingItem>
      </ThemeProvider>
    );
  };

  return (
    <>
      <RankingContainer>
        <RankingBoardTitle>RANKING</RankingBoardTitle>
        {ranking.map(renderRankingItem)}
      </RankingContainer>
    </>
  );
}

export default RankingBoard;
