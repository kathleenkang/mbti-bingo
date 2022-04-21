import styled from "styled-components";

const FullHeight = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  width: 100%;
`;

let VerticalCenter = ({ children }) => {
  return (
    <FullHeight>
      <Center>{children}</Center>
    </FullHeight>
  );
};

export default VerticalCenter;
