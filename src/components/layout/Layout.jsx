import { Outlet, Link, useLocation } from "react-router-dom";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import AddIcon from "@mui/icons-material/Add";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import toast from "react-hot-toast";

const Layout = ({ mode, setMode }) => {
  const { pathname } = useLocation();

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Box minHeight="100vh" bgcolor="background.default" color="text.primary">
      <header>
        <Box
          sx={{
            px: { xs: 1, sm: 2 },
            pt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 700,
              letterSpacing: 1,
              userSelect: "none",
            }}
          >
            SecureLife <SecurityIcon color="primary" sx={{ fontSize: 32 }} />
          </Typography>
          <Box
            sx={{
              width: { xs: "100%", sm: "auto" },
              px: { xs: 2, sm: 0 },
              display: "flex",
              justifyContent: { xs: "space-between", sm: "flex-end" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {pathname === "/" && (
              <Link to="/NewApplication" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ minWidth: 160 }}
                >
                  Add New Application
                </Button>
              </Link>
            )}
            {pathname === "/NewApplication" && (
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FormatListNumberedIcon />}
                  sx={{ minWidth: 160 }}
                >
                  All Applications
                </Button>
              </Link>
            )}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 1,
                display: { xs: "none", sm: "block" },
              }}
            />
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              aria-label="Toggle light/dark mode"
              sx={{ ml: { sm: 1 } }}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
      </header>
      <Box component="main" sx={{ px: { xs: 1, sm: 2 }, pb: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
