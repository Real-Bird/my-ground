import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";
import Head from "next/head";
import { User } from "@prisma/client";
import Button from "@components/button-component";
import useAdmin from "@libs/client/useAdmin";
import Link from "next/link";

interface EnterForm {
  email?: string;
  phone?: string;
}

interface MutationResult {
  ok: boolean;
  admin: User;
}

const Login: NextPage = () => {
  const { admin } = useAdmin();
  const [login, { loading, data, error }] =
    useMutation<MutationResult>("/api/admin");
  const { register, reset, handleSubmit } = useForm<EnterForm>();
  const onValid = (validForm: EnterForm) => {
    login(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok || admin) {
      router.push("/");
    }
  }, [data, router, admin]);
  return (
    <div className="mt-16 px-4">
      <Head>
        <title>Log in</title>
      </Head>
      <h3 className="text-center text-3xl font-bold">I am Admin</h3>
      <div className="mt-8">
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
    </div>
  );
};

export default Login;
