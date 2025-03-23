import { useNavigate } from 'react-router-dom';
import swoop from './assets/logo.png';

function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={swoop} alt="swoop logo" className="logo-img logo-button" />
    </div>
  );
}

export default Logo;