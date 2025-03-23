import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from "../Dropdown";

function Profile() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const [gender, setGender] = useState('');
  const [sleep, setSleep] = useState('');
  const [study, setStudy] = useState('');
  const [cleaning, setCleaning] = useState('');
  const [music, setMusic] = useState('');
  const [introExtro, setIntroExtro] = useState('');

  const handleSave = () => {
    const profileData = {
      gender,
      sleep,
      study,
      cleaning,
      music,
      introExtro,
    };
    console.log('Profile Data:', profileData);
    // You can add logic to send this data to a backend or local storage
  };

  return (
    <div>
      <h1>Roommate Profile!</h1>

      <div className="center-button">
  <button className="button" onClick={handleGoHome}>Go Back to Home</button>
</div>

      <h2>Questionnaire</h2>

      <h3>Gender:</h3>
      <Dropdown
        label="Select Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        options={[
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' },
          { value: 'Other', label: 'Other' },
        ]}
      />

      <h3>What is your sleep schedule?</h3>
      <Dropdown
        label="Sleep Schedule"
        value={sleep}
        onChange={(e) => setSleep(e.target.value)}
        options={[
          { value: 'Early Bird', label: 'Early Bird' },
          { value: 'Night Owl', label: 'Night Owl' },
          { value: 'Flexible', label: 'Flexible' },
        ]}
      />

      <h3>Where do you usually study?</h3>
      <Dropdown
        label="Study Location"
        value={study}
        onChange={(e) => setStudy(e.target.value)}
        options={[
          { value: 'Library', label: 'Library' },
          { value: 'Room', label: 'Room' },
          { value: 'Coffee Shop', label: 'Coffee Shop' },
        ]}
      />

      <h3>How often do you clean your room?</h3>
      <Dropdown
        label="Cleaning Frequency"
        value={cleaning}
        onChange={(e) => setCleaning(e.target.value)}
        options={[
          { value: 'Daily', label: 'Daily' },
          { value: 'Weekly', label: 'Weekly' },
          { value: 'Rarely', label: 'Rarely' },
        ]}
      />

      <h3>Favorite music genre:</h3>
      <Dropdown
        label="Music Genre"
        value={music}
        onChange={(e) => setMusic(e.target.value)}
        options={[
          { value: 'Pop', label: 'Pop' },
          { value: 'Hip Hop', label: 'Hip Hop' },
          { value: 'Rock', label: 'Rock' },
          { value: 'Classical', label: 'Classical' },
        ]}
      />

      <h3>Are you more introverted or extroverted?</h3>
      <Dropdown
        label="Intro/Extro"
        value={introExtro}
        onChange={(e) => setIntroExtro(e.target.value)}
        options={[
          { value: 'Introverted', label: 'Introverted' },
          { value: 'Extroverted', label: 'Extroverted' },
          { value: 'Ambivert', label: 'Ambivert' },
        ]}
      />

      {/* Centered Save button */}
      <div className="center-button">
        <button className="button" onClick={handleSave}>Save Profile</button>
      </div>
    </div>
  );
}

export default Profile;
