import { useNavigate } from 'react-router-dom';

function Matches() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGoHome = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <>
      <div>
        <h1>Welcome, This is your roommate match!</h1>
        <button onClick={handleGoHome}>Go Back to Home</button>
      </div>
    </>
  );
}

export default Matches;