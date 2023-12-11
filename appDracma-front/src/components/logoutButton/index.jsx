import { useAuth } from './../authContext/index';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
