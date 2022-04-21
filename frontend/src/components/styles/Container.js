import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 420px;
  margin: 0 auto;
`;

let Container = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Container;
