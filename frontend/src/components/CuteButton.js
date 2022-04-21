import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  background: #ffe9e9;
  border-radius: 30px;
  border: 0;
  border: 3px solid rgba(182, 0, 0, 0.45);
  color: #370000;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  padding: 15px 40px;
  position: relative;
  text-transform: uppercase;
  transform-style: preserve-3d;
  transition: all 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: "bingre";
  text-align: center;
  height: 56px;

  &:before {
    background: #f1b4b4;
    border-radius: inherit;
    box-shadow: 0 0 0 2.5px rgba(182, 0, 0, 0.45),
      0 0.6em 0 0 rgba(255, 233, 233, 0.6);
    content: "";
    height: 100%;
    width: 101%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translate3d(0, 0.5em, -1em);
    transition: all 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover {
    transform: translate(0, 0.25em);

    &:before {
      box-shadow: 0 0 0 2.5px rgba(182, 0, 0, 0.45),
        0 0.45em 0 0 rgba(255, 233, 233, 0.8);
      transform: translate3d(0, 0.5em, -1em);
    }
  }

  &:active {
    background: #ffe9e9;
    transform: translate(0, 0.75em);

    &:before {
      box-shadow: 0 0 0 3px rgba(182, 0, 0, 0.45), 0 0 #ffe9e9;
      transform: translate3d(0, 0, -1em);
    }
  }
`;

let CuteButton = ({ children, to, onClick }) => {
  return (
    <StyledLink to={to} onClick={onClick}>
      {children}
    </StyledLink>
  );
};

export default CuteButton;
