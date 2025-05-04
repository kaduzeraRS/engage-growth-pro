
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary"
            onClick={() => navigate("/")}
          >
            <span className="text-primary-foreground">SA</span>
          </div>
          <span
            className="text-lg font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            SocialAuto
          </span>
        </div>
        <ThemeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
