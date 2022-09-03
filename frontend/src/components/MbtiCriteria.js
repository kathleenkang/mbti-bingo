// import styled from "styled-components";
import styled, { ThemeProvider } from "styled-components";
import leftarrow from "../images/arrow_left.png";
import rightarrow from "../images/arrow_right.png";

const CriteriaName = styled.div`
  width: 80px;
  color: #ec7eac;
  font-size: 15px;
  font-weight: bold;
  line-height: 28px;
`;

const Criteria = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 15px;
`;

const RadioButton = styled.input`
  display: none;
  cursor: pointer;

  & + label {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 45px;
    font-size: 30px;
    font-weight: bold;
    border-radius: 10px;
    border: 5px solid #9ab8fa;
    background-color: white;
    color: #2a2c38;
  }

  & + label:hover {
    background-color: #9ab8fa;
    color: white;
  }

  &:checked + label {
    background-color: #9ab8fa;
    color: white;
  }
`;

const LightGrey = styled.div`
  color: ${(props) => props.theme.lightGrey};
`;

const Arrow = styled(LightGrey)`
  font-size: 25px;
`;

const OptionName = styled(LightGrey)`
  font-size: 13px;
`;

const CriteriaNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 130px;
  margin-left: 10px;
  margin-right: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  bottom: -5.5px;
`;

function MbtiCriteria({
  criteria,
  criterialabel,
  leftoption,
  leftoptionlabel,
  rightoption,
  rightoptionlabel,
  arrIndex,
  changeMbti,
}) {
  return (
    <>
      <Criteria>
        <OptionName>{leftoptionlabel}</OptionName>
        <div className="left-btn">
          <RadioButton
            id={leftoption}
            type="radio"
            value={leftoption}
            name={criteria}
            onClick={(e) => {
              changeMbti(e, arrIndex);
            }}
          />
          <label htmlFor={leftoption}>{leftoption}</label>
        </div>
        <CriteriaNameContainer>
          <ImageContainer>
            <img src={leftarrow} width={"17px"} />
          </ImageContainer>
          <CriteriaName>{criterialabel}</CriteriaName>
          <ImageContainer>
            <img src={rightarrow} width={"17px"} />
          </ImageContainer>{" "}
        </CriteriaNameContainer>
        <div className="right-btn">
          <RadioButton
            id={rightoption}
            type="radio"
            value={rightoption}
            name={criteria}
            onClick={(e) => {
              changeMbti(e, arrIndex);
            }}
          />
          <label htmlFor={rightoption}>{rightoption}</label>
        </div>
        <OptionName>{rightoptionlabel}</OptionName>
      </Criteria>
    </>
  );
}

export default MbtiCriteria;
