import { useEffect } from "react";
import styled from "styled-components";

const FullHeight = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  width: 100%;
  max-height: 100vh;
`;

let VerticalCenter = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {}, 500);
  });

  return (
    <FullHeight>
      <Center>{children}</Center>
    </FullHeight>
  );
};

export default VerticalCenter;
