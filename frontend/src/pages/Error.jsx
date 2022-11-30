import React from "react";
import Wrapper from "../components/HOC/Wrapper";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h3">Seems you've taken a wrong turn</Typography>
      <Button
        color="neutral"
        variant="contained"
        sx={{ backgroundColor: shades.neutral[400], color: "white" }}
        size="large"
        onClick={() => {
          navigate("/login");
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default Wrapper(Error, "Error Page");
