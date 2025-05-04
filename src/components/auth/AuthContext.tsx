
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { AppUser, AuthContextType } from "@/types/auth";
import { useUserData } from "@/hooks/useUserData";
import { useAuthService } from "@/services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { fetchUserData } = useUserData();
  const { login, register, loginWithGoogle, logout: authLogout } = useAuthService();

  useEffect(() => {
    console.log("AuthContext: Inicializando AuthProvider");
    let ignore = false;
    
    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("AuthContext: Evento de autenticação:", event);
        
        if (ignore) return;
        
        if (currentSession) {
          console.log("AuthContext: Sessão detectada, atualizando estado");
          setSession(currentSession);
          
          // Usar setTimeout para evitar deadlocks no Supabase auth
          setTimeout(async () => {
            if (ignore) return;
            const userData = await fetchUserData(currentSession);
            if (!ignore && userData) {
              setUser(userData);
              setIsLoading(false);
            }
          }, 0);
        } else {
          console.log("AuthContext: Nenhuma sessão detectada, limpando estado");
          setUser(null);
          setSession(null);
          setIsLoading(false);
        }
      }
    );

    // Verificar sessão inicial
    const checkSession = async () => {
      try {
        console.log("AuthContext: Verificando sessão inicial...");
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("AuthContext: Erro ao verificar sessão:", error);
          setIsLoading(false);
          return;
        }

        if (data.session) {
          console.log("AuthContext: Sessão inicial encontrada");
          setSession(data.session);
          
          const userData = await fetchUserData(data.session);
          if (!ignore && userData) {
            setUser(userData);
          }
        } else {
          console.log("AuthContext: Nenhuma sessão inicial encontrada");
        }
      } catch (error) {
        console.error("AuthContext: Erro inesperado ao verificar sessão:", error);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    checkSession();
    
    return () => {
      console.log("AuthContext: Limpando efeito do AuthProvider");
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const success = await login(email, password);
    if (!success) setIsLoading(false);
    return success;
  };

  const handleRegister = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const success = await register(name, email, password);
    if (!success) setIsLoading(false);
    return success;
  };

  const handleLogout = async (): Promise<void> => {
    setUser(null);
    setSession(null);
    await authLogout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        login: handleLogin,
        register: handleRegister,
        loginWithGoogle,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
