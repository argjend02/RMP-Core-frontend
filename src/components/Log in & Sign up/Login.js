import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  InputAdornment,
  TextField,
  IconButton,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../logo";
import Iconify from "../iconify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/Login", {
        email: email,
        password: password,
      });

      const {
        token,
        email: studentEmail,
        userId: userId,
        departmentId: studentDepartmentId,
        roles,
      } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", studentEmail);
      localStorage.setItem("departmentId", studentDepartmentId);
      localStorage.setItem("role", roles);
      localStorage.setItem("userId", userId);

      // Token will be automatically added by the axios interceptor on subsequent requests
      console.log(roles);
      if (roles == "Student") {
        navigate("/dashboardUser");
      } else {
        navigate("/dashboard");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      // Safely log error information
      try {
        if (error && typeof error === "object") {
          if (error.response) {
            console.error("Error Response:", error.response.data);
            console.error("Error Status:", error.response.status);
          } else if (error.request) {
            console.error("Error Request:", error.request);
          }
          if (error.message) {
            console.error("Error Message:", error.message);
          }
        }
      } catch (logError) {
        console.error("Error logging failed:", logError);
      }

      // Show more specific error message
      let errorMessage = "The credential is not correct";
      try {
        if (error && error.response && error.response.data) {
          errorMessage =
            error.response.data.message ||
            error.response.data.error ||
            errorMessage;
        } else if (error && error.message) {
          errorMessage = error.message;
        }
      } catch (msgError) {
        // Use default message if error parsing fails
      }

      alert(errorMessage);
    }
  };

  return (
    <>
      <Helmet>
        <title> Login | RateMyProfessor </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to RateMyProfessor
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {""}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:facebook-fill"
                  color="#1877F2"
                  width={22}
                  height={22}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:twitter-fill"
                  color="#1C9CEA"
                  width={22}
                  height={22}
                />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            {/* <LoginForm /> */}

            {/* <> */}
            <Stack spacing={3}>
              <TextField
                name="email"
                label="Email address"
                value={email}
                onChange={handleEmailChange}
              />

              <TextField
                name="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Checkbox name="remember" label="Remember me" />
              <Link variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Login
            </LoadingButton>
            {/* </> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
