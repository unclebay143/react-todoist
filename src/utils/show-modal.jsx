import Swal from "sweetalert2";

export const showConfirmModal = async ({
  title,
  text,
  icon,
  confirmButtonText,
  showCancelButton = false,
  cb,
}) => {
  const res = await Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton,
  });
  if (res.isConfirmed) {
    if (cb) {
      cb();
    }
  }
};
