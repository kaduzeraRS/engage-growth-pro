
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  BarChart3,
  Calendar,
  Clock,
  Flame,
  Home,
  Instagram,
  Layout,
  LogOut,
  Menu,
  MessagesSquare,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
  setIsCollapsed?: (isCollapsed: boolean) => void;
}

export function Sidebar({
  className,
  isCollapsed = false,
  setIsCollapsed,
  ...props
}: SidebarProps) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "max-w-[80px]" : "w-[240px]",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center justify-between border-b px-3 py-2">
        <Link
          to="/dashboard"
          className={cn("flex items-center gap-2 font-bold", {
            "justify-center": isCollapsed
          })}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-primary-foreground">SA</span>
          </div>
          {!isCollapsed && <span className="text-lg">SocialAuto</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed?.(!isCollapsed)}
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Alternar menu</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <div className="px-3 py-2">
          <h2
            className={cn("mb-2 px-4 text-xs font-semibold text-muted-foreground", {
              "text-center": isCollapsed
            })}
          >
            {isCollapsed ? "Menu" : "Navegação"}
          </h2>
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className={cn(
                "sidebar-item",
                pathname === "/dashboard" && "active"
              )}
            >
              <Home className="h-4 w-4" />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
            <Link
              to="/dashboard/accounts"
              className={cn(
                "sidebar-item",
                pathname.includes("/accounts") && "active"
              )}
            >
              <Instagram className="h-4 w-4" />
              {!isCollapsed && <span>Contas</span>}
            </Link>
            <Link
              to="/dashboard/heating"
              className={cn(
                "sidebar-item",
                pathname.includes("/heating") && "active"
              )}
            >
              <Flame className="h-4 w-4" />
              {!isCollapsed && <span>Aquecimento</span>}
            </Link>
            <Link
              to="/dashboard/scheduler"
              className={cn(
                "sidebar-item",
                pathname.includes("/scheduler") && "active"
              )}
            >
              <Calendar className="h-4 w-4" />
              {!isCollapsed && <span>Agendamento</span>}
            </Link>
            <Link
              to="/dashboard/activity"
              className={cn(
                "sidebar-item",
                pathname.includes("/activity") && "active"
              )}
            >
              <Clock className="h-4 w-4" />
              {!isCollapsed && <span>Atividades</span>}
            </Link>
            <Link
              to="/dashboard/reports"
              className={cn(
                "sidebar-item",
                pathname.includes("/reports") && "active"
              )}
            >
              <BarChart3 className="h-4 w-4" />
              {!isCollapsed && <span>Relatórios</span>}
            </Link>
          </div>

          {user?.role === "admin" && (
            <>
              <h2
                className={cn(
                  "mb-2 mt-6 px-4 text-xs font-semibold text-muted-foreground",
                  { "text-center": isCollapsed }
                )}
              >
                {isCollapsed ? "Admin" : "Administração"}
              </h2>
              <div className="space-y-1">
                <Link
                  to="/dashboard/admin/users"
                  className={cn(
                    "sidebar-item",
                    pathname.includes("/admin/users") && "active"
                  )}
                >
                  <Users className="h-4 w-4" />
                  {!isCollapsed && <span>Usuários</span>}
                </Link>
                <Link
                  to="/dashboard/admin/system"
                  className={cn(
                    "sidebar-item",
                    pathname.includes("/admin/system") && "active"
                  )}
                >
                  <Layout className="h-4 w-4" />
                  {!isCollapsed && <span>Sistema</span>}
                </Link>
                <Link
                  to="/dashboard/admin/logs"
                  className={cn(
                    "sidebar-item",
                    pathname.includes("/admin/logs") && "active"
                  )}
                >
                  <ShieldAlert className="h-4 w-4" />
                  {!isCollapsed && <span>Logs</span>}
                </Link>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
      <div className="mt-auto border-t p-3">
        <div className="flex flex-col gap-2">
          <Link
            to="/dashboard/settings"
            className={cn(
              "sidebar-item",
              pathname.includes("/settings") && "active"
            )}
          >
            <Settings className="h-4 w-4" />
            {!isCollapsed && <span>Configurações</span>}
          </Link>
          <Link
            to="/dashboard/support"
            className={cn(
              "sidebar-item",
              pathname.includes("/support") && "active"
            )}
          >
            <MessagesSquare className="h-4 w-4" />
            {!isCollapsed && <span>Suporte</span>}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="sidebar-item justify-start"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Sair</span>}
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className={cn("flex items-center gap-2", { "w-full justify-center": isCollapsed })}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
