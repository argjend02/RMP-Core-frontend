import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ListProfessors() {
  const [professors, setProfessors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await fetch("http://localhost:44364/api/Professors");
      const data = await response.json();
      setProfessors(data);
    } catch (error) {
      console.error("Gabim gjatë kërkesës:", error);
    }
  };

  return (
    <div className="container">
      <h1>List of Professors</h1>
      <br></br>
      <div className="row">
        {professors.map((professor) => (
          <div key={professor.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {professor.firstName} {professor.lastName}
                </Card.Title>
                <br></br>
                <Card.Text>Education: {professor.education}</Card.Text>
                <Card.Text>Roli: {professor.role}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link to={`/listRateProfessor/${professor.professorId}`}>
                    <Button variant="primary">View Rate Professor</Button>
                  </Link>

                  <Link to="http://localhost:3000/rateProfessor">
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

export default ListProfessors;
