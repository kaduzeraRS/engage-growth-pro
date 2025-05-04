
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Index: isLoading:", isLoading, "user:", user ? "autenticado" : "não autenticado");
    
    if (!isLoading) {
      if (user) {
        console.log("Index: Usuário autenticado, redirecionando para /dashboard");
        navigate("/dashboard", { replace: true });
      } else {
        console.log("Index: Usuário não autenticado, redirecionando para landing page");
        navigate("/landing", { replace: true });
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
