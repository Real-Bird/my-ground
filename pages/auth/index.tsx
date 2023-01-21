import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { User } from "@prisma/client";
import useAdmin from "@libs/client/useAdmin";
import Link from "next/link";
import { LayoutContainer } from "@containers/Common";
import { Input } from "@components/common";
import Button from "@components/common/button";

interface EnterForm {
  email?: string;
  phone?: string;
}

interface MutationResult {
  ok: boolean;
  admin: User;
  error: string;
}

interface LogoutResponse {
  ok: boolean;
}

const Auth = () => {
  const { admin, ok, mutate: adminMutate } = useAdmin();
  const [login, { loading, data }] = useMutation<MutationResult>("/api/admin");
  const [logout, { data: logoutData, loading: logoutLoading }] =
    useMutation<LogoutResponse>("/api/logout");
  const onLogout = () => {
    if (logoutLoading) return;
    logout(null);
    adminMutate(null, false);
  };
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EnterForm>();
  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    login(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push("/");
      reset();
    }
    if (!data?.ok) {
      setError("phone", { message: data?.error });
    }
  }, [data, router, ok]);
  return (
    <LayoutContainer title="Admin">
      <div className="mt-16 flex flex-col space-y-3 px-4">
        <h3 className="text-center text-3xl font-bold">I am Admin</h3>
        {ok ? (
          <div className="mx-3 flex w-36 items-center justify-center">
            <Button text="로그아웃" onClick={onLogout} />
          </div>
        ) : (
          <div className="mx-3">
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-8 flex flex-col space-y-4"
            >
              <Input
                register={register("email", { required: true })}
                name="email"
                label="Admin Identify"
                type="text"
              />
              <Input
                register={register("phone", { required: true })}
                name="phone"
                label="Admin Password"
                type="password"
                error={errors.phone?.message}
              />
              <Button text={loading ? "Loading" : "Get login"} />
            </form>
            <div className="my-3">
              <Link href="/">
                <a>
                  <Button text="No, I don't wanna login. I wish to go home" />
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
};

export default Auth;
