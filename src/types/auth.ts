
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

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

export interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}
