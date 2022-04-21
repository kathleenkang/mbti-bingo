import "./MysteryBingoIntroPage.css";
import mistypesData from "../data/mistypesData.json";
import gif from "../images/space.gif";
import VerticalCenter from "../components/VerticalCenter";
import CuteButton from "../components/CuteButton";

function MysteryBingoIntroPage() {
  const myName = localStorage.getItem("myName");
  const myMbti = localStorage.getItem("myMbti");
  const myMistypes = mistypesData.find((obj) => obj.id === myMbti).mistypes;

  return (
    <VerticalCenter>
      <h2 className="mystery-intro-title">
        <span className="colored">
          {myMbti} {myName}{" "}
        </span>
        님의
        <br />
        <span className="accent highlight colored">진짜 MBTI</span>는?!
      </h2>

      <div className="profiles-image">
        <img src={gif} alt="profiles" width="100%" />
      </div>

      <div className="mysterybingo-p">
        <span className="custom-txt">
          {myMbti} 맞춤형{" "}
          <span className="accent highlight">미스테리 빙고판</span>
        </span>
        이
        <br />
        <span className="accent color">{myMistypes.length}개</span> 준비되어
        있어요!
      </div>

      <div>
        <CuteButton
          to="/mysterybingo"
          className="btn"
          onClick={localStorage.setItem(
            "myMistypes",
            JSON.stringify(myMistypes)
          )}
        >
          미스테리 빙고 풀러가기!
        </CuteButton>
      </div>
    </VerticalCenter>
  );
}

export default MysteryBingoIntroPage;
