import MbtiCriteria from "../components/MbtiCriteria";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalCenter from "../components/VerticalCenter";
import CuteButton from "../components/CuteButton";
import CuteAlert from "../components/CuteAlert";
import styled, { ThemeProvider } from "styled-components";
import theme from "../components/styles/Theme.js";
import { useSetUser } from "../contexts/UserContext";
import LoadingScreen from "../components/LoadingScreen";

const Input = styled.input`
  font-size: 20px;
  width: 220px;
  margin-bottom: 30px;
  padding: 5px;
  border: solid 5px #9ab8fa;
  border-radius: 60px;
  background-color: white;
  outline: none;
  padding-left: 15px;
  line-height: 30px;
`;

const PinkText = styled.span`
  color: ${(props) => props.theme.hotpinkAccent};
  font-weight: bold;
`;

const DarkText = styled.p`
  color: ${(props) => props.theme.darkGrey};
  font-size: 23px;
  font-weight: 600;
`;

function ProfilePage() {
  const navigate = useNavigate();
  const setUser = useSetUser();

  const criteriaArray = [
    {
      criteria: "energy",
      criterialabel: "에너지 방향",
      leftoption: "E",
      leftoptionlabel: "외향형",
      rightoption: "I",
      rightoptionlabel: "내향형",
    },
    {
      criteria: "info-processing",
      criterialabel: "인식 방식",
      leftoption: "S",
      leftoptionlabel: "감각형",
      rightoption: "N",
      rightoptionlabel: "직관형",
    },
    {
      criteria: "info-evaluation",
      criterialabel: "의사 결정",
      leftoption: "T",
      leftoptionlabel: "사고형",
      rightoption: "F",
      rightoptionlabel: "감정형",
    },
    {
      criteria: "lifestyle",
      criterialabel: "생활 양식",
      leftoption: "J",
      leftoptionlabel: "판단형",
      rightoption: "P",
      rightoptionlabel: "인식형",
    },
  ];

  const [myName, setMyName] = useState("");
  const [myMbti, setMyMbti] = useState(["", "", "", ""]);

  const [loading, setLoading] = useState(false);

  let changeMbti = (event, arrIndex) => {
    let newMbti = [...myMbti];
    newMbti[arrIndex] = event.target.defaultValue;
    setMyMbti(newMbti);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <VerticalCenter>
        <DarkText>
          <PinkText>이름</PinkText>을 입력해 주세요
        </DarkText>
        <Input
          type="text"
          onChange={(e) => {
            setMyName(e.target.value);
          }}
        />

        <div className="input-mbti">
          <DarkText>
            <PinkText>MBTI</PinkText>
            <span>를 선택해 주세요</span>
            {/* <div className="handclick-crop" /> */}
          </DarkText>

          <div>
            {criteriaArray.map((criteria, i) => (
              <MbtiCriteria
                key={`criteria${i}`}
                criteria={criteria.criteria}
                criterialabel={criteria.criterialabel}
                leftoption={criteria.leftoption}
                leftoptionlabel={criteria.leftoptionlabel}
                rightoption={criteria.rightoption}
                rightoptionlabel={criteria.rightoptionlabel}
                arrIndex={i}
                changeMbti={changeMbti}
              />
            ))}
          </div>
        </div>

        <div>
          <CuteButton
            to="/mybingo"
            onClick={async (e) => {
              e.preventDefault();

              if (myName === "") {
                CuteAlert("이름을 기입해주세요!");
                return;
              }

              if (myMbti.includes("")) {
                CuteAlert("4가지 유형을 모두 선택해 주세요!");
                return;
              }

              setLoading(true);

              const response = await fetch("https://api.mbtibingo.com/users", {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  uid: Date.now().toString(36) + Math.random().toString(36),
                  name: myName,
                  mbti: myMbti.join(""),
                }),
              });
              const body = await response.json();
              setUser(body);
              localStorage.setItem("uid", body["uid"]);
              setLoading(false);
              navigate("/mybingo");
            }}
          >
            다음 ➜
          </CuteButton>
        </div>
      </VerticalCenter>
    </ThemeProvider>
  );
}

export default ProfilePage;
