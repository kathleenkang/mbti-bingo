import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/styles/GlobalStyle";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MyBingoPage from "./pages/MyBingoPage";
import MysteryBingoIntroPage from "./pages/MysteryBingoIntroPage";
import MysteryBingoPage from "./pages/MysteryBingoPage";
import ResultsPage from "./pages/ResultsPage";
import bingodata from "./data/bingoContentData.json";
import Container from "./components/styles/Container";

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="mybingo"
              element={<MyBingoPage bingodata={bingodata} />}
            />
            <Route
              path="mysterybingointro"
              element={<MysteryBingoIntroPage />}
            />
            {/* <Route path=":mysteryMbtiBingo" element={<MysteryBingoPage />} /> */}
            {/* <Route path="/mysteryMbtiBingo/:id" element={<MysteryBingoPage />} /> */}
            <Route path="mysterybingo" element={<MysteryBingoPage />} />
            <Route path="results" element={<ResultsPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div>
//         <h1>MBTI</h1>
//         <h2>
//           빙고로 알아보는 나의 <span>진짜!</span> MBTI
//         </h2>
//         {/* <button>시작하기</button> */}
//         <Link>시작하기</Link>
//       </div>
//     </Router>
//   );
// }

// export default App;
