import { useNavigate } from 'react-router-dom';

function Matches() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGoHome = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <>

    <div>
        <h1>No matches yet. Create a profile?</h1>
      </div>
      

      <div className="center-button">
        
      <button className="button" onClick={handleGoHome}>Go Back to Home</button>
      </div>

    
    </>
  );
}

export default Matches;