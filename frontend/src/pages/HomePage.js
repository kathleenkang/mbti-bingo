import VerticalCenter from "../components/VerticalCenter";
import gif from "../images/start.gif";
import CuteButton from "../components/CuteButton";
import styled, { ThemeProvider } from "styled-components";
import theme from "../components/styles/Theme";
import AccordionSignature from "../components/Signature.js";

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #2a2c38;
  // margin-top: 10px;
`;

const BingoText = styled.span`
  font-size: 39px;
  padding-right: 2px;
  color: ${(props) => props.theme.lightPurple};
`;

const MbtiText = styled.span`
  font-size: 52px;
  vertical-align: middle;
  color: ${(props) => props.theme.hotpinkAccent};
`;

const ExcMark = styled.span`
  font-size: 50px;
  vertical-align: middle;
`;

const ItalicHighlight = styled.span`
  display: inline-block;
  background-color: ${(props) => props.theme.yellowHighlight};
  transform: skewX(-10deg);
  padding: 8px 5px 0px 5px;
`;

const ImagePadding = styled.div`
  padding-bottom: 30px;
`;

function HomePage() {
  return (
    <ThemeProvider theme={theme}>
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
        <ImagePadding>
          <img src={gif} alt="heroheader" width="90%" />
        </ImagePadding>

        <CuteButton to="/profile">시작하기</CuteButton>

        <AccordionSignature />
      </VerticalCenter>
    </ThemeProvider>
  );
}

export default HomePage;
