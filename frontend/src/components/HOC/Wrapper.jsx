import { Box, Typography, Button } from "@mui/material";
import { useAppContext } from "../../context/appContext";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
const Wrapper = (Component, title) =>
  function HOC() {
    const navigate = useNavigate();
    const { user, logOut } = useAppContext();
    console.log("user", user);
    return (
      <Box
        sx={{
          backgroundColor: "white",
          textAlign: "center",
          borderRadius: "10px",
          position: "relative",
          marginTop: "200px",
          padding: "50px 10px 20px 10px",
        }}
      >
        <Box>
          <Typography variant="h2">
            {title ? title : "Trucking Journal"}
          </Typography>
          <Box>
            <img
              src="../../../imgs/truckerlogo2.jpg"
              alt="Trucking Journal"
              style={{
                position: "absolute",
                borderRadius: "100%",
                margin: "0 auto",
                top: "-80px",
                width: "128px",
                height: "128px",
                left: "0",
                right: "0",
                border: "solid 4px white",
              }}
            />
          </Box>
          {user && (
            <Button
              color="neutral"
              sx={{
                backgroundColor: shades.neutral[500],
                color: "white",
                position: "absolute",
                borderRadius: "100%",
                margin: "0 auto",
                top: "-30px",
                width: "64px",
                height: "64px",
                left: "220px",
                right: "0",
                border: "solid 4px white",
              }}
              variant="contained"
              size="small"
              onClick={() => {
                logOut();
                navigate("/");
              }}
            >
              Logout
            </Button>
          )}
          <Box display="flex" alignItems="center" justifyContent="center">
            <Component />
          </Box>
        </Box>
      </Box>
    );
  };

export default Wrapper;
