import Swal, { SweetAlertIcon } from "sweetalert2";

interface AlertOptions {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
  timer?: number;
  showCloseButton?: boolean;
}

export const showAlert = ({
  title,
  text = "",
  icon = "success",
  timer = 2000,
  showCloseButton = true, // ✅ default true
}: AlertOptions) => {
  return Swal.fire({
    title,
    text,
    icon,
    showConfirmButton: false,
    showCloseButton, // ✅ adds the close (X) button
    timer,
    timerProgressBar: true,
    toast: true,
    position: "top-end",
  });
};
