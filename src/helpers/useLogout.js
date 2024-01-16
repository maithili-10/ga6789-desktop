import { useContext } from 'react'
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import UserContext from './Context/user-context';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  const logout = () => {
    // Clear cache of all games
    queryClient.removeQueries();

    // Remove items from local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('initialDeposit');

    // Update context values
    ctx.setUser(null);
    ctx.setUserInfo(null);
    ctx.setDagaBalance(null);

    // Navigate to the login page
    navigate('/login');
    
  };

  return logout;
};

export default useLogout;