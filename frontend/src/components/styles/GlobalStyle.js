import { createGlobalStyle } from "styled-components";
import Cooper from "../../fonts/COOPBL.woff";
import Dream from "../../fonts/S-Core-Dream/SCDream4.otf";
import DreamSemiBold from "../../fonts/S-Core-Dream/SCDream5.otf";
import DreamBold from "../../fonts/S-Core-Dream/SCDream6.otf";
import Bingre from "../../fonts/BinggraeTaom.otf";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0 auto;
    font-family: "dream";
    background-color: #f1f5df;
    text-align: center;
    
  }

  @font-face {
    font-family: "bingre";
    src: url(${Bingre}) format("opentype");
  }

  @font-face {
    font-family: "cooper";
    src: url(${Cooper}) format("woff");
    
  }

  @font-face {
    font-family: "dream";
    font-style: normal;
    font-weight: normal;
    src: url(${Dream}) format("opentype");
  }

  @font-face {
    font-family: "dream";
    font-style: normal;
    font-weight: 600;
    src: url(${DreamSemiBold}) format("opentype");
  }

  @font-face {
    font-family: "dream";
    font-style: normal;
    font-weight: bold;
    src: url(${DreamBold}) format("opentype");
  }

  
`;

export default GlobalStyle;
