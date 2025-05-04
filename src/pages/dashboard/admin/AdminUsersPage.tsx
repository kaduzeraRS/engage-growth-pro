
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dados de exemplo para usuários
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "contatokadueduardo@gmail.com",
    role: "admin",
    status: "active",
    plan: "lifetime",
    created: "2023-01-15",
    lastLogin: "2023-05-04",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    plan: "monthly",
    created: "2023-02-22",
    lastLogin: "2023-05-01",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "power_user",
    status: "active",
    plan: "yearly",
    created: "2023-03-10",
    lastLogin: "2023-04-28",
  },
  {
    id: "4",
    name: "Agency Corp",
    email: "agency@example.com",
    role: "agency",
    status: "active",
    plan: "yearly",
    created: "2023-01-05",
    lastLogin: "2023-05-03",
  },
  {
    id: "5",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
    plan: "free",
    created: "2023-04-05",
    lastLogin: "2023-04-10",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole as any } : user
      )
    );
    toast({
      title: "Função alterada",
      description: `Função atualizada para ${newRole}`,
    });
  };

  const handleStatusToggle = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
    
    const user = users.find((u) => u.id === userId);
    const newStatus = user?.status === "active" ? "inactive" : "active";
    
    toast({
      title: `Usuário ${newStatus === "active" ? "ativado" : "desativado"}`,
      description: `O status de ${user?.name} foi alterado para ${newStatus}`,
    });
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500 hover:bg-red-600";
      case "agency":
        return "bg-purple-500 hover:bg-purple-600";
      case "power_user":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "agency":
        return "Agência";
      case "power_user":
        return "Power User";
      default:
        return "Usuário";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gerenciar Usuários</h2>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os usuários do sistema
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar usuários..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Exportar</Button>
        <Button>Adicionar Usuário</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Último login</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getRoleBadgeStyle(user.role)}
                  >
                    {getRoleLabel(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "default" : "outline"}
                    className={
                      user.status === "active"
                        ? "bg-green-500 hover:bg-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    {user.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {user.plan === "monthly"
                      ? "Mensal"
                      : user.plan === "yearly"
                      ? "Anual"
                      : user.plan === "lifetime"
                      ? "Vitalício"
                      : "Gratuito"}
                  </Badge>
                </TableCell>
                <TableCell>{user.created}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        {user.status === "active"
                          ? "Desativar usuário"
                          : "Ativar usuário"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleChange(user.id, "user")}
                      >
                        Definir como Usuário
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleChange(user.id, "power_user")}
                      >
                        Definir como Power User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleChange(user.id, "agency")}
                      >
                        Definir como Agência
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleChange(user.id, "admin")}
                      >
                        Definir como Admin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
