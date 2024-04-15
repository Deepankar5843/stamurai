import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  return (
    <div
      style={{ marginTop: "auto", width: "100%", position: "fixed", bottom: 0 }}
    >
      <AppBar
        position="static"
        color="inherit"
        sx={{ backgroundColor: "#333" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div sx={{ mb: 0 }}>
            <Link
              component={RouterLink}
              // to="/contact"
              color="white"
              underline="hover"
              sx={{
                mr: 4,
                fontSize: "1rem",
                "@media (max-width: 600px)": {
                  display: "none",
                },
              }}
            >
              Contact
            </Link>
            <Link
              href="mailto:example@example.com"
              color="white"
              underline="hover"
              sx={{
                mr: 4,
                fontSize: "1rem",
                "@media (max-width: 600px)": {
                  display: "none",
                },
              }}
            >
              Email
            </Link>
            <Link
              component={RouterLink}
              // to="/career"
              color="white"
              underline="hover"
              sx={{
                mr: 4,
                fontSize: "1rem",
                "@media (max-width: 600px)": {
                  fontSize: "0.8rem",
                },
              }}
            >
              Career
            </Link>
            <Link
              component={RouterLink}
              // to="/weather"
              color="white"
              underline="hover"
              sx={{
                mr: 4,
                fontSize: "1rem",
                "@media (max-width: 600px)": {
                  fontSize: "0.8rem",
                },
              }}
            >
              Weather
            </Link>
          </div>
          <Typography
            variant="body1"
            component="div"
            color="white"
            sx={{
              mt: 4,
              textAlign: "center",
              fontSize: "1rem",
              "@media (max-width: 600px)": {
                textAlign: "center",
                fontSize: "0.8rem",
              },
            }}
          >
            &copy; 2024 City Explorer. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
