import "./MbtiCriteria.css";
import { useState } from "react";

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
      <div className="criteria">
        <div className="option-name">{leftoptionlabel}</div>
        <div className="left-btn">
          <input
            id={leftoption}
            className="radio-btn"
            type="radio"
            value={leftoption}
            name={criteria}
            onClick={(e) => {
              changeMbti(e, arrIndex);
            }}
          />
          <label htmlFor={leftoption}>{leftoption}</label>
        </div>
        <div className="criteria-name-container">
          <div className="arrow">⬅</div>
          <div className="criteria-name">{criterialabel}</div>
          <div className="arrow">➡</div>
        </div>
        <div className="right-btn">
          <input
            id={rightoption}
            className="radio-btn"
            type="radio"
            value={rightoption}
            name={criteria}
            onClick={(e) => {
              changeMbti(e, arrIndex);
            }}
          />
          <label htmlFor={rightoption}>{rightoption}</label>
        </div>
        <div className="option-name">{rightoptionlabel}</div>
      </div>
    </>
  );

  //   <>
  //   <div className="criteria">
  //     <div className="option-name">{optionlabel.left}</div>
  //     <div className="option-btn">
  //       <input
  //         id={option.left}
  //         className="radio-btn"
  //         type="radio"
  //         value={option.left}
  //         name={criteria}
  //         onClick={handleChange}
  //       />
  //       <label htmlFor={option.left}>{option.left}</label>
  //     </div>
  //     <div className="criteria-name-container">
  //       <div className="arrow">⬅</div>
  //       <div className="criteria-name">{criterialabel}</div>
  //       <div className="arrow">➡</div>
  //     </div>
  //     <div className="right-btn">
  //       <input
  //         id={option.right}
  //         className="radio-btn"
  //         type="radio"
  //         value={option.right}
  //         name={criteria}
  //         onClick={handleChange}
  //       />
  //       <label htmlFor={option.right}>{option.right}</label>
  //     </div>
  //     <div className="option-name">{optionlabel.right}</div>
  //     {/* <h1>{criterialabel[0]}</h1> */}
  //     {/* <h1>{e.target.value}</h1> */}
  //   </div>
  // </>
}

export default MbtiCriteria;
