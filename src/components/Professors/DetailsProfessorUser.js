import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';
import Iconify from '../iconify';

function DetailsProfessorUser() {
  const [professors, setProfessors] = useState([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    fetchProfessors(search);
  }, [search]);

  const fetchProfessors = async (searchText) => {
    try {
      const departmentId = localStorage.getItem('departmentId');
      let url = `http://localhost:44364/api/Professors/department/${departmentId}`;
      
      if (searchText) {
        url += `/SearchProfessor?SearchTerm=${encodeURIComponent(searchText)}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
      console.log('Data from backend:', data);
      setProfessors(data);
    } catch (error) {
      console.error('Error during request:', error);
    }
  };

  return (
    <div className="container">
      {/* <h1>List of Professors</h1> */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3">
            List of Professors
          </Typography>
        </Stack>
      {/* <br /> */}
      <div className="row">
        {professors &&
          professors.map((professor) => (
            <div key={professor.id} className="col-md-4 mb-5">
              <Card sx={{ maxWidth: 345, borderRadius: 0.5  }}>
                <Link  to={`http://localhost:3000/dashboardUser/professorsUser/detProfessorUser/${professor.id}`}
                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:44364/${professor.profilePhotoPath}`}
                    alt={`${professor.name} ${professor.surname}`}
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
                  <Link to={`http://localhost:3000/dashboardUser/professorsUser/listRateProfessorS/${professor.id}`}>
                    <Button size="small" color="primary">
                      VIEW RATE
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DetailsProfessorUser;


