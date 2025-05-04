
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface SocialAccount {
  id: string;
  platform: "instagram" | "tiktok";
  username: string;
  status: "active" | "expired" | "error";
  lastActive?: string;
  followers?: number;
  following?: number;
  actions?: number;
  avatar?: string;
}

interface SocialAccountCardProps {
  account: SocialAccount;
  onReauthorize: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SocialAccountCard({
  account,
  onReauthorize,
  onDelete,
}: SocialAccountCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleReauthorize = () => {
    setIsLoading(true);
    // Simulando uma chamada à API
    setTimeout(() => {
      onReauthorize(account.id);
      toast({
        title: "Reautorização solicitada",
        description: `A conta @${account.username} está sendo reautorizada.`,
      });
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: SocialAccount["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "expired":
        return "bg-amber-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: SocialAccount["status"]) => {
    switch (status) {
      case "active":
        return "Ativa";
      case "expired":
        return "Expirada";
      case "error":
        return "Erro";
      default:
        return "Desconhecido";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div
        className={cn(
          "h-1",
          getStatusColor(account.status)
        )}
      />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {account.platform === "instagram" && <Instagram className="h-4 w-4 text-saas-pink" />}
            <CardTitle className="text-base">@{account.username}</CardTitle>
          </div>
          <Badge
            variant={account.status === "active" ? "default" : "outline"}
            className={cn(
              account.status === "active" && "bg-green-500",
              account.status === "expired" && "text-amber-500",
              account.status === "error" && "text-red-500"
            )}
          >
            {getStatusLabel(account.status)}
          </Badge>
        </div>
        <CardDescription>
          {account.lastActive
            ? `Última atividade em ${new Date(account.lastActive).toLocaleDateString()}`
            : "Sem atividades recentes"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between text-sm">
          <div>
            <div className="font-medium">{account.followers ?? 0}</div>
            <div className="text-muted-foreground">Seguidores</div>
          </div>
          <div>
            <div className="font-medium">{account.following ?? 0}</div>
            <div className="text-muted-foreground">Seguindo</div>
          </div>
          <div>
            <div className="font-medium">{account.actions ?? 0}</div>
            <div className="text-muted-foreground">Ações</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <Button variant="outline" size="sm" onClick={() => onDelete(account.id)}>
          Remover
        </Button>
        <Button
          variant={account.status === "active" ? "outline" : "default"}
          size="sm"
          disabled={isLoading || account.status === "active"}
          onClick={handleReauthorize}
        >
          {isLoading ? "Processando..." : "Reautorizar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
