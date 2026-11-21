import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/hooks/usePost";

export const useProfile = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const { posts, loading, error } = usePost(user ? user.id : null);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return {
    user,
    userPosts: posts ?? [],
    loading,
    error,
    handleLogout,
  };
};
