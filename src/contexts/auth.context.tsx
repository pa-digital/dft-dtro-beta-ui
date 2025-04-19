import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
  } from 'react';
import axiosInstance from '../utils/axios-instance';
import { Endpoints } from '../constants/endpoints';
  
  type AuthContextType = {
    isAuthenticated: boolean | null;
    isLoading: boolean;
    isAdmin: boolean;
    refreshAuth: () => Promise<void>;
  };
  
  const AuthContext = createContext<AuthContextType>({
    isAuthenticated: null,
    isLoading: true,
    isAdmin: false,
    refreshAuth: async () => {}
  });
  
  type AuthProviderProps = {
    children: ReactNode;
  };
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const checkAuth = async () => {
      try {
        const response = await axiosInstance.post(Endpoints.Token.Verify, {});
        setIsAdmin(response.data.isAdmin);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    const refreshAuth = async () => {
      setIsLoading(true);
      await checkAuth();
    };

    useEffect(() => {
      checkAuth();
    }, []);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, isLoading, isAdmin, refreshAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);
  