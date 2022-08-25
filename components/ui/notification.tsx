import classes from "./notification.module.css";
import ReactDOM from "react-dom";

interface Props {
  notification: NotificationStatus;
}

export interface NotificationStatus {
  title: string;
  message: string;
  status: number | string;
}

function Notification({ notification }: Props) {
  const { title, message, status } = notification;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notification") as Element
  );
}

export default Notification;
