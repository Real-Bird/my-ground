import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { User } from "@prisma/client";
import Button from "@components/buttonComponent";
import useAdmin from "@libs/client/useAdmin";
import Link from "next/link";

interface EnterForm {
  email?: string;
  phone?: string;
}

interface MutationResult {
  ok: boolean;
  admin: User;
  error: string;
}

const Login = () => {
  const { admin, ok } = useAdmin();
  const [login, { loading, data }] = useMutation<MutationResult>("/api/admin");
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
    if (data?.ok || ok) {
      router.push("/");
      reset();
    }
    if (!data?.ok) {
      setError("phone", { message: data?.error });
    }
  }, [data, router, ok]);
  return (
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
  );
};

export default Login;
