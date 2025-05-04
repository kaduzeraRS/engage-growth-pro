
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAuthService = () => {
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
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

      return true;
    } catch (error) {
      console.error("AuthContext: Erro ao fazer login:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um problema ao tentar fazer login",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
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

  return { login, register, loginWithGoogle, logout };
};
