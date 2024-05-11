import { LogoFrame } from "@/components/LogoFrame";
import { PageLayout } from "@/components/PageLayout";
import { LoginForm } from "@/components/LoginForm";
import { RequestLoginParams } from "@/types/auth";
import { useState } from "react";
import { postLogin } from "@/apis/login";
import { Navigate } from "react-router-dom";
import { Spinner } from "@/components/common/Spinner";

export const Login = () => {
  const [user, setUser] = useState<RequestLoginParams>({
    username: "",
    password: "",
  });
  const [userStatus, setUserStatus] = useState<boolean>(false);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((cur: RequestLoginParams) => ({
      ...cur,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = () => {
    setLoadingFlag(true);
    postLogin(user)
      .then((response) => {
        setUserStatus(true);
        setLoadingFlag(false);
        localStorage.setItem("key", response.data.key);
      })
      .catch((error) => {
        console.error(error);
        setLoadingFlag(false);
      });
  };

  return loadingFlag ? (
    <Spinner></Spinner>
  ) : (
    <PageLayout>
      {userStatus && <Navigate to={"/"} replace={true}></Navigate>}
      <LogoFrame></LogoFrame>
      <LoginForm onChange={onChange} handleLogin={handleLogin}></LoginForm>
    </PageLayout>
  );
};
