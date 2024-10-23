import React from 'react';
import CourseList from '../pages/UserCourse';
import EventList from './EventList';
import RoadmapList from './roadmapList';
import TaskList from './TaskList';
  const Dashboard = ({user, course, events, roadmaps, tasks }) => {
    return (
      <div className="dashboard">
        <div className="dashboard-box">
          <CourseList user={user} />
        </div>
        <div className="dashboard-box">
          <EventList user={user} />
        </div>
        <div className="dashboard-box">
          <RoadmapList user={user} />
        </div>
        <div className="dashboard-box">
          <TaskList user={user} />
        </div>
      </div>
  );
};
export default Dashboard;