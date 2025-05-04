
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "agency" | "power_user" | "user";
}

const ProtectedRoute = ({ 
  children,
  requiredRole
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      console.log("ProtectedRoute: Auth loaded, user:", user ? "autenticado" : "não autenticado");
    }
  }, [isLoading, user]);

  // Aguardar carregamento da autenticação
  if (isLoading) {
    console.log("ProtectedRoute: Carregando...");
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-3xl">...</div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se o usuário não estiver autenticado, redirecionar para o login
  if (!user) {
    console.log("ProtectedRoute: Usuário não autenticado, redirecionando para /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificação de papel necessário (se especificado)
  if (requiredRole) {
    // Verificação de admin
    if (requiredRole === "admin" && user.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    // Verificação de agência
    if (requiredRole === "agency" && user.role !== "agency" && user.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    // Verificação de power_user
    if (
      requiredRole === "power_user" && 
      !["admin", "agency", "power_user"].includes(user.role)
    ) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Se tudo estiver ok, renderizar os filhos
  console.log("ProtectedRoute: Usuário autenticado, renderizando conteúdo protegido");
  return <>{children}</>;
};

export default ProtectedRoute;
