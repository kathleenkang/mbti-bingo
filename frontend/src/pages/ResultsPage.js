import BingoBoard from "../components/BingoBoard";
import "./ResultsPage.css";
import Accordion from "../components/Accordion";
import RankingBoard from "../components/RankingBoard";
import mbtiProfiles from "../data/mbtiProfiles.json";

import gif from "../images/present.gif";

import definite from "../images/definite.gif";
import likely from "../images/likely.gif";
import tie from "../images/tie.gif";
import surprise from "../images/surprise.gif";

import React, { useState } from "react";

import { Typewriter } from "react-simple-typewriter";
import VerticalCenter from "../components/VerticalCenter";
import Container from "../components/styles/Container";

function ResultsPage() {
  const myName = localStorage.getItem("myName");
  const myMbti = localStorage.getItem("myMbti");
  const myMbtiBoard = JSON.parse(localStorage.getItem("myMbtiBoard"));
  const myMistypes = JSON.parse(localStorage.getItem("myMistypes"));
  const mistypeBoardArray = JSON.parse(
    localStorage.getItem("mistypeBoardArray")
  );

  const [showTransition, setShowTransition] = useState(true);

  setTimeout(() => {
    setShowTransition(false);
  }, 2300);

  let renderTransition = () => {
    return (
      <div className="transition">
        <Container>
          <VerticalCenter>
            <div className="fixed-text purple">
              과연 나의{" "}
              <span className="accent highlight colored">진짜 MBTI</span>는
              뭘까?
            </div>
            <div className="searching-image">
              <img src={gif} alt="searching" width="100%" />
            </div>
            <div className="typewriter">
              <Typewriter
                loop="1"
                cursor
                cursorStyle=""
                typeSpeed={80}
                deleteSpeed={70}
                delaySpeed={1000}
                words={["*drumroll*"]}
              />
            </div>
          </VerticalCenter>
        </Container>
      </div>
    );
  };

  let trueCount = (board) => {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      count += board[i].filter(Boolean).length;
    }
    return count;
  };

  // // trueCount map으로 쓰는 법
  // console.log(
  //   myMbtiBoard
  //     .map((row) => row.filter(Boolean).length)
  //     .reduce((a, b) => a + b, 0)
  // );

  let myMbtiCount = trueCount(myMbtiBoard);

  let mistypeCount = mistypeBoardArray.map((item, i) => {
    return {
      id: item.mbti,
      count: trueCount(item.board),
    };
  });

  let sortByCount = [
    ...mistypeCount,
    {
      id: myMbti,
      count: trueCount(myMbtiBoard),
    },
  ].sort((a, b) => {
    return b.count - a.count;
  });

  // 각 object에 ranking이라는 property attribute 추가하기
  let addRanking = sortByCount.map((obj, i) => {
    return { ranking: i + 1, ...obj };
  });

  // 앞 object와 value 비교해서 같으면 같은 등수로 바꿔주기
  for (let i = 1; i < addRanking.length; i++) {
    if (addRanking[i].count == addRanking[i - 1].count) {
      addRanking[i].ranking = addRanking[i - 1].ranking;
    }
  }

  // 1등한 유형을 realmbti로 놓기
  let firstPlaceArray = addRanking.filter((obj) => obj.ranking === 1);
  // console.log(firstPlaceArray);
  let realMbtiArray = firstPlaceArray.map((obj) => obj.id);
  let realMbtiShortArray = firstPlaceArray.map((obj) => obj.id.slice(0, 4));
  // let realMbtiShortArrayWithoutOriginal = firstPlaceArray
  //   .filter((obj) => obj.id != myMbti)
  //   .flatMap((obj) => obj.id.slice(0, 4));
  let realMbtiShortArrayWithoutOriginal = firstPlaceArray.flatMap((obj) =>
    obj.id != myMbti ? [obj.id.slice(0, 4)] : []
  );

  let realMbtiCount = firstPlaceArray[0].count;
  // secondPlace는 firstplace가 하나인 경우에만 해당...
  let secondPlaceCount = addRanking[1].count;

  let type = "";
  if (myMbtiCount - 4 > secondPlaceCount) {
    type = "definite";
  } else if (myMbtiCount === realMbtiCount && firstPlaceArray.length === 1) {
    type = "likely";
  } else if (myMbtiCount === realMbtiCount && firstPlaceArray.length > 1) {
    type = "tie";
  } else if (myMbtiCount < realMbtiCount) {
    type = "surprise";
  }

  let renderResultSummary = (
    myMbti,
    realMbtiShortArray,
    // 왜 오히려 realMbtiShortArrayWithoutOriginal을 넣으면 의도대로 안 나오는 거지?
    myMbtiCount,
    realMbtiCount,
    type
  ) => {
    // definite
    if (type === "definite") {
      return (
        <div className="first-line">
          <span className="accent color">{myMbti}</span>가{" "}
          <span className="accent color">{myMbtiCount}개</span>로 압도적으로
          많았어요!
        </div>
      );
    }
    // tie
    else if (type === "tie") {
      return (
        <div className="first-line">
          <span className="accent color">{myMbti}</span>와{" "}
          <span className="accent color">
            {realMbtiShortArrayWithoutOriginal.join(" & ")}
          </span>{" "}
          빙고판에서 모두 동일하게{" "}
          <span className="accent color">{myMbtiCount}개</span> 선택했어요!
        </div>
      );
    }
    // surprise
    else if (type === "surprise") {
      return (
        <div className="first-line">
          원래 MBTI인 줄 알았던 <span className="accent color">{myMbti}</span>의
          빙고에서는 <span className="accent color">{myMbtiCount}개</span>
          를 선택한 반면,
          <br />
          <span className="accent color">
            {realMbtiShortArrayWithoutOriginal.join(" & ")}
          </span>{" "}
          빙고에서는 그보다 더 많은{" "}
          <span className="accent color">{realMbtiCount}개</span>를 선택했어요!
        </div>
      );
    }
    // likely
    else if (type === "likely") {
      return (
        <div className="first-line">
          원래 예상 MBTI인 <span className="accent color">{myMbti}</span> 빙고의
          <br /> 선택 개수가{" "}
          <span className="accent color">{myMbtiCount}개</span>로 가장 많았어요!
        </div>
      );
    }
  };

  let renderReaction = (myMbti, realMbtiShortArray, type) => {
    // definite
    if (type === "definite") {
      return (
        <div className="reaction">
          <img src={definite} loop="infinite" />
          <div className="reaction-text accent highlight">
            앞구르기 뒷구르기하면서 봐도 {myMbti}
          </div>
        </div>
      );
    }
    // tie
    else if (type === "tie") {
      return (
        <div className="reaction">
          <img src={tie} />
          <div className="reaction-text accent highlight">
            내 안에 싸우고 있는 {firstPlaceArray.length}개의 자아
            <br /> 나...어쩌면 {realMbtiShortArrayWithoutOriginal.join("나 ")}
            일지도...?
          </div>
        </div>
      );
    }
    // surprise
    else if (type === "surprise") {
      return (
        <div className="reaction">
          <img src={surprise} />
          <div className="reaction-text accent highlight">
            한평생 {myMbti}로 살아온 내가 사실은 {<br />}
            {realMbtiShortArray.join("나 ")}...?!
          </div>
        </div>
      );
    }
    // likely
    else if (type === "likely") {
      return (
        <div className="reaction">
          <img src={likely} />
          <div className="reaction-text accent highlight">
            MBTI는 과학이다— 아무래도 {myMbti} 맞는 듯~!
          </div>
        </div>
      );
    }
  };

  function originalBingoTitle(type) {
    switch (type) {
      case "surprise":
        return "나의 MBTI(였던 것)";
        break;
      case "tie":
        return "나의 MBTI(일 수도~ 아닐 수도~)";
        break;
      default:
        return "나의 MBTI 빙고";
    }
  }

  // let renderMistypeRevealItem = (item, i) => {
  //   let title = `${item.mbti}의 특징`;
  //   let content = mbtiProfiles.find(
  //     (obj) => obj.mbti == item.mbti
  //   ).characteristics;
  // .characteristics.join("");

  let renderMistypeRevealItem = (item, i) => {
    let title = `${item.mbti}의 특징`;
    let stringArray = mbtiProfiles.find(
      (obj) => obj.mbti == item.mbti
    ).characteristics;
    let content = stringArray.map((o) => (
      <li className="bullet" key={o}>
        {o}
      </li>
    ));
    // 두가지 합치는 방법은 없나?

    return (
      <div className="mistype-container" key={`mistyperender${i}`}>
        {/* <div className="mistype-title">MYSTERY BINGO #{i + 1}</div>
        <div className="mbti accent highlight">{mistypeBoardArray[i].mbti}</div> */}
        <span className="mistype-title">MYSTERY BINGO #{i + 1} </span>
        <span className="mbti accent highlight">
          {mistypeBoardArray[i].mbti}
        </span>

        <div className="mistype-bingo">
          <BingoBoard
            mbti={mistypeBoardArray[i].mbti.slice(0, 4)}
            board={mistypeBoardArray[i].board}
            show={true}
            disableClick={true}
          />
        </div>
        <div className="mistype-reason">
          <Accordion title={title} content={content} />
        </div>
      </div>
    );
  };

  let renderMbtiImage = (item, i) => {
    let mbtiname = item;
    let nickname = mbtiProfiles.find((obj) => obj.mbti == item).nickname;
    if (firstPlaceArray.length === 1) {
      return (
        <div className="winner-item" key={`winner-item${i}`}>
          <div className="winner-img-container single">
            <img
              className="winner-img single"
              src={require(`../images/${mbtiname
                .slice(0, 4)
                .toLowerCase()}.png`)}
              // width="300px"
            />
          </div>
          <div className="winner-mbtiname single ribbon">{mbtiname}</div>
          <div className="winner-nickname single">{nickname}</div>
        </div>
      );
    } else {
      return (
        <div className="winner-item" key={`winner-item${i}`}>
          <div className="winner-img-container">
            <img
              className="winner-img"
              src={require(`../images/${mbtiname
                .slice(0, 4)
                .toLowerCase()}.png`)}
              // width="110px"
            />
          </div>
          <div className="winner-mbtiname ribbon">{mbtiname}</div>
          <div className="winner-nickname">{nickname}</div>
        </div>
      );
    }
  };

  return (
    <>
      {showTransition ? (
        renderTransition()
      ) : (
        <>
          <div className="result-intro">
            <div className="headline">
              <span className="purple">{myName}</span>님의{" "}
              <span className="accent highlight">진짜 MBTI</span>는<br></br>
              {/* <div className="winner-container">{renderMbtiImage()}</div> */}
              <div className="winner-container">
                {realMbtiArray.map(renderMbtiImage)}
              </div>
              {/* <span className="myrealmbti accent highlight">
            {realMbtiArray.join(" or ")}
          </span>{" "}
          입니다 */}
            </div>

            <div className="result-summary">
              {renderResultSummary(
                myMbti,
                realMbtiShortArray,
                myMbtiCount,
                realMbtiCount,
                type
              )}
            </div>

            <div className="ranking">
              <RankingBoard ranking={addRanking} />
            </div>

            <div className="reaction">
              {renderReaction(myMbti, realMbtiShortArray, type)}
            </div>

            {/* <div className="mistype-sentence">
          {myMbti}들은 종종{" "}
          <span className="mistype-names">{myMistypesIds.join(" & ")}</span>들과
          혼동된다고 해요.
        </div> */}
            <div className="speech-bubble">
              <span className="mbti-names">{myMbti}</span>들은 종종{" "}
              <span className="mbti-names">
                <span className="mbti-names mistype">
                  {myMistypes.join(" & ")}
                </span>
                들과
                <br />
                혼동
              </span>
              된다고 해요.
            </div>
          </div>
          <div className="original-bingo">
            <div className="original-bingo-title accent highlight">
              {/* {type === "likely" || type === "definite"
            ? "나의 MBTI 빙고"
            : "나의 MBTI(였던 것)"} */}
              {originalBingoTitle(type)}
            </div>
            <BingoBoard
              mbti={myMbti}
              board={myMbtiBoard}
              show={true}
              disableClick={true}
            />
            <Accordion
              title={`${myMbti}의 특징`}
              content={mbtiProfiles
                .find((obj) => obj.mbti == myMbti)
                .characteristics.map((o) => (
                  <li className="bullet" key={o}>
                    {o}
                  </li>
                ))}
            />
          </div>

          {/* <div className="mystery-reveal-title">
        <div className="banner">
          <span className="accent highlight">
            <span className="emoji">🔮</span> 미스테리 빙고의<br></br> 정체를
            공개합니다!{" "}
          </span>
        </div>
        <div className="down-arrow">
          <img src={downarrow} width="50px" />
        </div>
      </div> */}
          <div className="mystery-reveal-title speech-bubble">
            🔮{" "}
            <span className="mystery-reveal-title accent">미스테리 빙고</span>의
            정체를 공개합니다!
          </div>
          <div className="mystery-bingo-reveal">
            {mistypeBoardArray.map(renderMistypeRevealItem)}
          </div>

          <div className="share-msg">나의 진짜 MBTI 공유하기</div>

          <div className="share-btn"></div>
        </>
      )}
    </>
  );
}

export default ResultsPage;
