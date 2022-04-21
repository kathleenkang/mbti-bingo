import "./RankingBoard.css";

function RankingBoard({ ranking }) {
  // let hasCog = (text) => {
  //   return text.length > 4;
  // };

  let renderRankingItem = (item, i) => {
    return (
      <div className="ranking-item" key={`rank${i}`}>
        <div className="rank">{item.ranking}</div>
        <div className="image-container">
          <div className="back">
            <img src={require(`../images/circle.png`)} width="50px"></img>
          </div>
          <div className="front">
            <img
              src={require(`../images/${item.id
                .slice(0, 4)
                .toLowerCase()}.png`)}
              width="43px"
            />
          </div>
        </div>
        {/* <div className={`mbti-name  ${hasCog(item.id) ? "hasCog" : ""}`}> */}
        <div className="mbti-name">
          <span className="mbti-main">{item.id.slice(0, 4)}</span>
          <span className="mbti-cog">{item.id.slice(5, 8)}</span>
          {/* <span className="mbti-cog">{item.id.slice(4)}</span> */}
        </div>
        <div className="mbti-count">
          <span className="counted-number">{item.count}</span>
          <span className="unit">개</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="ranking-container">
        <div className="rankingboard-title">RANKING</div>
        {ranking.map(renderRankingItem)}
      </div>
    </>
  );
}

export default RankingBoard;
