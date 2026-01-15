import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap"; // Import the Card component from react-bootstrap

function DepartmentList() {
  const [departament, setDepartment] = useState([]);

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await fetch("http://localhost:44364/api/Departments");
      const data = await response.json();
      setDepartment(data);
    } catch (error) {
      console.error("Gabim gjatë kërkesës:", error);
    }
  };

  return (
    <div className="container">
      <h1>Listë e Departamenteve</h1>
      <div className="row">
        {departament.map((departament) => (
          <div key={departament.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{departament.name}</Card.Title>
                <Card.Text>
                  EstablishedYear: {departament.establishedYear}
                </Card.Text>
                <Card.Text>Description: {departament.description}</Card.Text>
              </Card.Body>
            </Card>
            hello
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentList;
