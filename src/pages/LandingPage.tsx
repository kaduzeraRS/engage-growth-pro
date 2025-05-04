
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Flame,
  Instagram,
  Lock,
  Settings,
  TrendingUp,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-primary-foreground">SA</span>
            </div>
            <span className="text-lg font-bold">SocialAuto</span>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6">
              <li>
                <a href="#features" className="text-sm font-medium hover:text-primary">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm font-medium hover:text-primary">
                  Preços
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm font-medium hover:text-primary">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/register")}>
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Automação de{" "}
              <span className="bg-gradient-to-r from-saas-blue to-saas-purple bg-clip-text text-transparent">
                redes sociais
              </span>{" "}
              que realmente funciona
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Aqueça suas contas, agende postagens e aumente seu engajamento de forma automática, 
              segura e com estratégias aprovadas por profissionais.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" onClick={() => navigate("/register")}>
                Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Ver Demonstração
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <CheckCircle className="mb-2 h-6 w-6 text-saas-green" />
                <h3 className="mb-1 text-lg font-medium">100% Seguro</h3>
                <p className="text-sm text-muted-foreground">
                  Sem riscos para suas contas
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <CheckCircle className="mb-2 h-6 w-6 text-saas-green" />
                <h3 className="mb-1 text-lg font-medium">Resultados reais</h3>
                <p className="text-sm text-muted-foreground">
                  Aumento comprovado de engajamento
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <CheckCircle className="mb-2 h-6 w-6 text-saas-green" />
                <h3 className="mb-1 text-lg font-medium">Suporte Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Ajuda e orientação sempre disponíveis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Recursos Principais
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              Tudo o que você precisa para gerenciar e crescer suas redes sociais em um só lugar
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Aquecimento de Contas</h3>
              <p className="text-muted-foreground">
                Mantenha suas contas saudáveis com interações automáticas
                personalizadas que simulam comportamento humano.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Agendamento de Posts</h3>
              <p className="text-muted-foreground">
                Planeje e agende suas postagens com antecedência, mantendo
                consistência mesmo quando você estiver ocupado.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Análise de Desempenho</h3>
              <p className="text-muted-foreground">
                Acompanhe o crescimento de suas contas com relatórios detalhados
                e métricas em tempo real.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Instagram className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Multi-plataformas</h3>
              <p className="text-muted-foreground">
                Gerencie suas contas do Instagram e TikTok em uma interface
                unificada e intuitiva.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Personalização Avançada</h3>
              <p className="text-muted-foreground">
                Configure cada aspecto da automação com controles granulares e
                perfis personalizados.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Segurança Garantida</h3>
              <p className="text-muted-foreground">
                Proteção avançada para suas credenciais e limites inteligentes
                para evitar bloqueios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Planos e Preços
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              Escolha o plano ideal para suas necessidades de crescimento
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Basic Plan */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Básico</h3>
                <p className="text-muted-foreground">Para usuários iniciantes</p>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 97</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>1 conta em cada plataforma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Aquecimento de contas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>30 posts agendados por mês</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Relatórios básicos</span>
                </li>
              </ul>
              <Button className="w-full">Selecionar Plano</Button>
            </div>

            {/* Pro Plan */}
            <div className="rounded-xl border-2 border-primary bg-background p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Profissional</h3>
                <p className="text-muted-foreground">Para criadores de conteúdo</p>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 197</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>5 contas em cada plataforma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Aquecimento avançado</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100 posts agendados por mês</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Relatórios detalhados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <Button className="w-full">Selecionar Plano</Button>
            </div>

            {/* Agency Plan */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Agência</h3>
                <p className="text-muted-foreground">Para equipes e agências</p>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 497</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>20 contas em cada plataforma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Aquecimento premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Posts ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Gerenciamento de clientes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Acesso API e white label</span>
                </li>
              </ul>
              <Button className="w-full">Selecionar Plano</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-muted py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Perguntas Frequentes
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              Respostas para as dúvidas mais comuns sobre nossa plataforma
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">É seguro para minhas contas?</h3>
                <p className="mt-2 text-muted-foreground">
                  Sim, nosso sistema utiliza limites seguros e simula comportamento humano para
                  evitar qualquer tipo de bloqueio ou suspensão das suas contas.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">Como o aquecimento de contas funciona?</h3>
                <p className="mt-2 text-muted-foreground">
                  O sistema realiza interações automáticas (curtidas, comentários e follows) em
                  contas relevantes do seu nicho, respeitando limites diários seguros.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">Posso cancelar minha assinatura?</h3>
                <p className="mt-2 text-muted-foreground">
                  Sim, você pode cancelar sua assinatura a qualquer momento através do painel de
                  controle. Não há taxas de cancelamento ou período mínimo de contrato.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">Preciso dar minha senha das redes sociais?</h3>
                <p className="mt-2 text-muted-foreground">
                  Sim, mas suas credenciais são criptografadas e nunca acessadas por humanos.
                  Utilizamos os padrões mais rigorosos de segurança para proteger seus dados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-saas-blue to-saas-purple p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Pronto para crescer nas redes sociais?
            </h2>
            <p className="mb-8 text-lg">
              Junte-se a milhares de usuários que estão impulsionando suas contas com automação inteligente
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate("/register")}
            >
              Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <span className="text-primary-foreground">SA</span>
              </div>
              <span className="text-lg font-bold">SocialAuto</span>
            </div>
            <div className="flex flex-wrap gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Preços
              </a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Termos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacidade
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SocialAuto. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
