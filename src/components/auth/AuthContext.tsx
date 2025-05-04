
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

export interface User {
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
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth event:", event);
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            // Buscar dados do perfil do usuário
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", currentSession.user.id)
              .single();

            if (profileError) {
              console.error("Erro ao buscar perfil:", profileError);
              setUser(null);
              return;
            }

            if (!profile) {
              console.error("Perfil não encontrado para o usuário:", currentSession.user.id);
              setUser(null);
              return;
            }

            // Buscar dados da assinatura
            const { data: subscription, error: subscriptionError } = await supabase
              .from("subscriptions")
              .select("*")
              .eq("user_id", currentSession.user.id)
              .single();

            if (subscriptionError) {
              console.error("Erro ao buscar assinatura:", subscriptionError);
            }

            // Construir objeto de usuário com dados do perfil e assinatura
            setUser({
              id: profile.id,
              name: profile.name,
              email: profile.email,
              role: profile.role,
              avatar: profile.avatar,
              subscription: {
                status: subscription?.status || "trial",
                plan: subscription?.plan || "free",
                expiresAt: subscription?.expires_at,
              },
            });
          } catch (error) {
            console.error("Erro ao processar usuário logado:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    );

    // Verificar sessão inicial
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erro ao verificar sessão:", error);
        setIsLoading(false);
        return;
      }

      setSession(data.session);
      
      if (data.session?.user) {
        try {
          // Buscar dados do perfil do usuário
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();

          if (profileError || !profile) {
            console.error("Erro ao buscar perfil inicial:", profileError);
            setUser(null);
            setIsLoading(false);
            return;
          }

          // Buscar dados da assinatura
          const { data: subscription, error: subscriptionError } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("user_id", data.session.user.id)
            .single();

          if (subscriptionError) {
            console.error("Erro ao buscar assinatura inicial:", subscriptionError);
          }

          // Construir objeto de usuário com dados do perfil e assinatura
          setUser({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: profile.role,
            avatar: profile.avatar,
            subscription: {
              status: subscription?.status || "trial",
              plan: subscription?.plan || "free",
              expiresAt: subscription?.expires_at,
            },
          });
        } catch (error) {
          console.error("Erro ao processar sessão inicial:", error);
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };

    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Falha no login",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo de volta ao sistema!",
      });
      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
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
        console.error("Erro no registro:", error.message);
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
      return true;
    } catch (error) {
      console.error("Erro ao registrar:", error);
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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        toast({
          title: "Falha no login com Google",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro no login com Google:", error);
      toast({
        title: "Erro no login com Google",
        description: "Ocorreu um problema ao tentar login com Google",
        variant: "destructive",
      });
    }
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Erro ao fazer logout:", error);
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
