// src/StudentProfile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        profile_picture: '',
        date_of_birth: '',
        email: '',
        phone_number: '',
        student_id: '',
        major: '',
        year_of_study: '',
        gpa: '',
        academic_advisor: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to the ProfileDisplay page with the form data
        navigate('/profile/data', { state: { profileData: formData } });
    };

    return (
        <div className="container">
            <h1>Student Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />

                {/* <label>Profile Picture URL:</label>
                <input type="text" name="profile_picture" value={formData.profile_picture} onChange={handleChange} /> */}

                <label>Date of Birth:</label>
                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Phone Number:</label>
                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

                <label>Student ID:</label>
                <input type="text" name="student_id" value={formData.student_id} onChange={handleChange} required />

                <label>Major:</label>
                <input type="text" name="major" value={formData.major} onChange={handleChange} required />

                <label>Year of Study:</label>
                <input type="text" name="year_of_study" value={formData.year_of_study} onChange={handleChange} required />

                <label>GPA:</label>
                <input type="number" step="0.01" name="gpa" value={formData.gpa} onChange={handleChange} required />

                <label>Academic Advisor:</label>
                <input type="text" name="academic_advisor" value={formData.academic_advisor} onChange={handleChange} required />

                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
};

export default StudentProfile;