
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AccountsPage from "./pages/dashboard/accounts/AccountsPage";
import HeatingPage from "./pages/dashboard/heating/HeatingPage";
import AdminUsersPage from "./pages/dashboard/admin/AdminUsersPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rotas protegidas do dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="accounts" element={<AccountsPage />} />
              <Route path="heating" element={<HeatingPage />} />
              
              {/* Rotas de administração */}
              <Route path="admin/users" element={<AdminUsersPage />} />
              
              {/* Redireciona páginas vazias para implementação futura */}
              <Route path="scheduler" element={<div className="p-4">Agendamento de Posts - Implementação Futura</div>} />
              <Route path="activity" element={<div className="p-4">Atividades - Implementação Futura</div>} />
              <Route path="reports" element={<div className="p-4">Relatórios - Implementação Futura</div>} />
              <Route path="settings" element={<div className="p-4">Configurações - Implementação Futura</div>} />
              <Route path="subscription" element={<div className="p-4">Minha Assinatura - Implementação Futura</div>} />
              <Route path="support" element={<div className="p-4">Suporte - Implementação Futura</div>} />
              <Route path="profile" element={<div className="p-4">Meu Perfil - Implementação Futura</div>} />
              <Route path="admin/system" element={<div className="p-4">Sistema - Implementação Futura</div>} />
              <Route path="admin/logs" element={<div className="p-4">Logs - Implementação Futura</div>} />
            </Route>
            
            {/* Página não encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
