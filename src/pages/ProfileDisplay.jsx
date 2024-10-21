// src/ProfileDisplay.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProfileDisplay = () => {
    const location = useLocation();
    const { profileData } = location.state || {};

    if (!profileData) {
        return <div>No profile data available.</div>;
    }

    return (
        <div className="container">
            <h1>Profile Details</h1>
            <ul>
                <li><strong>Full Name:</strong> {profileData.full_name}</li>
                <li><strong>Profile Picture:</strong> {profileData.profile_picture}</li>
                <li><strong>Date of Birth:</strong> {profileData.date_of_birth}</li>
                <li><strong>Email:</strong> {profileData.email}</li>
                <li><strong>Phone Number:</strong> {profileData.phone_number}</li>
                <li><strong>Student ID:</strong> {profileData.student_id}</li>
                <li><strong>Major:</strong> {profileData.major}</li>
                <li><strong>Year of Study:</strong> {profileData.year_of_study}</li>
                <li><strong>GPA:</strong> {profileData.gpa}</li>
                <li><strong>Academic Advisor:</strong> {profileData.academic_advisor}</li>
            </ul>
        </div>
    );
};

export default ProfileDisplay;