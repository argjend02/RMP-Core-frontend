import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Input,
  List,
  Alert,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo2 from "../components/logo/Logo2";

function ProfessorList() {
  const [allProfessors, setAllProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");

  const navigate = useNavigate();

  const filterProfessorsData = useCallback((professorsData, searchText) => {
    if (!searchText || searchText.trim() === "") {
      return professorsData;
    }

    const searchLower = searchText.toLowerCase().trim();
    return professorsData.filter((professor) => {
      const firstName = (professor.firstName || "").toLowerCase();
      const lastName = (professor.lastName || "").toLowerCase();
      const education = (professor.education || "").toLowerCase();
      const role = (professor.role || "").toLowerCase();

      return (
        firstName.includes(searchLower) ||
        lastName.includes(searchLower) ||
        education.includes(searchLower) ||
        role.includes(searchLower) ||
        `${firstName} ${lastName}`.includes(searchLower)
      );
    });
  }, []);

  const fetchAllProfessors = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:44364/api/Professors");
      const data = await response.json();
      console.log("Data from backend:", data);
      setAllProfessors(data);
    } catch (error) {
      console.error("Error during request:", error);
    }
  }, []);

  // Fetch all professors once on component mount
  useEffect(() => {
    fetchAllProfessors();
  }, [fetchAllProfessors]);

  const [searchText, setSearchText] = useState(search || "");

  // Sync searchText with URL parameter when it changes
  useEffect(() => {
    setSearchText(search || "");
  }, [search]);

  // Filter in real-time as user types
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredProfessors(allProfessors);
    } else {
      const filtered = filterProfessorsData(allProfessors, searchText);
      setFilteredProfessors(filtered);
    }
  }, [searchText, allProfessors, filterProfessorsData]);

  const handleSearch = () => {
    navigate(`/ProfessorList?search=${searchText}`);
  };

  return (
    <div className="bkgProfList">
      <section class="top-nav">
        <div>
          <Logo2
            sx={{
              position: "relative",
              // top: { xs: 16, sm: 24, md: 40 },
              // left: { xs: 16, sm: 24, md: 40 },
            }}
          />
        </div>
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-button-container" for="menu-toggle">
          <div class="menu-button"></div>
        </label>
        <ul class="menu">
          <li>
            <div className="sear">
              <Button onClick={handleSearch}>
                <SearchIcon className="searIcon" />
              </Button>
              <Input
                disableUnderline
                className="searInput"
                type="text"
                placeholder="Search Professor..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </li>
          <li>
            <List>
              <Link
                to="http://localhost:3000/universityList"
                className="button-47 "
                role="button"
                id="m"
              >
                Go to Universities
              </Link>
            </List>
          </li>
        </ul>
      </section>

      <div className="container">
        <h2>List of Professors</h2>
        <Box sx={{ mb: 3, mt: 2 }}>
          <Alert severity="info" sx={{ fontSize: "1rem", fontWeight: 500 }}>
            <strong>Important Notice:</strong> All ratings and reviews displayed
            here are based on student perceptions and opinions. These ratings
            reflect individual student experiences and should be considered as
            subjective feedback rather than objective assessments.
          </Alert>
        </Box>
        <br />
        {filteredProfessors.length === 0 && allProfessors.length > 0 && (
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            No professors found matching your search.
          </Typography>
        )}
        {filteredProfessors.length === 0 && allProfessors.length === 0 && (
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Loading professors...
          </Typography>
        )}
        <div className="row">
          {filteredProfessors &&
            filteredProfessors.map((professor) => (
              <div key={professor.id} className="col-md-4 mb-5">
                <Card sx={{ maxWidth: 345, borderRadius: 0.5 }}>
                  <Link
                    to={`http://localhost:3000/getOverallRatingProfessor/${professor.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="180"
                        image={`http://localhost:44364/${professor.profilePhotoPath}`}
                        alt={`${professor.firstName} ${professor.lastName}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {professor.firstName} {professor.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Education: {professor.education}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Role: {professor.role}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions>
                    <Link to={`/listRateProfessor/${professor.id}`}>
                      <Button size="small" color="primary">
                        VIEW
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfessorList;
