import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Grid, Link, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { resetTokens } from "../../store/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/user.api";
import { toast } from "react-toastify";
import { NavLink,Outlet } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation(); // Use translation hook
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { toggleTheme, mode } = themeContext;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(resetTokens());
      toast.success(t("navbar.logout")); // Use translation for logout success
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(t("navbar.logoutFailed"));
    }
  };

  return (
    <>
    <AppBar position="sticky" color={mode === "light" ? "default" : "primary"}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div">
              <Link href="/" color="inherit" underline="none">
                {t("navbar.myWebsite")} {/* Use translation for website name */}
              </Link>
            </Typography>
          </Grid>

          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button color="inherit" component={NavLink} to="/" activeClassName="active-link">
                  {t("navbar.home")} {/* Use translation for Home */}
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={NavLink} to="/about" activeClassName="active-link">
                  {t("navbar.about")} {/* Use translation for About */}
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={NavLink} to="/contact" activeClassName="active-link">
                  {t("navbar.contact")} {/* Use translation for Contact */}
                </Button>
              </Grid>
              {isAuthenticated && (
                <Grid item>
                  <Button color="inherit" component={NavLink} to="/dashboard" activeClassName="active-link">
                    {t("navbar.dashboard")} {/* Use translation for Dashboard */}
                  </Button>
                </Grid>
              )}
              <Grid item>
                {isAuthenticated ? (
                  <Button color="inherit" onClick={handleLogout}>
                    {t("navbar.logout")} {/* Use translation for Logout */}
                  </Button>
                ) : (
                  <Button color="inherit" href="/auth">
                    {t("navbar.login")} {/* Use translation for Login */}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* Dark/Light Mode Toggle */}
          <Grid item>
            <Button color="inherit" onClick={toggleTheme}>
              {mode === "light" ? (
                <MdSunny size={20} color="yellow" />
              ) : (
                <FaMoon size={20} color="white" />
              )}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Outlet />
    </>
  );
};

export default Navbar;
