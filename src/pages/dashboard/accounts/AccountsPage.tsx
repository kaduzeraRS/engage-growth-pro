
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Instagram, Loader2 } from "lucide-react";
import { SocialAccountCard, SocialAccount } from "@/components/accounts/SocialAccountCard";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

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
  },
];

interface AccountFormValues {
  username: string;
  password: string;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(mockSocialAccounts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AccountFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

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

  const onSubmit = (data: AccountFormValues) => {
    setIsLoading(true);
    // Simulando chamada de API para adicionar conta
    setTimeout(() => {
      const newAccount: SocialAccount = {
        id: `${Date.now()}`,
        platform: "instagram",
        username: data.username,
        status: "active",
        lastActive: new Date().toISOString(),
        followers: 0,
        following: 0,
        actions: 0,
      };
      
      setAccounts([...accounts, newAccount]);
      setIsAddDialogOpen(false);
      form.reset();
      setIsLoading(false);
      
      toast({
        title: "Conta adicionada",
        description: `A conta @${data.username} foi adicionada com sucesso.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contas Sociais</h2>
          <p className="text-muted-foreground">
            Gerencie suas contas de redes sociais conectadas
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Conta
        </Button>
      </div>

      <Tabs defaultValue="instagram" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="tiktok" className="flex items-center gap-2" disabled>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.321 5.562a5.124 5.124 0 0 1-.415-.663 5.341 5.341 0 0 1-.53-2.885.398.398 0 0 0-.322-.423 5.856 5.856 0 0 1-.006-.013l-2.38.003a.244.244 0 0 0-.006.02 5.736 5.736 0 0 1-1.5 3.152 5.637 5.637 0 0 1-1.655 1.18v2.726a5.67 5.67 0 0 1 1.033.338 5.675 5.675 0 0 1 2.896 3.042 5.604 5.604 0 0 1 .412 2.12v.251c0 .272.191.446.437.387a6.552 6.552 0 0 0 .691-.18 6.727 6.727 0 0 0 3.948-3.359 6.653 6.653 0 0 0 .9-3.367v-.004h-2.269a.243.243 0 0 0-.006-.007.397.397 0 0 0-.445-.404.393.393 0 0 0-.35.454.241.241 0 0 0 .006.019h.627a5.607 5.607 0 0 1-1.066 2.593zM14.153 11.36a5.607 5.607 0 0 1-2.993 2.175 5.668 5.668 0 0 1-1.678.26h-.252c-.272 0-.446.191-.387.437.107.449.255.879.441 1.288a6.702 6.702 0 0 0 3.939 3.276 6.654 6.654 0 0 0 2.115.345h.004l.003-2.269c.002-.002.004-.004.006-.006a.397.397 0 0 0 .404-.445.393.393 0 0 0-.454-.35c-.006.002-.013.004-.018.006v.627a5.606 5.606 0 0 1-5.097-1.013 5.659 5.659 0 0 1-1.599-2.269c2.179-.019 4.235-.878 5.776-2.414a8.317 8.317 0 0 0 2.43-5.933V4.2h2.339c.003-.002.005-.004.008-.006a.398.398 0 0 0 .445-.404.398.398 0 0 0-.35-.454l-.02-.006h-.683a6.61 6.61 0 0 0-.532-1.097 6.723 6.723 0 0 0-3.276-2.916 6.635 6.635 0 0 0-2.115-.345h-.004l-.003 2.269-.007.007a.393.393 0 0 0-.403.444.396.396 0 0 0 .453.35l.02-.006v-.627a5.641 5.641 0 0 1 3.370 1.13 5.585 5.585 0 0 1 1.657 2.124H11.26a8.318 8.318 0 0 0-1.016 3.998v.251c0 .272.191.446.437.388a5.778 5.778 0 0 0 1.032-.261 5.678 5.678 0 0 0 2.44-1.924z"></path>
            </svg>
            TikTok
          </TabsTrigger>
        </TabsList>
        <TabsContent value="instagram" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contas do Instagram</CardTitle>
              <CardDescription>
                Gerencie suas contas do Instagram conectadas ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {accounts.map((account) => (
                  <SocialAccountCard
                    key={account.id}
                    account={account}
                    onReauthorize={handleReauthorize}
                    onDelete={handleDeleteAccount}
                  />
                ))}
                <Card
                  className="flex h-full cursor-pointer flex-col items-center justify-center border-dashed p-6 text-muted-foreground hover:border-primary hover:text-primary"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="mb-3 h-8 w-8" />
                  <p className="text-center text-lg font-medium">Adicionar Conta</p>
                  <p className="text-center text-sm">
                    Conecte uma nova conta do Instagram
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tiktok">
          <Card>
            <CardHeader>
              <CardTitle>Contas do TikTok</CardTitle>
              <CardDescription>
                Gerencie suas contas do TikTok conectadas ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  className="mb-4 h-16 w-16 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.321 5.562a5.124 5.124 0 0 1-.415-.663 5.341 5.341 0 0 1-.53-2.885.398.398 0 0 0-.322-.423 5.856 5.856 0 0 1-.006-.013l-2.38.003a.244.244 0 0 0-.006.02 5.736 5.736 0 0 1-1.5 3.152 5.637 5.637 0 0 1-1.655 1.18v2.726a5.67 5.67 0 0 1 1.033.338 5.675 5.675 0 0 1 2.896 3.042 5.604 5.604 0 0 1 .412 2.12v.251c0 .272.191.446.437.387a6.552 6.552 0 0 0 .691-.18 6.727 6.727 0 0 0 3.948-3.359 6.653 6.653 0 0 0 .9-3.367v-.004h-2.269a.243.243 0 0 0-.006-.007.397.397 0 0 0-.445-.404.393.393 0 0 0-.35.454.241.241 0 0 0 .006.019h.627a5.607 5.607 0 0 1-1.066 2.593zM14.153 11.36a5.607 5.607 0 0 1-2.993 2.175 5.668 5.668 0 0 1-1.678.26h-.252c-.272 0-.446.191-.387.437.107.449.255.879.441 1.288a6.702 6.702 0 0 0 3.939 3.276 6.654 6.654 0 0 0 2.115.345h.004l.003-2.269c.002-.002.004-.004.006-.006a.397.397 0 0 0 .404-.445.393.393 0 0 0-.454-.35c-.006.002-.013.004-.018.006v.627a5.606 5.606 0 0 1-5.097-1.013 5.659 5.659 0 0 1-1.599-2.269c2.179-.019 4.235-.878 5.776-2.414a8.317 8.317 0 0 0 2.43-5.933V4.2h2.339c.003-.002.005-.004.008-.006a.398.398 0 0 0 .445-.404.398.398 0 0 0-.35-.454l-.02-.006h-.683a6.61 6.61 0 0 0-.532-1.097 6.723 6.723 0 0 0-3.276-2.916 6.635 6.635 0 0 0-2.115-.345h-.004l-.003 2.269-.007.007a.393.393 0 0 0-.403.444.396.396 0 0 0 .453.35l.02-.006v-.627a5.641 5.641 0 0 1 3.37 1.13 5.585 5.585 0 0 1 1.657 2.124H11.26a8.318 8.318 0 0 0-1.016 3.998v.251c0 .272.191.446.437.388a5.778 5.778 0 0 0 1.032-.261 5.678 5.678 0 0 0 2.44-1.924z"></path>
                </svg>
                <p className="mb-2 text-lg font-medium">
                  Suporte ao TikTok em breve
                </p>
                <p className="mb-6 text-center text-sm text-muted-foreground">
                  O suporte para contas do TikTok estará disponível nas próximas atualizações
                </p>
                <Button disabled>Adicionar Conta TikTok</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para adicionar nova conta */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Conta do Instagram</DialogTitle>
            <DialogDescription>
              Entre com suas credenciais do Instagram para conectar sua conta
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-xs text-muted-foreground">
                <p>
                  Suas credenciais são criptografadas e nunca compartilhadas.
                  Utilizamos apenas para automação conforme solicitado.
                </p>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    <>
                      <Instagram className="mr-2 h-4 w-4" />
                      Conectar Conta
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
