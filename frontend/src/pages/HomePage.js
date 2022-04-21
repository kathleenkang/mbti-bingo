import VerticalCenter from "../components/VerticalCenter";
import gif from "../images/start.gif";
import CuteButton from "../components/CuteButton";
import styled from "styled-components";

const Title = styled.h1`
  margin: 0;
  font-size: 42px;
  color: #2a2c38;
`;

const BingoText = styled.span`
  color: #9ab8fa;
  font-size: 45px;
  padding-right: 2px;
`;

const MbtiText = styled.span`
  font-size: 60px;
  color: #d7588d;
  vertical-align: middle;
`;

const ExcMark = styled.span`
  font-size: 50px;
  vertical-align: middle;
`;

const ItalicHighlight = styled.span`
  display: inline-block;
  background-color: #f7e97f;
  transform: skewX(-10deg);
  padding: 0px 3.5px;
`;

function HomePage() {
  return (
    <VerticalCenter>
      <Title>
        <span id="first-row">
          <BingoText>빙고</BingoText>로 알아보는
        </span>
        <br />
        <span>나의 </span>
        <ItalicHighlight>
          <span id="real-txt">진짜 </span>
          <MbtiText>MBTI</MbtiText>
          <ExcMark>!</ExcMark>
        </ItalicHighlight>
      </Title>
      <div className="heroheader">
        <img src={gif} alt="heroheader" width="100%" />
      </div>

      <CuteButton to="/profile">시작하기</CuteButton>
    </VerticalCenter>
  );
}

export default HomePage;
