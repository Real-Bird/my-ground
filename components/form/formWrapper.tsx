import type { UseFormHandleSubmit } from "react-hook-form";
import type { KeyboardEvent, ReactNode } from "react";
import { cls } from "@libs/client/utils";
import { UploadFormResponse } from "pages/portfolio/upload";

export type StackBadge = {
  stack: string;
  color: string;
};

interface FormWrapperProps {
  children: ReactNode;
  handleCheckKeyDown: (e: KeyboardEvent) => void;
  onSubmit: UseFormHandleSubmit<UploadFormResponse>;
  onValid: (validForm: UploadFormResponse) => void;
  isLastStep: boolean;
}

const FormWrapper = ({
  children,
  handleCheckKeyDown,
  onSubmit,
  onValid,
  isLastStep,
}: FormWrapperProps) => {
  return (
    <>
      <form
        className={cls(
          isLastStep ? "md:max-w-6xl" : "flex flex-col md:grid md:grid-cols-2",
          "h-screen w-full"
        )}
        onSubmit={onSubmit(onValid)}
        onKeyDown={(e) => handleCheckKeyDown(e)}
      >
        {children}
      </form>
    </>
  );
};

export default FormWrapper;
