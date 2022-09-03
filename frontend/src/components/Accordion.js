import React, { useState } from "react";
import styled from "styled-components";

const AccordionContainer = styled.div`
  max-width: 368px;
  margin: 20px auto;
`;

const AccordionTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  background-color: #fab4a9;
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 8px;
  line-height: 20px;
`;

const TitleText = styled.div`
  position: relative;
  top: 1px;
`;

const AccordionContent = styled.div`
  background-color: #f8faf0;
  color: #2a2c38;
  text-align: left;
  font-size: 15px;
  word-break: keep-all;
  line-height: 22px;
  padding: 10px 15px;
  border-radius: 8px;
`;

function Accordion({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <AccordionContainer>
      <div>
        <AccordionTitle onClick={() => setIsActive(!isActive)}>
          <TitleText>{title}</TitleText>
          <div>{isActive ? "-" : "+"}</div>
        </AccordionTitle>
        {isActive && <AccordionContent>{content}</AccordionContent>}
      </div>
    </AccordionContainer>
  );
}

export default Accordion;
