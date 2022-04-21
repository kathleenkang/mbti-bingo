import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0 auto;
    font-family: roboto;
    background-color: #f1f5df;
    text-align: center;
  }

  @font-face {
    font-family: "bingre";
    src: url(./fonts/BinggraeTaom.otf) format("opentype");
  }

  @font-face {
    font-family: "cooper";
    font-style: normal;
    font-weight: normal;
    src: local("Cooper Black Regular"), url(./fonts/COOPBL.woff) format("woff");
  }

  @font-face {
    font-family: "noto";
    font-style: normal;
    font-weight: normal;
    src: url(./fonts/Noto_Sans_KR/NotoSansKR-Medium.otf) format("opentype");
  }

  @font-face {
    font-family: "consolas";
    font-style: normal;
    font-weight: normal;
    src: url(./fonts/Consolas-Font/CONSOLA.TTF);
  }

  @font-face {
    font-family: "roboto";
    font-style: normal;
    font-weight: normal;
    src: url(./fonts/Roboto/Roboto-Medium.ttf) format("truetype");
  }
`;

export default GlobalStyle;
