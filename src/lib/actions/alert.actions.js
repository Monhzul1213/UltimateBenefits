import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
export const alert = (title, icon) => {
  Toast.fire({
    icon: icon,
    title: title,
  });
};
