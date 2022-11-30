import Wrapper from "../components/HOC/Wrapper";
import React from "react";
import api from "../api/posts";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { shades } from "../theme";
import { useAppContext } from "../context/appContext";
import Alert from "../components/Alert";

function Signup() {
  const [values, setValues] = React.useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });
  const { user, isLoading, showAlert, registerUser, loggedIn } =
    useAppContext();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password === values.password2) {
      const currentUser = {
        email: values.email,
        password: values.password,
        userName: values.userName,
        confirmPassword: values.password2,
      };
      registerUser(currentUser);
      <Alert severity={"error"} message={"Passwords Do Not Match"} />;
    }
    console.log("passwords do not match");
  };

  React.useEffect(() => {
    if (user) {
      loggedIn();
      navigate("/journal");
      // setTimeout(() => {
      //   navigate("/journal");
      // }, 3000);
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
        label="Username"
        value={values.userName}
        onChange={handleChange("userName")}
        required
      />
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
        type="password"
        onChange={handleChange("password")}
        required
      />
      <TextField
        id="demo-helper-text-aligned"
        label="Confirm Password"
        value={values.password2}
        onChange={handleChange("password2")}
        required
      />
      <Box display="flex" justifyContent="center" gap="12px" marginTop="10px">
        <Button
          color="neutral"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Button
          color="neutral"
          variant="contained"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          size="large"
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

export default Wrapper(Signup, "Signup");
