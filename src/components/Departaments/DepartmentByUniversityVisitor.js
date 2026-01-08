import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
  Typography,
  Button,
  Stack,
  List,
  Input,
  Container,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, ExpandMore as ExpandMoreIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import Logo2 from '../logo/Logo2';

function DepartmentByUniversityVisitor() {
  const [departments, setDepartments] = useState([]);
  const { universityId } = useParams();

  useEffect(() => {
    if (universityId) {
      fetchDepartments();
    }
  }, [universityId]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`http://localhost:44364/api/Departments`);
      const data = await response.json();
      const filteredDepartments = data.filter((department) => department.universityId === +universityId);
      setDepartments(filteredDepartments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const [expandedDescription, setExpandedDescription] = useState({});

  const toggleDescriptionExpansion = (departmentId) => {
    setExpandedDescription((prevExpandedDescription) => ({
      ...prevExpandedDescription,
      [departmentId]: !prevExpandedDescription[departmentId],
    }));
  };

  return (
    <div>

<section class="top-nav">
                    <div>
                    <Logo2 
                        sx={{position: 'relative'}}
                    />

                    </div>
                    <input id="menu-toggle" type="checkbox" />
                    <label class='menu-button-container' for="menu-toggle">
                    <div class='menu-button'></div>
                </label>
                    <ul class="menu">

                    <li>
                    <div className="sear">
                    <Button /*onClick={handleSearch}*/><SearchIcon className="searIcon"  /></Button>
                    <Input
                        disableUnderline 
                        className="searInput"
                        type="text"
                        placeholder="Search Professor..."
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


        <Container sx={{width: '65%', margin: 'auto', marginTop: 5}}>
        <Stack direction="row" alignItems="center">
        <IconButton color="primary" onClick={handleGoBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Departments</Typography>
      </Stack>
      <Divider />
      <List>
        {departments.map((department) => (
          <Accordion key={department.departmentId} elevation={3} style={{ margin: '10px 0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{department.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{maxWidth: '60%'}}>
                <Typography variant="body1" color="textSecondary">
                  <strong>Established Year:</strong> {department.establishedYear}<br />
                  <strong>Staff Number:</strong> {department.staffNumber}<br />
                  <strong>Student Number:</strong> {department.studentNumber}<br />
                  <strong>Course Number:</strong> {department.courseNumber}<br />
                  <strong>Description:</strong> {expandedDescription[department.departmentId]
                    ? department.description
                    : `${department.description.slice(0, 20)}...`}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => toggleDescriptionExpansion(department.departmentId)}
                  >
                    {expandedDescription[department.departmentId] ? 'See less' : 'See more'}
                  </Button>
                  <br />
                </Typography>
              </div>
              <div style={{ marginTop: '0px' }}>
                <Link to={`http://localhost:3000/coursesByDepartmentVisitor/${department.departmentId}`}>
                  <Button className='btn-mui-blackContained' variant="contained" color="primary">
                    View Courses
                  </Button>
                </Link>
              </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
        </Container>
    </div>
  );
}

export default DepartmentByUniversityVisitor;
