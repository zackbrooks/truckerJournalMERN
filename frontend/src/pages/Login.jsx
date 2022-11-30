import Wrapper from "../components/HOC/Wrapper";
import React from "react";
import api from "../api/posts";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Alert } from "@mui/material";
import { shades } from "../theme";
import { useAppContext } from "../context/appContext";

function Login() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const { isLoading, showAlert, alertText, loginUser, user, loggedIn } =
    useAppContext();

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUser = {
        email: values.email,
        password: values.password,
      };
      loginUser(currentUser);
      console.log("alerttext", alertText);
      // console.log()
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    if (user) {
      loggedIn();
      setTimeout(() => {
        navigate("/journal");
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: "10px",
        width: "60%",

        padding: "50px 10px 20px 10px",
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <TextField
        id="demo-helper-text-aligned"
        label="Email"
        value={values.email}
        onChange={handleChange("email")}
        required
      />
      <TextField
        id="demo-helper-text-aligned"
        label="Password"
        value={values.password}
        onChange={handleChange("password")}
        required
      />
      <Box display="flex" justifyContent="center" gap="12px" marginTop="10px">
        <Button
          color="neutral"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          variant="contained"
          size="small"
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Button
          color="neutral"
          variant="contained"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          size="small"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default Wrapper(Login, "Login");
