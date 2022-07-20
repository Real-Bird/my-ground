import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "@components/input";
import TextArea from "@components/textarea";
import { cls } from "@libs/client/utils";

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm();
  const onValid = () => {};
  useEffect(() => {}, []);
  return (
    <Layout title="Opinion">
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row justify-between">
          <Input
            register={register("name", { required: true })}
            label="Name"
            name="name"
            type="text"
          />
          <Input
            register={register("Password", { required: true })}
            label="Password"
            name="pwd"
            type="password"
          />
        </div>
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <button className="w-full rounded-md border border-transparent  bg-amber-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Upload your opinion
        </button>
      </form>
    </Layout>
  );
};

export default Upload;
