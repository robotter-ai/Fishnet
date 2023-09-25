import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDisconnect } from 'wagmi';

export default () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
    localStorage.clear();
    cookies.remove('bearerToken');
    navigate('/', { replace: true });
  };

  return { handleLogout };
};
