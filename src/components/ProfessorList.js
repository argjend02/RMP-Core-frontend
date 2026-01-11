

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Input, List } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlaceholderImage from "../assests/man-reading-book.ec0041cf.jpeg";
import Logo2 from '../components/logo/Logo2';



function ProfessorList() {
  const [professors, setProfessors] = useState([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfessors(search);
  }, [search]);

  const fetchProfessors = async (searchText) => {
    try {
      let url = 'http://localhost:44364/api/Professors';
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

  const [searchText, setSearchText] = useState('');
  
  const handleSearch = () => {
    navigate(`/ProfessorList?search=${searchText}`);
  };


  

  return (

    <div className='bkgProfList'>
          <section class="top-nav">
    <div>

    <Logo2 
                sx={{
                  position: 'relative',
                  // top: { xs: 16, sm: 24, md: 40 },
                  // left: { xs: 16, sm: 24, md: 40 },
                }}
    />


    </div>
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
    <div class='menu-button'></div>
  </label>
    <ul class="menu">

      <li>
      <div className="sear">
      <Button onClick={handleSearch}><SearchIcon className="searIcon"  /></Button>
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
      <br />
      <div className="row">
        {professors &&
          professors.map((professor) => (
            <div key={professor.id} className="col-md-4 mb-5">
              <Card sx={{ maxWidth: 345, borderRadius: 0.5  }}>
              <Link  to={`http://localhost:3000/getOverallRatingProfessor/${professor.id}`}
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

