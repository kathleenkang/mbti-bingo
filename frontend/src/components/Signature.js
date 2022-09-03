import styled from "styled-components";
import React, { useState } from "react";
// import Accordion from "./Accordion";
import { useLocation } from "react-router-dom";

const AccordionContainer = styled.div`
  max-width: 360px;
  margin: 50px auto 0px;
`;

const AccordionTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  color: grey;
  // color: #c0c0c0;
  font-size: 15px;
  font-weight: bold;
  padding: 25px 7px 25px 7px;
  border-top: 2px dashed #c0c0c0;
`;

const AccordionContent = styled.div`
  text-align: left;
  font-size: 14px;
  word-break: keep-all;
  line-height: 22px;
  padding: 0px 7px 20px;
  border-radius: 8px;
  // margin-bottom: 20px;
`;

const Message = styled.div`
  text-align: left;
  color: grey;
  text-size: 8px;
`;

const Credit = styled.div`
  color: #2a2c38;
  text-align: left;
  margin: 30px 0px;
`;

const Accent = styled.span`
  font-weight: bold;
  margin: 0px 3px;
`;

const ListItem = styled.li`
  list-style-position: inside;
  text-indent: -20px;
  margin: 5px 0px;
  list-style: none;
`;

const Emoji = styled.span`
  font-size: 17px;
  padding-right: 5px;
`;

const EmojiBig = styled(Emoji)`
  font-size: 19px;
`;

const HyperLink = styled.a`
  color: #2a2c38;
  text-underline-position: under;
  // text-decoration: none;
  &:hover {
    color: #7400fd;
  }
`;

const signaturetitle = "message from the creator";

function AccordionSignature() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const ClosingMsg = () => {
    if (useLocation().pathname === "/") {
      return <div style={{ marginTop: "15px", textAlign: "center" }}>⇣</div>;
    } else {
      return (
        <>
          <div>그럼 다음에 또 봐요 💫</div>
        </>
      );
    }
  };

  let signaturecontent = (
    <>
      <Message>
        안녕하세요! 초보 개발자 캣이에요 💖<br></br>
        친구들과 재미로 하던 MBTI 빙고를 리액트로 인터랙티브하게 만들어
        보았어요.
        <br></br>코드잇으로 열심히 공부하고 수많은 구글링 끝에 드디어 첫
        프로젝트를 공유할 수 있게 되었네요. <br></br>조금 어설퍼도 많은 분들이
        즐겨주셨으면 해요 :)
        <br></br>피드백이나 소통은 coded.by.kat@gmail.com 으로!
        {ClosingMsg()}
      </Message>

      {/* <Message>
      <span>안녕하세요! 초보 개발자 캣이에요 💖</span>
      <span>
        친구들과 재미로 하던 MBTI 빙고를 리액트로 인터랙티브하게 만들어
        보았어요.
      </span>
      <span>
        코드잇으로 열심히 공부하고 수많은 구글링 끝에 드디어 첫 프로젝트를
        완성해서 공유할 수 있게 되었네요.{" "}
      </span>
      <span>조금 어설퍼도 많은 분들이 즐겨주셨으면 해요 :) </span>
      <span>피드백이나 소통은 coded.by.kat@gmail.com 으로! </span>
      {ByebyeMsg()}
    </Message> */}

      <Credit>
        <Emoji>🙌</Emoji> <Accent> Shout out to:</Accent>
        <ul>
          <ListItem>
            <EmojiBig>👾</EmojiBig> my 온라인 코딩 선생님{" "}
            <HyperLink href="https://bit.ly/3vFSbV7" target="_blank">
              <Accent>코드잇 codeit.kr</Accent>
            </HyperLink>
            !!
          </ListItem>
          <ListItem>
            <Emoji>🐈</Emoji> 귀여운 고양이 밈을 제공해주신{" "}
            <Accent>Giphy</Accent>
          </ListItem>
          <ListItem>
            <Emoji>🎨</Emoji> 일러스트 애니메이션을 제공해주신{" "}
            <Accent>Icons8</Accent>
          </ListItem>
        </ul>
      </Credit>
    </>
  );

  return (
    <AccordionContainer>
      <div>
        <AccordionTitle
          onClick={(element) => {
            setIsActive(!isActive);
            // div의 밑으로 scroll하거나, 페이지 밑으로 scroll하거나 하는 기능 추가.
            // scrollTop
            setTimeout(() => {
              document.getElementById("root").scrollIntoView(false);
            }, 0);
          }}
          style={{ color: isActive ? "#e65390" : "" }}
        >
          {signaturetitle}
          {/* <div>{isActive ? "💬" : "+"}</div> */}
          <div>{isActive ? "🐾" : "+"}</div>
        </AccordionTitle>
        {isActive && <AccordionContent>{signaturecontent}</AccordionContent>}
      </div>
    </AccordionContainer>
  );
}

export default AccordionSignature;
