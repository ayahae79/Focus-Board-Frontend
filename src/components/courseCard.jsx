// CourseCard.js
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      <p className="course-lecture-date">Lecture Date: {new Date(course.lectureSchedule[0].date).toLocaleDateString()}</p>
      <p className="course-start-time">Start Time: {course.lectureSchedule[0].startTime}</p>
      <p className="course-end-time">End Time: {course.lectureSchedule[0].endTime}</p>
      {/* You can add more details as needed */}
    </div>
  );
};

export default CourseCard;