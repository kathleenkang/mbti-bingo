import Swal from "sweetalert2";
import NyanCat from "../images/nyan-cat.gif";

let CuteAlert = (title) => {
  Swal.fire({
    title: title,
    width: 350,
    // padding: "6px",
    color: "#716add",
    backdrop: `
      rgba(0,0,123,0.4)
      url("${NyanCat}")
      left top
      no-repeat
    `,
    // customClass: {
    //   popup: 'format-pre'
    // }
  });
};

export default CuteAlert;
