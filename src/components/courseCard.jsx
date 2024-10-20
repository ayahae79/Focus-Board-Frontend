import React from 'react';

const CourseCard = ({ course }) => {
  // Check if lectureSchedule exists and has at least one item
  const hasLectureSchedule = course.lectureSchedule && course.lectureSchedule.length > 0;

  return (
    <div className="course-card">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      {hasLectureSchedule ? (
        <>
          <p className="course-lecture-date">
            Lecture Date: {new Date(course.lectureSchedule[0].date).toLocaleDateString()}
          </p>
          <p className="course-start-time">
            Start Time: {course.lectureSchedule[0].startTime}
          </p>
          <p className="course-end-time">
            End Time: {course.lectureSchedule[0].endTime}
          </p>
        </>
      ) : (
        <p className="no-lecture-info">No lecture information available.</p>
      )}
      {/* You can add more details as needed */}
    </div>
  );
};

export default CourseCard;