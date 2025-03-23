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
    

    
    </>
  );
}

export default Matches;