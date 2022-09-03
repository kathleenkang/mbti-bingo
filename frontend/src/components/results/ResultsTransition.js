import Container from "../../components/styles/Container";
import VerticalCenter from "../../components/VerticalCenter";
import { Typewriter } from "react-simple-typewriter";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../components/styles/Theme";

import gif from "../../images/present.gif";

const ResultsTransitionStyle = styled.div`
  background-color: #fadcdc;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 999;
`;

const FixedText = styled.div`
  color: ${(props) => props.theme.purpleAccent};
  font-size: 28px;
  font-weight: bold;
  margin-top: 90px;
  margin-bottom: 50px;
`;

const TypewriterText = styled.div`
  font-size: 30px;
  // color: ${(props) => props.theme.darkGrey};
  color: ${(props) => props.theme.lightPurple};
  margin: 50px auto;
`;

const HighlightedPinkText = styled.span`
  color: ${(props) => props.theme.hotpinkAccent};
  font-weight: bold;
  display: inline-block;
  background-color: ${(props) => props.theme.yellowHighlight};
  transform: skewX(-10deg);
  padding: 0px 3.5px;
`;

function ResultsTransition({ show }) {
  if (!show) {
    return;
  }

  return (
    <ThemeProvider theme={theme}>
      <ResultsTransitionStyle>
        <Container>
          <VerticalCenter>
            <FixedText>
              과연 나의 <HighlightedPinkText>진짜 MBTI</HighlightedPinkText>는
              뭘까?
            </FixedText>
            <img src={gif} alt="loading" width="100%" />
            <TypewriterText>
              <Typewriter
                loop="1"
                cursor
                cursorStyle=""
                // typeSpeed={80}
                typeSpeed={100}
                deleteSpeed={70}
                delaySpeed={1000}
                // words={["*drumroll*"]}
                // words={["두구두구두구두구두구두구"]}
                // words={["♡✧。°₊·ˈ∗♡∗ˈ‧₊°。✧♡"]}
                // words={["✐✎✐✎✐✎✐✎✐✎✐✎✐"]}
                words={["▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀"]}
              />
            </TypewriterText>
          </VerticalCenter>
        </Container>
      </ResultsTransitionStyle>
    </ThemeProvider>
  );
}

export default ResultsTransition;
