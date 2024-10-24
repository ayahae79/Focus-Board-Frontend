import axios from 'axios';
import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:3000';

const SchedulePage = () => {
  const [coursesByDay, setCoursesByDay] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: []
    // Friday: [],
    // Saturday: [],
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/course/courses`);
        const courses = response.data;

        const groupedCourses = {
          Sunday: [],
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        };

        courses.forEach((course) => {
          course.lectureDays.forEach((day) => {
            if (groupedCourses[day]) {
              groupedCourses[day].push(course);
            }
          });
        });

        setCoursesByDay(groupedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const timeSlots = [
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
  ];

  const isTimeInRange = (time, startTime, endTime) => {
    const parseTime = (timeStr) => {
      const [hour, modifier] = timeStr.split(' ');
      let hour24 = parseInt(hour, 10);
      if (modifier === 'PM' && hour24 < 12) hour24 += 12;
      if (modifier === 'AM' && hour24 === 12) hour24 = 0;
      return hour24;
    };

    const time24 = parseTime(time);
    const start24 = parseTime(startTime);
    const end24 = parseTime(endTime);

    return time24 >= start24 && time24 < end24;
  };

  return (
    <div>
      <h1>Course Schedule</h1>
      <div className="schedule">
        <div className="header">
          <div className="time-header">Time</div>
          {Object.keys(coursesByDay).map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>
        {timeSlots.map((time) => (
          <div key={time} className="time-row">
            <div className="time-slot">{time}</div>
            {Object.keys(coursesByDay).map((day) => {
              const courses = coursesByDay[day].filter((course) => {
                return isTimeInRange(time, course.startTime, course.endTime);
              });

              return (
                <div key={`${time}-${day}`} className="cell">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <div key={course._id} className="course-item">
                        <strong>{course.title}</strong>
                        <div>
                          {course.startTime} - {course.endTime}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span>No class</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
