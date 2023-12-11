import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './../components/authContext/index'; // Importe o hook useAuth

function ProtectedRoute() {
  const { authenticated } = useAuth(); // Use o hook useAuth para acessar o contexto

  return authenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
