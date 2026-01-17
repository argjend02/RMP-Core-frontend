import React, { useState, useEffect } from "react";
import api from "../api/axios";

const RateProfessor = () => {
  const [rateProfessors, setRateProfessors] = useState([]);
  const [formData, setFormData] = useState({
    professorid: 0,
    studentid: 0,
    communicationskills: 0,
    responsiveness: 0,
    gradingfairness: 0,
    feedback: "",
  });

  useEffect(() => {
    getAllRateProfessors();
  }, []);

  const getAllRateProfessors = async () => {
    try {
      const response = await api.get("/api/RateProfessor");
      setRateProfessors(response.data);
    } catch (error) {
      console.error("Error fetching rate professors:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateRateProfessor = async () => {
    try {
      const response = await api.post(
        "/api/RateProfessor/CreateRateProfessor",
        formData
      );
      setRateProfessors([...rateProfessors, response.data]);
      setFormData({
        professorid: 0,
        studentid: 0,
        communicationskills: 0,
        responsiveness: 0,
        gradingfairness: 0,
        feedback: "",
      });
    } catch (error) {
      console.error("Error creating rate professor:", error);
    }
  };

  const handleDeleteRateProfessor = async (id) => {
    try {
      await api.delete(`/api/RateProfessor/DeleteRateProfessor/${id}`);
      setRateProfessors(
        rateProfessors.filter((professor) => professor.id !== id)
      );
    } catch (error) {
      console.error("Error deleting rate professor:", error);
    }
  };

  return (
    <div>
      <h1>Rate Professors</h1>
      <div>
        <h2>Create New Rate Professor</h2>
        <label>Professor ID:</label>
        <input
          type="number"
          name="professorid"
          value={formData.professorid}
          onChange={handleChange}
        />

        <label>Student ID:</label>
        <input
          type="number"
          name="studentid"
          value={formData.studentid}
          onChange={handleChange}
        />

        <label>Communication Skills:</label>
        <input
          type="number"
          name="communicationskills"
          value={formData.communicationskills}
          onChange={handleChange}
        />

        <label>Responsiveness:</label>
        <input
          type="number"
          name="responsiveness"
          value={formData.responsiveness}
          onChange={handleChange}
        />

        <label>Grading Fairness:</label>
        <input
          type="number"
          name="gradingfairness"
          value={formData.gradingfairness}
          onChange={handleChange}
        />

        <label>Feedback:</label>
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
        />

        <button onClick={handleCreateRateProfessor}>Create</button>
      </div>

      <div>
        <h2>All Rate Professors</h2>
        <ul>
          {rateProfessors.map((professor) => (
            <li key={professor.id}>
              <p>Professor ID: {professor.professorId}</p>
              <p>Student ID: {professor.studentId}</p>
              <p>Communication Skills: {professor.communicationSkills}</p>
              <p>Responsiveness: {professor.responsiveness}</p>
              <p>Grading Fairness: {professor.gradingFairness}</p>
              <p>Feedback: {professor.feedback}</p>
              <button onClick={() => handleDeleteRateProfessor(professor.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RateProfessor;
