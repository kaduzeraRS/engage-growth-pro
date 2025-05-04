
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simular carregamento inicial e checar se há um usuário logado
    const checkAuth = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          // Numa implementação real, verificaríamos o token com o servidor
          setUser(JSON.parse(savedUser));
        } catch (error) {
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Para fins de demonstração - simulando uma API de login
      // Em um caso real, você chamaria sua API de autenticação aqui
      if (email === "contatokadueduardo@gmail.com" && password === "vaibrasil25") {
        const mockUser: User = {
          id: "1",
          name: "Admin",
          email: "contatokadueduardo@gmail.com",
          role: "admin",
          subscription: {
            status: "active",
            plan: "lifetime",
            expiresAt: null
          },
          avatar: "https://github.com/shadcn.png"
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo de volta ao sistema!",
        });
        return true;
      } 
      // Usuário de demonstração normal
      else if (email === "user@example.com" && password === "password") {
        const mockUser: User = {
          id: "2",
          name: "Usuário Teste",
          email: "user@example.com",
          role: "user",
          subscription: {
            status: "active",
            plan: "monthly",
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo de volta ao sistema!",
        });
        return true;
      }
      
      toast({
        title: "Falha no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
      return false;
    } catch (error) {
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
      
      // Simulando registro (em um caso real, faria uma chamada à API)
      setTimeout(() => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: "user",
          subscription: {
            status: "trial",
            plan: "free",
            expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
          }
        };
        
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }, 1000);
      
      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso!",
      });
      return true;
    } catch (error) {
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

  const loginWithGoogle = () => {
    toast({
      title: "Google Login",
      description: "O login com Google será implementado na integração real",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logout realizado",
      description: "Você saiu com sucesso",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, loginWithGoogle, logout }}
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
