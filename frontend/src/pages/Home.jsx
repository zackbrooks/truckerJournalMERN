import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Wrapper from "../components/HOC/Wrapper";
import { shades } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Home = () => {
  const navigate = useNavigate();
  const { user, loggedIn } = useAppContext();

  React.useEffect(() => {
    if (user) {
      loggedIn();
      navigate("/journal");
      // setTimeout(() => {
      //   navigate("/journal");
      // }, 3000);
    }
  }, [user, navigate]);
  return (
    <Box maxWidth={400}>
      <Typography variant="h5" marginBottom="5px">
        Welcome To The Trucking Journal!
      </Typography>
      <Typography variant="body1">
        Trucking Journal was created to make a trucker's life on the road easier
        and more organized. This is done by creating a place where a trucker can
        keep their notes on customers and brokers in one place.
      </Typography>
      <Box margin="5px 0">
        <Typography variant="subtitle2">
          {bull}Filling a lot of notebooks?
        </Typography>
        <Typography variant="subtitle2">
          {bull}Hard time finding specific notes?
        </Typography>
        <Typography variant="subtitle2">
          {bull}Want to save notes better?
        </Typography>
      </Box>
      <Typography variant="body1" marginBottom="5px">
        If you answered yes to any of the above questions, The Trucking Journal
        is for you! Login or signup below!
      </Typography>
      <Box display="flex" justifyContent="center" gap="12px">
        <Link to="/login">
          <Button
            color="neutral"
            sx={{ backgroundColor: shades.neutral[400], color: "white" }}
            variant="contained"
            size="large"
          >
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            color="neutral"
            variant="contained"
            sx={{ backgroundColor: shades.neutral[400], color: "white" }}
            size="large"
          >
            Signup
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Wrapper(Home);
