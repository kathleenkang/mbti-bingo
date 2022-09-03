import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Override Text scaling
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
// if (TextInput.defaultProps) {
//   TextInput.defaultProps.allowFontScaling = false;
// } else {
//   TextInput.defaultProps = {};
//   TextInput.defaultProps.allowFontScaling = false;
// }

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
