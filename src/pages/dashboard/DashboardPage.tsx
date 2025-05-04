
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  ChevronRight,
  Clock,
  Flame,
  Instagram,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { SocialAccountCard, SocialAccount } from "@/components/accounts/SocialAccountCard";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Dados de exemplo
const mockSocialAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "instagram",
    username: "exemplo_conta",
    status: "active",
    lastActive: "2023-05-10T14:30:00Z",
    followers: 1245,
    following: 865,
    actions: 78,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    platform: "instagram",
    username: "marketing_digital",
    status: "expired",
    lastActive: "2023-05-01T10:15:00Z",
    followers: 5432,
    following: 1023,
    actions: 120,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
];

const recentActivities = [
  {
    id: "1",
    type: "post",
    account: "exemplo_conta",
    time: "Hoje, 14:30",
    status: "success",
    description: "Post agendado publicado",
  },
  {
    id: "2",
    type: "heating",
    account: "marketing_digital",
    time: "Hoje, 12:15",
    status: "pending",
    description: "Aquecimento em andamento",
  },
  {
    id: "3",
    type: "error",
    account: "marketing_digital",
    time: "Ontem, 18:45",
    status: "error",
    description: "Falha ao autenticar conta",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<SocialAccount[]>(mockSocialAccounts);

  const handleReauthorize = (id: string) => {
    // Simulação de reautorização
    console.log("Reautorizando conta", id);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id));
    toast({
      title: "Conta removida",
      description: "A conta foi removida com sucesso.",
    });
  };

  const handleAddAccount = () => {
    toast({
      title: "Adicionar nova conta",
      description: "Este recurso será implementado em breve.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Bem-vindo(a), {user?.name}! Aqui está o resumo das suas contas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddAccount}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Conta
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Contas"
          value="2"
          icon={Instagram}
          description="Contas conectadas"
        />
        <StatCard
          title="Seguidores"
          value="6,677"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          description="nos últimos 30 dias"
        />
        <StatCard
          title="Posts Agendados"
          value="8"
          icon={Calendar}
          description="para os próximos 7 dias"
        />
        <StatCard
          title="Ações Automáticas"
          value="198"
          icon={Flame}
          trend={{ value: 8, isPositive: true }}
          description="na última semana"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-4">
          <Tabs defaultValue="accounts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="accounts">Contas</TabsTrigger>
              <TabsTrigger value="scheduled">Posts Agendados</TabsTrigger>
              <TabsTrigger value="heating">Aquecimento</TabsTrigger>
            </TabsList>
            <TabsContent value="accounts" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {accounts.map((account) => (
                  <SocialAccountCard
                    key={account.id}
                    account={account}
                    onReauthorize={handleReauthorize}
                    onDelete={handleDeleteAccount}
                  />
                ))}
                <Card className="flex h-full cursor-pointer flex-col items-center justify-center border-dashed p-6 text-muted-foreground hover:border-primary hover:text-primary">
                  <Plus className="mb-3 h-8 w-8" />
                  <p className="text-lg font-medium">Adicionar Conta</p>
                  <p className="text-sm">Conecte uma conta do Instagram ou TikTok</p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="scheduled">
              <Card>
                <CardHeader>
                  <CardTitle>Posts Agendados</CardTitle>
                  <CardDescription>
                    Gerencie suas postagens futuras em suas contas
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Calendar className="mb-4 h-16 w-16 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">Nenhum post agendado</p>
                  <p className="mb-6 text-center text-sm text-muted-foreground">
                    Comece a agendar posts para publicação automática
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agendar Post
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="heating">
              <Card>
                <CardHeader>
                  <CardTitle>Aquecimento de Contas</CardTitle>
                  <CardDescription>
                    Configure o aquecimento automático para suas contas
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Flame className="mb-4 h-16 w-16 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">
                    Configuração de Aquecimento
                  </p>
                  <p className="mb-6 text-center text-sm text-muted-foreground">
                    Defina as configurações de aquecimento para suas contas
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Configurar Aquecimento
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Atividades Recentes</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver tudo <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full 
                      ${activity.status === 'success' ? 'bg-green-100 text-green-600' : 
                        activity.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                        'bg-red-100 text-red-600'}`}
                    >
                      {activity.type === "post" ? (
                        <Calendar className="h-5 w-5" />
                      ) : activity.type === "heating" ? (
                        <Flame className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">@{activity.account}</p>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Métricas de Desempenho</CardTitle>
              <CardDescription>
                Crescimento dos últimos 30 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center flex-col">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Integração de gráficos em breve
                </p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">Seguidores</p>
                  <p className="text-lg font-bold">+421</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>12%</span>
                  </div>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">Curtidas</p>
                  <p className="text-lg font-bold">+1,852</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>8%</span>
                  </div>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">Comentários</p>
                  <p className="text-lg font-bold">+234</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
