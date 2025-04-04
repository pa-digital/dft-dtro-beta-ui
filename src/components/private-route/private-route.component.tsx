import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios-instance';

interface PrivateRouteProps {
    element: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthenticated(true);
            return;
            try {
                const response = await axiosInstance.get("/validateToken", { withCredentials: true });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    navigate('/login');
                }
            } catch (error) {
                setIsAuthenticated(false);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    if (isAuthenticated === null) {
        return null;
    }

    return isAuthenticated ? <>{element}</> : null;
};

export default PrivateRoute;
