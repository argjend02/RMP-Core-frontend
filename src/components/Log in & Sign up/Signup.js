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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../logo";
import Iconify from "../iconify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

// ----------------------------------------------------------------------

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

export default function Signup() {
  const mdUp = useResponsive("up", "md");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  // const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [university, setUniversity] = useState([]);
  const [universityId, setUniversityId] = useState("");
  const [department, setDepartment] = useState([]);
  const [departmentId, setDepartmentID] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const fetchDepartment = async (universityId) => {
    try {
      const response = await api.get(
        `/api/Department/GetDepartmentsByUniversity/${universityId}`
      );
      setDepartment(response.data);
    } catch (error) {
      console.error("Gabim gjatë kërkesës:", error);
    }
  };

  const fetchUniversities = async () => {
    try {
      const response = await api.get("/api/Universities");
      setUniversity(response.data);
    } catch (error) {
      console.error("Gabim gjatë kërkesës:", error);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // const handleGenderChange = (e) => {
  //   setGender(e.target.value);
  // };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleUniversityChange = (e) => {
    setUniversityId(e.target.value);
    fetchDepartment(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartmentID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("Name", name);
    payload.append("Surname", surname);
    payload.append("Email", email);
    payload.append("UserName", username);
    payload.append("Password", password);
    // payload.append("User.Gender", gender);
    payload.append("UniversityId", universityId);
    payload.append("DepartmentID", departmentId);
    payload.append("Grade", grade);
    payload.append("ConfirmPassword", rePassword);

    const profilePhotoInput = document.getElementById("profilePhoto");
    if (profilePhotoInput.files.length > 0) {
      payload.append("file", profilePhotoInput.files[0]);
    }

    // Make the API call to the signup endpoint
    api
      .post("/api/Account/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();

        alert("You have registered successfully!");
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <>
      <Helmet>
        <title> Signup | RateMyProfessor </title>
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
              Hi, You can register!
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
              Sign up to RateMyProfessor
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              Don’t have an account? {""}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                    sx={{ width: "50%" }}
                  />
                  <TextField
                    label="Surname"
                    value={surname}
                    onChange={handleSurnameChange}
                    required
                    sx={{ width: "50%" }}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    sx={{ width: "65%" }}
                  />
                  <TextField
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    sx={{ width: "35%" }}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ width: "50%" }}>
                    <InputLabel>University</InputLabel>
                    <Select
                      value={universityId}
                      onChange={handleUniversityChange}
                      required
                    >
                      <MenuItem value="">Select University</MenuItem>
                      {university.map((uni) => (
                        <MenuItem
                          key={uni.universityId}
                          value={uni.universityId}
                        >
                          {uni.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ width: "50%" }}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={departmentId}
                      onChange={handleDepartmentChange}
                      required
                    >
                      <MenuItem value="">Select Department</MenuItem>
                      {department.map((dept) => (
                        <MenuItem
                          key={dept.departmentId}
                          value={dept.departmentId}
                        >
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    sx={{ width: "50%" }}
                  />

                  <TextField
                    label="Grade"
                    value={grade}
                    onChange={handleGradeChange}
                    required
                    sx={{ width: "50%" }}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    sx={{ width: "50%" }}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    value={rePassword}
                    onChange={handleRePasswordChange}
                    required
                    sx={{ width: "50%" }}
                  />
                </Stack>

                <FormControlLabel
                  control={<Checkbox id="remember-me" />}
                  label="Remember me"
                />
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>
                <a href="#">Need help?</a>
              </Stack>
            </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
