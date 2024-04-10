import { LogoFrame } from "@/components/LogoFrame";
import { PageLayout } from "@/components/PageLayout";
import { LoginForm } from "@/components/LoginForm";
export const Login = () => {
  return (
    <PageLayout>
      <LogoFrame></LogoFrame>
      <LoginForm></LoginForm>
    </PageLayout>
  );
};
