// let renderButtons = () => {
//   const sameUser = uid === localStorage.getItem("uid");
//   return (
//     <div className="buttons">
//       {sameUser ? (
//         <button
//           onClick={() => {
//             navigator.clipboard.writeText(window.location.href).then(() => {
//               alert("URL이 복사되었습니다!");
//             });
//           }}
//         >
//           나의 진짜 MBTI 공유하기
//         </button>
//       ) : null}
//       <Link
//         to={"/"}
//         onClick={() => {
//           localStorage.removeItem("uid");
//         }}
//       >
//         {sameUser ? "다시 해 보기" : "나도 해 보기"}
//       </Link>
//     </div>
//   );
// };

// let renderButtons = () => {
//   const sameUser = uid === localStorage.getItem("uid");
//   return (
//     <div className="buttons">
//       {sameUser ? (
//         <CuteButton
//           to="/"
//           onClick={(e) => {
//             e.preventDefault();
//             navigator.clipboard.writeText(window.location.href).then(() => {
//               alert("URL이 복사되었습니다!");
//             });
//           }}
//         >
//           나의 진짜 MBTI 공유하기
//         </CuteButton>
//       ) : null}
//       <CuteButton
//         to={"/"}
//         onClick={() => {
//           localStorage.removeItem("uid");
//         }}
//       >
//         {sameUser ? "다시 해 보기" : "나도 해 보기"}
//       </CuteButton>
//     </div>
//   );
// };
