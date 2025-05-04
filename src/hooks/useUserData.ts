
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { AppUser } from "@/types/auth";

export const useUserData = () => {
  const { toast } = useToast();

  // Função para buscar dados do usuário a partir da sessão
  const fetchUserData = async (currentSession: Session): Promise<AppUser | null> => {
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

  return { fetchUserData };
};
