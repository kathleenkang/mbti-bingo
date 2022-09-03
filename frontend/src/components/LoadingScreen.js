import styled from "styled-components";
// import NyanCat from "../images/nyan-cat.gif";
import Searching from "../images/searching.gif";

const LoadingCover = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #fadcdc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const LoadingImg = styled.img`
//   width: 250px;
//   height: 230px;
// `;

const LoadingImg = styled.img`
  width: 300px;
  height: 225px;
`;

function LoadingScreen({}) {
  return (
    <LoadingCover>
      {/* <LoadingImg src={NyanCat} /> */}
      <LoadingImg src={Searching} />
    </LoadingCover>
  );
}

export default LoadingScreen;
