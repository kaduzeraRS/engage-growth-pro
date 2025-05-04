
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Flame, Instagram, Loader2, Target, Thermometer, UserCheck } from "lucide-react";

// Contas mockadas
const mockAccounts = [
  {
    id: "1",
    username: "exemplo_conta",
    platform: "instagram",
  },
  {
    id: "2",
    username: "marketing_digital",
    platform: "instagram",
  },
];

interface HeatingFormValues {
  account: string;
  targetAccount: string;
  mode: "light" | "medium" | "intense";
  likesPerDay: number;
  commentsPerDay: number;
  followsPerDay: number;
  unfollowsPerDay: number;
  commentTemplates: string;
  enablePrePost: boolean;
  enablePostPost: boolean;
  prePostTime: number;
  postPostTime: number;
}

export default function HeatingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<HeatingFormValues>({
    defaultValues: {
      account: "",
      targetAccount: "",
      mode: "light",
      likesPerDay: 40,
      commentsPerDay: 10,
      followsPerDay: 20,
      unfollowsPerDay: 15,
      commentTemplates: "Incrível! 🔥\nAdorei o conteúdo! 👏\nMuito bom! 😍",
      enablePrePost: true,
      enablePostPost: true,
      prePostTime: 30,
      postPostTime: 60,
    },
  });

  const onSubmit = (data: HeatingFormValues) => {
    setIsSubmitting(true);
    
    // Simulando chamada de API
    setTimeout(() => {
      console.log(data);
      toast({
        title: "Configuração salva",
        description: "Suas configurações de aquecimento foram salvas com sucesso.",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleReset = () => {
    form.reset();
    toast({
      title: "Configurações resetadas",
      description: "As configurações foram redefinidas para os valores padrão.",
    });
  };

  const handlePresetChange = (preset: string) => {
    switch (preset) {
      case "light":
        form.setValue("likesPerDay", 25);
        form.setValue("commentsPerDay", 5);
        form.setValue("followsPerDay", 10);
        form.setValue("unfollowsPerDay", 10);
        break;
      case "medium":
        form.setValue("likesPerDay", 40);
        form.setValue("commentsPerDay", 10);
        form.setValue("followsPerDay", 20);
        form.setValue("unfollowsPerDay", 15);
        break;
      case "intense":
        form.setValue("likesPerDay", 60);
        form.setValue("commentsPerDay", 20);
        form.setValue("followsPerDay", 30);
        form.setValue("unfollowsPerDay", 25);
        break;
    }
    form.setValue("mode", preset as any);
    
    toast({
      title: "Preset aplicado",
      description: `Configurações definidas para modo ${
        preset === "light" ? "Leve" : preset === "medium" ? "Médio" : "Intenso"
      }`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Aquecimento de Contas</h2>
          <p className="text-muted-foreground">
            Configure o comportamento de aquecimento para suas contas sociais
          </p>
        </div>
      </div>

      <Tabs defaultValue="config" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="targets" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Alvos
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>Configurar Aquecimento</CardTitle>
              <CardDescription>
                Defina os parâmetros de aquecimento para suas contas sociais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="account"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conta a aquecer</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma conta" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  <div className="flex items-center gap-2">
                                    <Instagram className="h-4 w-4" />
                                    @{account.username}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="targetAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Perfil alvo para análise</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">@</span>
                              <Input placeholder="perfil.exemplo" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Perfil para extrair seguidores-alvo
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 text-lg font-medium">Presets de Aquecimento</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div
                        className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                          form.watch("mode") === "light"
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handlePresetChange("light")}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Leve</h4>
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Interações leves para contas novas ou mais sensíveis
                        </p>
                      </div>
                      
                      <div
                        className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                          form.watch("mode") === "medium"
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handlePresetChange("medium")}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Médio</h4>
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Equilíbrio entre segurança e resultados (recomendado)
                        </p>
                      </div>
                      
                      <div
                        className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                          form.watch("mode") === "intense"
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handlePresetChange("intense")}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Intenso</h4>
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Máximo de interações para crescimento acelerado
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Limites de Ações Diárias</h3>
                    
                    <FormField
                      control={form.control}
                      name="likesPerDay"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Curtidas por dia</FormLabel>
                            <span className="text-sm">{field.value}</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              defaultValue={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Número máximo de curtidas por dia
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="commentsPerDay"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Comentários por dia</FormLabel>
                            <span className="text-sm">{field.value}</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={50}
                              step={1}
                              defaultValue={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Número máximo de comentários por dia
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="followsPerDay"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Seguir por dia</FormLabel>
                            <span className="text-sm">{field.value}</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={80}
                              step={1}
                              defaultValue={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Número máximo de perfis para seguir por dia
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="unfollowsPerDay"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Deixar de seguir por dia</FormLabel>
                            <span className="text-sm">{field.value}</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={80}
                              step={1}
                              defaultValue={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Número máximo de perfis para deixar de seguir por dia
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="commentTemplates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Templates de comentários</FormLabel>
                        <FormControl>
                          <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Um comentário por linha"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Digite um comentário por linha. Serão selecionados aleatoriamente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="rounded-lg border p-4 space-y-4">
                    <h3 className="text-lg font-medium">Configuração de postagens</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="pre-post">Aquecimento pré-postagem</Label>
                        <p className="text-sm text-muted-foreground">
                          Realizar interações antes da publicação
                        </p>
                      </div>
                      <FormField
                        control={form.control}
                        name="enablePrePost"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                id="pre-post"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {form.watch("enablePrePost") && (
                      <FormField
                        control={form.control}
                        name="prePostTime"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Minutos antes da postagem</FormLabel>
                              <span className="text-sm">{field.value} min</span>
                            </div>
                            <FormControl>
                              <Slider
                                min={5}
                                max={120}
                                step={5}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="post-post">Aquecimento pós-postagem</Label>
                        <p className="text-sm text-muted-foreground">
                          Realizar interações após a publicação
                        </p>
                      </div>
                      <FormField
                        control={form.control}
                        name="enablePostPost"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                id="post-post"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {form.watch("enablePostPost") && (
                      <FormField
                        control={form.control}
                        name="postPostTime"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Minutos após a postagem</FormLabel>
                              <span className="text-sm">{field.value} min</span>
                            </div>
                            <FormControl>
                              <Slider
                                min={5}
                                max={120}
                                step={5}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <Button type="button" variant="outline" onClick={handleReset}>
                      Redefinir
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Flame className="mr-2 h-4 w-4" />
                          Salvar Configuração
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="targets">
          <Card>
            <CardHeader>
              <CardTitle>Público-alvo</CardTitle>
              <CardDescription>
                Gerencie os perfis e hashtags alvo para suas interações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <Target className="mb-4 h-16 w-16 text-muted-foreground" />
                <p className="mb-2 text-lg font-medium">
                  Definir alvos para interações
                </p>
                <p className="mb-6 text-center text-sm text-muted-foreground">
                  Configure os perfis e hashtags que serão utilizados para encontrar conteúdo e usuários para interagir
                </p>
                <Button>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Coletar Seguidores Alvo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Aquecimento</CardTitle>
              <CardDescription>
                Visualize o histórico de atividades de aquecimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <Flame className="mb-4 h-16 w-16 text-muted-foreground" />
                <p className="mb-2 text-lg font-medium">
                  Sem histórico de aquecimento
                </p>
                <p className="mb-6 text-center text-sm text-muted-foreground">
                  Configure e inicie o aquecimento para visualizar o histórico de atividades
                </p>
                <Button>
                  Configurar Aquecimento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
