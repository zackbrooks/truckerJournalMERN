import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ severity, alert, message }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, []);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity || "success"}
          sx={{ width: "100%" }}
        >
          {message || "This is a success message!"}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
