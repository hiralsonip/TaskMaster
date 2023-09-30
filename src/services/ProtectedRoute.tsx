import { useContext } from 'react'
import AuthContext, { AuthContextType } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const auth = useContext(AuthContext) as AuthContextType;

    return auth.isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute
