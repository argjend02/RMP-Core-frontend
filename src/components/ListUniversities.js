import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap'; 
import ReactStars from 'react-rating-stars-component'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ListUniversities() {
  const [universities, setUniversities] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('http://localhost:44364/api/Universities'); 
      const data = await response.json();
      setUniversities(data);
    } catch (error) {
      console.error('Gabim gjatë kërkesës:', error);
    }
  };



  return (
    <div className='container'>
      <h1>List of Universities</h1>
      <br></br>
      <div className="row">
        {universities.map((university) => (
          <div key={university.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{university.name}</Card.Title>
                <br></br>
                <Card.Text>Description: {university.description}</Card.Text>
                
              </Card.Body>
              <Card.Footer>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Link to={`/listRateUniversity/${university.universityId}`}> 
                    <Button variant="primary">View Rate University</Button>
                  </Link>

                  <Link to="http://localhost:3000/rateUniversity">
                    <Button variant="success">Create Rate</Button>
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ListUniversities;