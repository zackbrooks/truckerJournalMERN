import React from "react";
import { Box, Typography } from "@mui/material";

const Wrapper = (Component, title) =>
  function HOC() {
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
                border: "solid 4px white",
              }}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Component />
          </Box>
        </Box>
      </Box>
    );
  };

export default Wrapper;
