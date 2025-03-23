import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Dropdown from '../Dropdown'; // Import the reusable Dropdown component


function Profile() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGoHome = () => {
    navigate('/'); // Redirect to the home page
  };

  const handleSave = () => {
    const profileData = {
      likeReact,
      
    };
    console.log('Profile Data:', profileData);
    // You can send this data to an API or save it in local storage
  };

  // State for dropdowns
  const [likeReact, setLikeReact] = useState('');
  const [selectedFruit, setSelectedFruit] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Options for dropdowns
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const sleepOptions = [
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
  ];

  const studyOptions = [
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
  ];

  return (
    <>
      <div>
        <h1>Welcome, This is your Profile!</h1>
        <button onClick={handleGoHome}>Go Back to Home</button>
        <h2>Questionnare</h2>
        
        <h3>Name:</h3>
        <Dropdown />
        <h3>Gender:</h3>
        <Dropdown />
        <h3>How often do you clean your room?</h3>
        <Dropdown />
        <h3>What's your favorite music genre</h3>
        <Dropdown />
        <h3>What is your sleep schedule:</h3>
        <Dropdown />
        <h3>What is your sleep schedule:</h3>
        <Dropdown />
        <h3>Are you more introverted or extroverted:</h3>
        <Dropdown />
        <h3>Where do you usually study:</h3>
        <Dropdown />
        <h3>:</h3>
        <Dropdown />
      </div>
    </>
  );
}

export default Profile;