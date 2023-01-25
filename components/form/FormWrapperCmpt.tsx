import type { UseFormHandleSubmit } from "react-hook-form";
import type { ReactNode } from "react";
import { cls } from "@libs/client/utils";
import Head from "next/head";
import { PFUploadFormResponse } from "@containers/Portfolio/PFUploadContainer";

interface FormWrapperProps {
  children: ReactNode;
  onSubmit: UseFormHandleSubmit<PFUploadFormResponse>;
  onValid: (validForm: PFUploadFormResponse) => void;
  isLastStep: boolean;
  title: string;
}

export const FormWrapper = ({
  children,
  onSubmit,
  onValid,
  isLastStep,
  title,
}: FormWrapperProps) => {
  return (
    <>
      <Head>
        <title>{`${title} || RB's Ground`}</title>
      </Head>
      <form
        className={cls(
          isLastStep ? "md:max-w-6xl" : "flex flex-col md:grid md:grid-cols-2",
          "h-screen w-full"
        )}
        onSubmit={onSubmit(onValid)}
        onKeyDown={(e) => {
          if (e.code === "Enter" && isLastStep) e.preventDefault();
        }}
      >
        {children}
      </form>
    </>
  );
};
