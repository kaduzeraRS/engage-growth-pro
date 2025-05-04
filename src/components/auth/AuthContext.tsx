
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

// Renomeando a interface para AppUser para evitar conflito com User do Supabase
export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "power_user" | "agency" | "admin";
  subscription: {
    status: "active" | "inactive" | "trial";
    plan: "free" | "monthly" | "yearly" | "lifetime";
    expiresAt: string | null;
  };
  avatar?: string;
}

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Função para buscar dados do usuário a partir da sessão
  const fetchUserData = async (currentSession: Session) => {
    try {
      console.log("AuthContext: Buscando dados do usuário para:", currentSession.user.id);
      
      // Buscar dados do perfil do usuário
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentSession.user.id)
        .single();

      if (profileError) {
        console.error("AuthContext: Erro ao buscar perfil:", profileError);
        return null;
      }

      if (!profile) {
        console.error("AuthContext: Perfil não encontrado para o usuário:", currentSession.user.id);
        return null;
      }

      // Buscar dados da assinatura
      const { data: subscription, error: subscriptionError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", currentSession.user.id)
        .single();

      if (subscriptionError && subscriptionError.code !== 'PGRST116') {
        console.error("AuthContext: Erro ao buscar assinatura:", subscriptionError);
      }

      // Construir objeto de usuário
      const userData: AppUser = {
        id: profile.id,
        name: profile.name || "Usuário",
        email: profile.email || currentSession.user.email || "",
        role: profile.role || "user",
        avatar: profile.avatar,
        subscription: {
          status: subscription?.status || "trial",
          plan: subscription?.plan || "free",
          expiresAt: subscription?.expires_at,
        },
      };

      console.log("AuthContext: Dados do usuário carregados com sucesso:", userData.name);
      return userData;
    } catch (error) {
      console.error("AuthContext: Erro ao buscar dados do usuário:", error);
      return null;
    }
  };

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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log("AuthContext: Tentando fazer login com email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("AuthContext: Erro no login:", error.message);
        toast({
          title: "Falha no login",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      console.log("AuthContext: Login bem-sucedido, dados da sessão:", data.session ? "presente" : "ausente");
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo de volta ao sistema!",
      });

      // O listener de autenticação irá atualizar o estado
      return true;
    } catch (error) {
      console.error("AuthContext: Erro ao fazer login:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um problema ao tentar fazer login",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // O resto do componente permanece o mesmo
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log("AuthContext: Tentando registrar usuário:", email);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        console.error("AuthContext: Erro no registro:", error.message);
        toast({
          title: "Falha no cadastro",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso!",
      });
      console.log("AuthContext: Registro bem-sucedido para:", email);
      return true;
    } catch (error) {
      console.error("AuthContext: Erro ao registrar:", error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um problema ao tentar criar sua conta",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      console.log("AuthContext: Iniciando login com Google");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        console.error("AuthContext: Erro no login com Google:", error);
        toast({
          title: "Falha no login com Google",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log("AuthContext: Redirecionando para autenticação Google");
      }
    } catch (error) {
      console.error("AuthContext: Erro no login com Google:", error);
      toast({
        title: "Erro no login com Google",
        description: "Ocorreu um problema ao tentar login com Google",
        variant: "destructive",
      });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log("AuthContext: Iniciando processo de logout");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("AuthContext: Erro ao fazer logout:", error);
        toast({
          title: "Erro no logout",
          description: "Ocorreu um problema ao tentar sair",
          variant: "destructive",
        });
        return;
      }
      
      setUser(null);
      setSession(null);
      
      toast({
        title: "Logout realizado",
        description: "Você saiu com sucesso",
      });
      
      console.log("AuthContext: Logout realizado com sucesso");
    } catch (error) {
      console.error("AuthContext: Erro inesperado ao fazer logout:", error);
      toast({
        title: "Erro no logout",
        description: "Ocorreu um problema ao tentar sair",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, session, isLoading, login, register, loginWithGoogle, logout }}
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
