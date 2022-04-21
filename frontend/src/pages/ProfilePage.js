import "./ProfilePage.css";
import MbtiCriteria from "../components/MbtiCriteria";
import { useState } from "react";
import Swal from "sweetalert2";
import NyanCat from "../images/nyan-cat.gif";
import VerticalCenter from "../components/VerticalCenter";
import CuteButton from "../components/CuteButton";

function ProfilePage() {
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

  let changeMbti = (event, arrIndex) => {
    let newMbti = [...myMbti];
    newMbti[arrIndex] = event.target.defaultValue;
    setMyMbti(newMbti);
  };

  let showAlert = (title) => {
    Swal.fire({
      title: title,
      width: 350,
      padding: "1em",
      color: "#716add",
      backdrop: `
        rgba(0,0,123,0.4)
        url("${NyanCat}")
        left top
        no-repeat
      `,
    });
  };

  return (
    <VerticalCenter>
      <div className="input-name">
        <p>
          <span className="accent-color">이름</span>을 입력해 주세요
        </p>
        <input
          className="input-box"
          type="text"
          onChange={(e) => {
            setMyName(e.target.value);
          }}
        />
      </div>

      <div className="input-mbti">
        <p>
          <span className="accent-color eng">MBTI</span>
          <span>를 선택해 주세요</span>
          <div className="handclick-crop" />
        </p>

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
          onClick={(e) => {
            if (myName === "") {
              showAlert("이름을 기입해주세요!", e);
              return e.preventDefault();
            } else {
              localStorage.setItem("myName", myName);
            }

            if (myMbti.includes("")) {
              showAlert("4가지 유형을 모두 선택해 주세요!");
              return e.preventDefault();
            } else {
              // localStorage.setItem("myMbti", JSON.stringify(myMbti));
              localStorage.setItem("myMbti", myMbti.join(""));
              // localStorage.setItem("myMbti", JSON.stringify(myMbti);
            }
          }}
        >
          👉 next 👉
        </CuteButton>
      </div>
    </VerticalCenter>
  );
}

export default ProfilePage;
