import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
  Typography,
  Stack,
  Paper,
  Button,
  Input,
  List,
  Link, 
  
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import Logo2 from '../logo/Logo2';

function CourseByDepartmentVisitor() {
  const [courses, setCourses] = useState([]);
  const { departmentId } = useParams();

  useEffect(() => {
    if (departmentId) {
      fetchCourses();
    }
  }, [departmentId]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:44364/api/Courses`);
      const data = await response.json();
      const filteredCourses = data.filter((course) => course.departmentID === +departmentId);
      setCourses(filteredCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleGoBack = () => {
    window.history.back();
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


    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', marginTop: 40, marginBottom: 40 }} >
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton color="primary" onClick={handleGoBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Courses</Typography>
      </Stack>
      <Divider />
      {courses.map((course) => (
        <Accordion key={course.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{course.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography variant="body1" color="textSecondary">
                <strong>Code:</strong> {course.code}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Credit Hours:</strong> {course.creditHours}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Description:</strong> {course.description}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
    </div>
  );
}

export default CourseByDepartmentVisitor;
