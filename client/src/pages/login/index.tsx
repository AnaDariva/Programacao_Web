import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { AuthenticationResponse, IUserLogin } from "@/commons/types";
import AuthService from "@/services/auth-service";
import { Toast } from "primereact/toast";
import { useAuth } from "@/context/hooks/use-auth";
import { classNames } from "primereact/utils";

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserLogin>({ defaultValues: { username: "", password: "" } });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = AuthService;
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);

  const { handleLogin, authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      const redirectPath = searchParams.get("redirect") || "/";
      navigate(redirectPath, { replace: true });
    }
  }, [authenticated, navigate, searchParams]);

  const onSubmit = async (userLogin: IUserLogin) => {
    setLoading(true);
    try {
      const response = await login(userLogin);
      if (response.status === 200 && response.data) {
        const authenticationResponse = response.data as AuthenticationResponse;
        handleLogin(authenticationResponse);

        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Login efetuado com sucesso.",
          life: 3000,
        });

        const redirectPath = searchParams.get("redirect") || "/";
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 1000);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail:
            response.message ||
            "Falha ao efetuar login. Verifique suas credenciais.",
          life: 3000,
        });
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail:
          error.response?.data?.message ||
          "Falha ao efetuar login. Verifique sua conexão ou credenciais.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen p-4">
      <Toast ref={toast} />
      <Card title="Login" className="w-full sm:w-20rem shadow-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column gap-3"
        >
          <div>
            <label htmlFor="username" className="block mb-2">
              E-mail
            </label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Informe o e-mail",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "E-mail inválido",
                },
              }}
              render={({ field }) => (
                <InputText
                  id="username"
                  {...field}
                  className={classNames("w-full", {
                    "p-invalid": errors.username,
                  })}
                  placeholder="seu.email@exemplo.com"
                />
              )}
            />
            {errors.username && (
              <small className="p-error">{errors.username.message}</small>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">
              Senha
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Informe a senha" }}
              render={({ field }) => (
                <Password
                  id="password"
                  {...field}
                  toggleMask
                  feedback={false}
                  className={classNames("w-full", {
                    "p-invalid": errors.password,
                  })}
                  inputClassName="w-full"
                />
              )}
            />
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>
          <Button
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            className="w-full"
            loading={loading || isSubmitting}
            disabled={loading || isSubmitting}
          />
        </form>
        <div className="text-center mt-3">
          <small>
            Não tem uma conta?{" "}
            <Link to="/register" className="text-primary">
              Criar conta
            </Link>
          </small>
        </div>
      </Card>
    </div>
  );
};
