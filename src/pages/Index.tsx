
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        console.log("Usuário autenticado, redirecionando para /dashboard");
        navigate("/dashboard");
      } else {
        console.log("Usuário não autenticado, redirecionando para landing page");
        navigate("/landing");
      }
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-3xl">...</div>
        <p className="mt-4 text-muted-foreground">Redirecionando...</p>
      </div>
    </div>
  );
};

export default Index;
