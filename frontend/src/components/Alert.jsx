import { useAppContext } from "../context/appContext";

function Alert() {
  const { alertType, alertText } = useAppContext();
  return (
    <div
      className={`${
        alertType === "error" ? "alert-error" : "alert-success"
      } w-64 rounded-lg text-center`}
    >
      {alertText}
    </div>
  );
}

export default Alert;
