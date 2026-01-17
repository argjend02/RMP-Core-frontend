import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch("http://localhost:44364/api/Universities");
      const data = await response.json();
      setUniversities(data);
    } catch (error) {
      console.error("Gabim gjatë kërkesës:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="container">
      <Button
        variant="outline-secondary"
        onClick={handleGoBack}
        style={{ marginBottom: "20px" }}
      >
        ← Back
      </Button>
      <h1>List of Universities</h1>
      <Alert variant="info" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Alert.Heading>
          <strong>Important Notice</strong>
        </Alert.Heading>
        <p style={{ marginBottom: 0 }}>
          All ratings and reviews displayed here are based on student
          perceptions and opinions. These ratings reflect individual student
          experiences and should be considered as subjective feedback rather
          than objective assessments.
        </p>
      </Alert>
      <div className="row">
        {universities.map((university) => (
          <div key={university.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{university.name}</Card.Title>
                <br></br>
                <Card.Text>Pershkrimi: {university.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link to={`/listRateUniversity/${university.universityId}`}>
                    {/* <Button variant="primary">View Rate University</Button> */}
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

export default UniversityList;
