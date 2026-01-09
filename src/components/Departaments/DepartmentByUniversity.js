
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
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, ExpandMore as ExpandMoreIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

function DepartmentByUniversity() {
  const [departments, setDepartments] = useState([]);
  const { universityId } = useParams();

  useEffect(() => {
    if (universityId) {
      fetchDepartments();
    }
  }, [universityId]);

  const fetchDepartments = async () => {
    try {
      //http://localhost:44364/api/Departments
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
    <div style={{ padding: '20px' }}>
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
                <Link to={`http://localhost:3000/dashboard/departments/courseDep/${department.departmentId}`}>
                  <Button variant="contained" color="primary">
                    View Courses
                  </Button>
                </Link>
              </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </div>
  );
}

export default DepartmentByUniversity;
