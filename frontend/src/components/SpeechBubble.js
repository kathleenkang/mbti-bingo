import styled, { ThemeProvider } from "styled-components";

const SpeechBubble = styled.div`
  margin: 0px auto;
  // padding: 20px;
  padding: 20px 10px;
  font-size: 19px;
  position: relative;
  width: 330px;
  text-align: center;
  background-color: #fff;
  border: 8px solid rgb(190, 190, 250);
  border-radius: 30px;
  box-shadow: 2px 2px 4px #888;

  &:before {
    border: 25px solid;
    border-color: rgb(190, 190, 250) transparent transparent transparent;
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 100%;
    right: 50%;
    transform: translateX(50%) translateY(-2%);
    border: 14px solid;
    border-color: #fff transparent transparent transparent;
  }
`;

export default SpeechBubble;
