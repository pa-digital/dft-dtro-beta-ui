import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const useAuthNavigate = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const customNavigate = (to: string, options?: any) => {
    refreshAuth().then(() => {
      navigate(to, options);
    });
  };

  return customNavigate;
};

export default useAuthNavigate;
