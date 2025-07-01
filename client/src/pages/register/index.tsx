import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Link, useNavigate } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import type { IUserRegister } from "@/commons/types"; // Importar com 'type'
import AuthService from "@/services/auth-service";
import { Toast } from "primereact/toast";

export const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserRegister>({
    defaultValues: { username: "", password: "", displayName: "" },
  });
  const { signup } = AuthService;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const onSubmit = async (data: IUserRegister) => {
    setLoading(true);
    try {
      const response = await signup(data);
      if (response.status === 200 && response.data) {
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Usuário cadastrado com sucesso. Faça login para continuar.",
          life: 3000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail:
            response.message || "Falha ao cadastrar usuário. Tente novamente.",
          life: 3000,
        });
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail:
          error.response?.data?.message ||
          "Ocorreu um erro ao tentar cadastrar. Verifique sua conexão.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <Toast ref={toast} />
      <Card title="Registrar Conta" className="w-full sm:w-20rem shadow-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column gap-3"
        >
          <div>
            <label htmlFor="displayName" className="block mb-2">
              Nome de Exibição
            </label>
            <Controller
              name="displayName"
              control={control}
              rules={{ required: "Nome de exibição é obrigatório" }}
              render={({ field }) => (
                <InputText
                  id="displayName"
                  {...field}
                  className={classNames("w-full", {
                    "p-invalid": errors.displayName,
                  })}
                  placeholder="Seu Nome Completo ou Apelido"
                />
              )}
            />
            {errors.displayName && (
              <small className="p-error">{errors.displayName.message}</small>
            )}
          </div>
          <div>
            <label htmlFor="username" className="block mb-2">
              E-mail
            </label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: "E-mail é obrigatório",
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
              rules={{
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                  message:
                    "A senha deve conter ao menos uma letra maiúscula, uma minúscula e um número.",
                },
              }}
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
            label="Registrar"
            loading={loading || isSubmitting}
            disabled={loading || isSubmitting}
            className="w-full mt-3"
          />
          <div className="text-center mt-3">
            <small>
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary">
                Fazer login
              </Link>
            </small>
          </div>
        </form>
      </Card>
    </div>
  );
};
