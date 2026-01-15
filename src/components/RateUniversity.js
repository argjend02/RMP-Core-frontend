import React, { useState, useEffect } from "react";
import api from "../api/axios";

const RateUniversity = () => {
  const [rateUniversities, setRateUniversities] = useState([]);
  const [formData, setFormData] = useState({
    universityid: 0,
    studentid: 0,
    overall: 0,
    feedback: "",
  });

  useEffect(() => {
    getAllRateUniversities();
  }, []);

  const getAllRateUniversities = async () => {
    try {
      const response = await api.get("/api/RateUniversity");
      setRateUniversities(response.data);
    } catch (error) {
      console.error("Error fetching rate university:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateRateUniversity = async () => {
    try {
      const response = await api.post(
        "/api/RateUniversity/CreateRateUniversity",
        formData
      );
      setRateUniversities([...rateUniversities, response.data]);
      setFormData({
        universityid: 0,
        studentid: 0,
        overall: 0,
        feedback: "",
      });
    } catch (error) {
      console.error("Error creating rate university:", error);
    }
  };

  const handleDeleteRateUniversity = async (id) => {
    try {
      await api.delete(`/api/RateUniversity/DeleteRateUniversity/${id}`);
      setRateUniversities(
        rateUniversities.filter((university) => university.id !== id)
      );
    } catch (error) {
      console.error("Error deleting rate university:", error);
    }
  };

  return (
    <div>
      <h1>Rate Universities</h1>
      <div>
        <h2>Create New Rate Universities</h2>
        <label>University ID:</label>
        <input
          type="number"
          name="universityid"
          value={formData.universityid}
          onChange={handleChange}
        />

        <label>Student ID:</label>
        <input
          type="number"
          name="studentid"
          value={formData.studentid}
          onChange={handleChange}
        />

        <label>Overall:</label>
        <input
          type="number"
          name="overall"
          value={formData.overall}
          onChange={handleChange}
        />

        <label>Feedback:</label>
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
        />

        <button onClick={handleCreateRateUniversity}>Create</button>
      </div>

      <div>
        <h2>All Rate Universities</h2>
        <ul>
          {rateUniversities.map((university) => (
            <li key={university.id}>
              <p>University ID: {university.universityid}</p>
              <p>Student ID: {university.studentId}</p>
              <p>Overall: {university.overall}</p>
              <p>Feedback: {university.feedback}</p>
              <button onClick={() => handleDeleteRateUniversity(university.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RateUniversity;
