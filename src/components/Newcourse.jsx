import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

const CreateCourseForm = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lecturedate, setLecturedate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (course) => {
    course.preventDefault();
    try {
      const formData = {
        title,
        description,
        lecturedate,
        startTime,
        endTime,
      };
      await axios.post(`${BASE_URL}/course/courses`, formData);
      console.log("saved");
      
      // Reset the state using the setter functions
      setTitle(""); 
      setDescription(""); 
      setLecturedate(""); 
      setStartTime(""); 
      setEndTime("");

      navigate("/courses");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="newcourse-title">New Course</h1>
      <form onSubmit={handleSubmit} className="newcourse-form">
        <div className="newcourse-field">
          <label className="newcourse-label">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="newcourse-input"
            required // Added required attribute
          />
        </div>
        <div className="newcourse-field">
          <label className="newcourse-label">Description:</label>
          <input
            type="text"
            value={description} // Changed to use description state
            onChange={(event) => setDescription(event.target.value)} // Updated onChange
            className="newcourse-input"
          />
        </div>
        <div className="newcourse-field">
          <label className="newcourse-label">Lecture Date:</label>
          <input
            type="date" // Changed input type to date for lecture date
            value={lecturedate} // Changed to use lectureDate state
            onChange={(event) => setLecturedate(event.target.value)} // Updated onChange
            className="newcourse-input"
            required // Added required attribute
          />
        </div>
        <div className="newcourse-field">
          <label className="newcourse-label">Start Time:</label>
          <input
            type="time" // Changed input type to time for start time
            value={startTime} // Changed to use startTime state
            onChange={(event) => setStartTime(event.target.value)} // Updated onChange
            className="newcourse-input"
            required // Added required attribute
          />
        </div>
        <div className="newcourse-field">
          <label className="newcourse-label">End Time:</label>
          <input
            type="time" // Changed input type to time for end time
            value={endTime} // Changed to use endTime state
            onChange={(event) => setEndTime(event.target.value)} // Updated onChange
            className="newcourse-input"
            required // Added required attribute
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </>
  );
};

export default CreateCourseForm;