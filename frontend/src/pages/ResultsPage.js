import BingoBoard from "../components/BingoBoard";
import Accordion from "../components/Accordion";
import RankingBoard from "../components/RankingBoard";
import mbtiProfiles from "../data/mbtiProfiles.json";

import React, { useEffect, useState } from "react";

// import { useUser } from "../contexts/UserContext";
import ResultsTransition from "../components/results/ResultsTransition";
import { getSortedSubmissions, getType } from "../utils/ResultsUtils";
import Reaction from "../components/results/Reaction";
import ResultsSummary from "../components/results/ResultsSummary";
import { addMbtiToItems, selectedToFiveByFive } from "../utils/BoardUtils";
import { useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../components/styles/Theme";
import CuteButton from "../components/CuteButton";
import PositionedDialog from "../components/PositionedDialog";
import SpeechBubble from "../components/SpeechBubble";
// import LoadingScreen from "../components/LoadingScreen";
import AccordionSignature from "../components/Signature";
// import KakaoShare from "../components/KakaotalkShare";

// import { Share } from "react-native";

const BoldText = styled.span`
  font-weight: bold;
`;

const PurpleText = styled.span`
  color: ${(prop) => prop.theme.purpleAccent};
`;

const Highlight = styled.span`
  display: inline-block;
  transform: skewX(-10deg);
  padding: 4px 3.5px 0px 3.5px;
  font-weight: bold;
`;

const HighlightedPinkText = styled(Highlight)`
  color: ${(props) => props.theme.hotpinkAccent};
  background-color: ${(props) => props.theme.yellowHighlight};
`;

const Headline = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 25px;
  line-height: 40px;
  margin-top: 30px;
`;

const Margin = styled.div`
  margin: 40px 0px;
`;

const OriginalBingoContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 35px;
`;

const OriginalBingoTitle = styled(Highlight)`
  font-size: 27px;
  font-weight: bold;
  background-color: ${(props) => props.theme.yellowHighlight};
`;

const Aux = styled.span`
  color: ${(props) => props.theme.lightGrey};
  // color: ${(props) => props.theme.lightPurple};
  // color: #b0aef8;
  // color: ${(props) => props.theme.purpleAccent};
  font-size: 20px;
`;

const WinnerItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // flex-basis: 168px;
  flex-basis: 180px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const WinnerContainer = styled.div`
  display: flex;
  margin: 20px auto;
  max-width: 375px;
  flex-wrap: wrap;
  justify-content: center;
`;

const WinnerImgContainerSingle = styled.div`
  width: 300px;
  height: 225px;
  overflow: hidden;
`;

const WinnerImgContainerMultiple = styled(WinnerImgContainerSingle)`
  width: 110px;
  height: 81px;
`;

const WinnerImgSingle = styled.img`
  width: 300px;
`;

const WinnerImgSingleMultiple = styled.img`
  width: 110px;
`;

const WinnerMbtiNametagSingle = styled(Highlight)`
  background-color: ${(props) => props.theme.purpleAccent};
  color: white;
  font-size: 30px;
  height: 35px;
  line-height: 32px;
  width: 120px;
  margin: 5px auto;
`;

const WinnerMbtiNametagMultiple = styled(WinnerMbtiNametagSingle)`
  font-size: 22px;
  line-height: 30px;
`;

const WinnerMbtiNicknameSingle = styled.div`
  color: ${(props) => props.theme.darkGrey};
  line-height: 30px;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
`;

const WinnerMbtiNicknameMultiple = styled(WinnerMbtiNicknameSingle)`
  font-size: 14.5px;
  font-weight: 500;
`;

const MistypeTitle = styled.div`
  width: 360px;
  margin: auto auto;
  display: flex;
  justify-content: space-between;
`;

const NthMistype = styled.span`
  font-size: 23px;
  font-weight: bold;
  color: ${(props) => props.theme.purpleAccent};
  font-family: "Courier New", Courier, monospace;
  word-spacing: -5px;
  // line-height: 45px;
  // display: table-cell;
  // vertical-align: bottom;
  // display: flex;
  // justify-content: flex-end;
`;

const MistypeName = styled(Highlight)`
  font-size: 28px;
  color: ${(props) => props.theme.darkGrey};
  font-weight: bold;
  background-color: ${(props) => props.theme.yellowHighlight};
`;

const Buttons = styled.div`
  margin: 40px auto;
`;

const StartOverBtn = styled.a`
  color: ${(props) => props.theme.purpleAccent};
  text-decoration: underline wavy;
  display: block;
  margin: 40px auto;
  text-underline-position: under;
  font-weight: bold;
`;

const ListItem = styled.div`
  margin: 6px 0px;
  display: flex;
`;

const BulletPoint = styled.div`
  display: flex-item;
  margin-right: 10px;
`;

const CharacteristicContent = styled.div`
  display: flex-item;
`;

function ResultsPage() {
  const params = useParams();
  const uid = params.uid;
  const [results, setResults] = useState(null);
  const [showTransition, setShowTransition] = useState(true);

  const loadResults = async () => {
    setTimeout(async () => {
      const response = await fetch(
        `https://api.mbtibingo.com/users/${uid}/results`
      );
      const body = await response.json();
      setResults(body);
    }, 1000);
  };

  useEffect(() => {
    loadResults();
  }, []);

  const sameUser = uid === localStorage.getItem("uid");

  if (!results) {
    return <ResultsTransition show={showTransition} />;
  }
  // if (!results && sameUser) {
  //   return <ResultsTransition show={showTransition} />;
  // } else if (!results && !sameUser) {
  //   return <LoadingScreen />;
  // }

  // if (!results) {
  //   return(
  //     {sameUser ? (<ResultsTransition show={showTransition}/>) : ""});
  // }

  const myName = results.name;
  const myMbti = results.myMbti[0].mbti;
  // const myMbtiCount = getMyMbtiCount(results.bingoSubmissions, myMbti);
  const bingoSubmissions = getSortedSubmissions(
    results.bingoSubmissions,
    myMbti
  );

  let firstPlaceArray = bingoSubmissions
    .filter((obj) => obj.ranking === 1)
    .map((obj) => obj.id);

  function originalBingoTitle(type) {
    switch (type) {
      case "surprise":
        return (
          <>
            나의 MBTI<Aux> (였던 것)</Aux>
          </>
        );
      case "tie":
        return (
          <>
            나의 MBTI<Aux> (일 수도~ 아닐 수도~)</Aux>
            {/* 오리지널 MBTI */}
          </>
        );
      default:
        return "나의 MBTI 빙고";
    }
  }

  let renderMistype = (mistype, i) => {
    let title = `${mistype.mbti}의 특징`;
    let stringArray = mbtiProfiles.find(
      (obj) => obj.mbti === mistype.mbti
    ).characteristics;
    let content = stringArray.map((o) => (
      <ListItem key={o}>
        <BulletPoint>👉</BulletPoint>
        <CharacteristicContent>{o}</CharacteristicContent>
      </ListItem>
    ));

    let mistypeMbti = mistype.mbti;
    let mistypeMbtiShort = mistypeMbti.slice(0, 4);

    return (
      <Margin key={`mistyperender${i}`}>
        <MistypeTitle>
          <NthMistype>MYSTERY BINGO #{i + 1} </NthMistype>
          <MistypeName>{mistype.mbti}</MistypeName>
        </MistypeTitle>

        <div className="mistype-bingo">
          <BingoBoard
            mbti={mistypeMbtiShort}
            board={selectedToFiveByFive(
              bingoSubmissions.find((obj) => obj.id === mistypeMbtiShort)
                .selected
            )}
            items={addMbtiToItems(
              results.bingoBoards.find((obj) => obj.mbti === mistypeMbtiShort)
                .items,
              mistypeMbtiShort
            )}
            show={true}
            disableClick={true}
          />
        </div>
        <div className="mistype-reason">
          <Accordion title={title} content={content} />
        </div>
      </Margin>
    );
  };

  let renderMbtiImage = (item, i) => {
    let mbtiname = item;
    let nickname = mbtiProfiles.find((obj) => obj.mbti === item).nickname;
    if (firstPlaceArray.length === 1) {
      return (
        <WinnerItem key={`winner-item${i}`}>
          <WinnerImgContainerSingle>
            <WinnerImgSingle
              src={require(`../images/${mbtiname
                .slice(0, 4)
                .toLowerCase()}.png`)}
            />
          </WinnerImgContainerSingle>
          <WinnerMbtiNametagSingle>{mbtiname}</WinnerMbtiNametagSingle>
          <WinnerMbtiNicknameSingle>{nickname}</WinnerMbtiNicknameSingle>
        </WinnerItem>
      );
    } else {
      return (
        <WinnerItem key={`winner-item${i}`}>
          <WinnerImgContainerMultiple>
            <WinnerImgSingleMultiple
              src={require(`../images/${mbtiname
                .slice(0, 4)
                .toLowerCase()}.png`)}
            />
          </WinnerImgContainerMultiple>
          <WinnerMbtiNametagMultiple>{mbtiname}</WinnerMbtiNametagMultiple>
          <WinnerMbtiNicknameMultiple>{nickname}</WinnerMbtiNicknameMultiple>
        </WinnerItem>
      );
    }
  };

  // const sameUser = uid === localStorage.getItem("uid");

  let renderButtons = () => {
    return (
      <Buttons>
        {sameUser ? (
          <>
            <CuteButton
              to="/"
              onClick={(e) => {
                // KakaoShare();
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href).then(() => {
                  PositionedDialog("URL이 복사되었습니다!");
                });
                // Share.share({ title: "title", message: "blah" });
              }}
            >
              나의 진짜 MBTI 공유하기
            </CuteButton>
          </>
        ) : (
          <CuteButton
            to={"/"}
            onClick={() => {
              localStorage.removeItem("uid");
            }}
          >
            나도 진짜 MBTI 확인하러 가기 ➜
          </CuteButton>
        )}

        {sameUser ? (
          <StartOverBtn
            href="/"
            rel="start-over"
            to={"/"}
            onClick={() => {
              localStorage.removeItem("uid");
            }}
          >
            다시 해보기
          </StartOverBtn>
        ) : (
          ""
        )}
      </Buttons>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {/* {sameUser ? "" : renderButtons()} */}
        <div className="result-intro">
          <Headline>
            <PurpleText>{myName}</PurpleText>님의{" "}
            <HighlightedPinkText>진짜 MBTI</HighlightedPinkText>는<br></br>
            <WinnerContainer>
              {firstPlaceArray.map(renderMbtiImage)}
            </WinnerContainer>
          </Headline>

          <ResultsSummary bingoSubmissions={bingoSubmissions} myMbti={myMbti} />

          {/* {sameUser ? "" : renderButtons()} */}

          <div className="ranking">
            <RankingBoard ranking={bingoSubmissions} />
          </div>

          {/* {sameUser ? "" : renderButtons()} */}

          <Margin>
            <Reaction bingoSubmissions={bingoSubmissions} myMbti={myMbti} />
          </Margin>

          {sameUser ? "" : renderButtons()}

          <SpeechBubble>
            <BoldText>{myMbti}</BoldText>들은 종종{" "}
            <BoldText>
              <PurpleText>
                {results.mistypes.map((obj) => obj.mbti).join(" & ")}
              </PurpleText>
              들과
              <br />
              혼동
            </BoldText>
            된다고 해요.
          </SpeechBubble>
        </div>

        <OriginalBingoContainer>
          <OriginalBingoTitle>
            {originalBingoTitle(getType(bingoSubmissions, myMbti))}
          </OriginalBingoTitle>

          <BingoBoard
            mbti={myMbti}
            board={selectedToFiveByFive(
              bingoSubmissions.find((obj) => obj.id === myMbti).selected
            )}
            items={addMbtiToItems(
              results.bingoBoards.find((obj) => obj.mbti === myMbti).items,
              myMbti
            )}
            show={true}
            disableClick={true}
          />
          <Accordion
            title={`${myMbti}의 특징`}
            content={mbtiProfiles
              .find((obj) => obj.mbti === myMbti)
              .characteristics.map((o) => (
                <ListItem key={o}>
                  <BulletPoint>👉</BulletPoint>
                  <CharacteristicContent>{o}</CharacteristicContent>
                </ListItem>
              ))}
          />
        </OriginalBingoContainer>

        <SpeechBubble>
          🔮 <BoldText>미스테리 빙고</BoldText>
          의<br />
          정체를 공개합니다!
        </SpeechBubble>
        <div className="mystery-bingo-reveal">
          {results.mistypes.map(renderMistype)}
        </div>

        {renderButtons()}

        <AccordionSignature />
      </>
    </ThemeProvider>
  );
}

export default ResultsPage;
