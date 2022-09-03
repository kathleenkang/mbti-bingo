export function trueCount(selectedArray) {
  return selectedArray.length;
}

export function getMyMbtiCount(bingoSubmissions, myMbti) {
  return trueCount(
    bingoSubmissions.find((obj) => obj.mbti === myMbti).selected
  );
}

export function getSortedSubmissions(bingoSubmissions, myMbti) {
  const mistypeCountArray = bingoSubmissions
    .filter((obj) => obj.mbti !== myMbti)
    .map((obj) => {
      return {
        id: obj.mbti,
        count: trueCount(obj.selected),
        selected: obj.selected,
      };
    });

  let sortedArray = [
    ...mistypeCountArray,
    {
      id: myMbti,
      count: getMyMbtiCount(bingoSubmissions, myMbti),
      selected: bingoSubmissions.find((obj) => obj.mbti === myMbti).selected,
    },
  ].sort((a, b) => {
    return b.count - a.count;
  });

  // 각 object에 ranking이라는 property attribute 추가하기
  sortedArray = sortedArray.map((obj, i) => {
    return { ranking: i + 1, ...obj };
  });

  // 앞 object와 value 비교해서 같으면 같은 등수로 바꿔주기
  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i].count == sortedArray[i - 1].count) {
      sortedArray[i].ranking = sortedArray[i - 1].ranking;
    }
  }

  return sortedArray;
}

export function getType(bingoSubmissions, myMbti) {
  const firstPlaceArray = bingoSubmissions.filter((obj) => obj.ranking === 1);
  const firstPlaceCount = firstPlaceArray[0].count;
  const myMbtiCount = bingoSubmissions.find((obj) => obj.id === myMbti).count;

  // WRONG!!! surprise가 제대로 작동 안 함
  //   if (firstPlaceCount - 4 > bingoSubmissions[1].count) {
  //     return "definite";
  //   } else if (myMbtiCount === firstPlaceCount && firstPlaceArray.length === 1) {
  //     return "likely";
  //   } else if (myMbtiCount === firstPlaceCount && firstPlaceArray.length > 1) {
  //     return "tie";
  //   } else if (myMbtiCount < firstPlaceCount) {
  //     return "surprise";
  //   }
  // }

  if (myMbtiCount < firstPlaceCount) {
    return "surprise";
  } else if (firstPlaceCount - 4 > bingoSubmissions[1].count) {
    return "definite";
  } else if (myMbtiCount === firstPlaceCount && firstPlaceArray.length === 1) {
    return "likely";
  } else if (myMbtiCount === firstPlaceCount && firstPlaceArray.length > 1) {
    return "tie";
  }
}
