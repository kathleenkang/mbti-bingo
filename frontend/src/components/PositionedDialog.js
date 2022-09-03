import Swal from "sweetalert2";

let PositionedDialog = (title) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "링크 복사 완료!",
    showConfirmButton: false,
    timer: 1500,
  });
};

export default PositionedDialog;
