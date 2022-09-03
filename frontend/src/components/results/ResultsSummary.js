import { getType } from "../../utils/ResultsUtils";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../components/styles/Theme";

const ResultsSummaryText = styled.div`
  width: 305px;
  font-size: 18px;
  font-weight: bold;
  word-break: keep-all;
  margin: 20px auto;
  color: ${(props) => props.theme.darkGrey};
`;

const HotpinkText = styled.span`
  color: ${(props) => props.theme.hotpinkAccent};
`;

function ResultsSummary({ bingoSubmissions, myMbti }) {
  const firstPlaceArray = bingoSubmissions.filter((obj) => obj.ranking === 1);
  const firstPlaceCount = firstPlaceArray[0].count;
  const firstPlaceArrayWithoutOriginal = firstPlaceArray.filter(
    (obj) => obj.id !== myMbti
  );

  // const myMbtiCount = trueCount(
  //   bingoSubmissions.filter((obj) => obj.id === myMbti)
  // );
  const myMbtiCount = bingoSubmissions.filter((obj) => obj.id === myMbti)[0]
    .count;
  const type = getType(bingoSubmissions, myMbti);

  const textOptions = {
    definite: (
      // <>
      //   원래 예상대로 <HotpinkText>{myMbti}</HotpinkText> 빙고의 선택 개수가
      //   <br />
      //   <HotpinkText>{myMbtiCount}개</HotpinkText>로 압도적으로 많았어요!
      // </>
      <>
        원래 예상대로 <HotpinkText>{myMbti}</HotpinkText> 빙고에서 압도적으로
        많은 <HotpinkText>{myMbtiCount}개</HotpinkText> 칸을 선택했어요!
      </>
    ),
    tie: (
      <>
        예상 MBTI인 <HotpinkText>{myMbti}</HotpinkText> 외에도
        <br />
        <HotpinkText>
          {firstPlaceArrayWithoutOriginal.map((obj) => obj.id).join(" & ")}
        </HotpinkText>{" "}
        빙고에서 <br />
        동일하게 <HotpinkText>{myMbtiCount}개</HotpinkText> 선택했어요!
      </>
    ),
    surprise: (
      <>
        원래 MBTI인 줄 알았던 <HotpinkText>{myMbti}</HotpinkText>의 빙고에서는{" "}
        <HotpinkText>{myMbtiCount}개</HotpinkText>
        를 선택한 반면,
        <br />
        <HotpinkText>
          {firstPlaceArrayWithoutOriginal.map((obj) => obj.id).join(" & ")}
        </HotpinkText>{" "}
        빙고에서는 그보다 더 많은 <HotpinkText>{firstPlaceCount}개</HotpinkText>
        를 선택했어요!
      </>
    ),
    likely: (
      // <>
      //   예상 MBTI인 <HotpinkText>{myMbti}</HotpinkText>의 빙고 선택 <br />
      //   개수가 <HotpinkText>{myMbtiCount}개</HotpinkText>로 가장 많았어요!
      // </>
      <>
        원래 예상대로 <HotpinkText>{myMbti}</HotpinkText> 빙고에서
        <br />
        가장 많은 <HotpinkText>{myMbtiCount}개</HotpinkText> 칸을 선택했어요!
      </>
    ),
  };

  return (
    <ThemeProvider theme={theme}>
      <ResultsSummaryText>{textOptions[type]}</ResultsSummaryText>
    </ThemeProvider>
  );
}

export default ResultsSummary;
