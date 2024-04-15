import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function CustomAppBar() {
  function handleClick() {
    console.log("Clicked");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 2,
            textAlign: "center",
            cursor: "pointer",
            "@media (max-width: 600px)": { flexGrow: 1 },
          }}
          onClick={() => window.open("/")}
        >
          Home
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 2,
            textAlign: "center",
            cursor: "pointer",
            "@media (max-width: 600px)": { display: "none" },
          }}
          onClick={handleClick}
        >
          Country
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 2,
            textAlign: "center",
            cursor: "pointer",
            "@media (max-width: 653px)": { display: "none" },
          }}
          onClick={handleClick}
        >
          About Us
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 2,
            textAlign: "center",
            cursor: "pointer",
            "@media (max-width: 653px)": { flexGrow: 1 },
          }}
          onClick={() => window.open("/favorite")}
        >
          Favorite
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
