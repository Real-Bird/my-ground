import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useMutation from "@libs/client/useMutation";
import useAdmin from "@libs/client/useAdmin";
import ContentForm from "@components/form/contentForm";
import OptionsForm from "@components/form/optionsForm";
import { useMultistepForm } from "@libs/client/useMultisteopForm";
import { cls } from "@libs/client/utils";
import FormWrapper from "@components/form/formWrapper";
import Head from "next/head";
import FormButton from "@components/common/formButton";
import { MyPortfolio, StackBadge } from "@prisma/client";
import useSWR from "swr";

const MarkdownViewer: any = dynamic(
  () => import("@uiw/react-markdown-preview"),
  {
    ssr: false,
  }
);

export interface UploadFormResponse {
  thumbnail: string;
  title: string;
  startDate: string;
  endDate: string;
  github: string;
  deploy: string;
  content: string;
  deployIcon?: string;
  stackBadge: Pick<StackBadge, "stackName" | "stackColor">[];
  deleteBadge?: Pick<StackBadge, "stackName" | "stackColor">[];
}

interface UploadMutateResponse {
  ok: boolean;
  newPFId: number;
}

interface PfwithStack extends MyPortfolio {
  stackBadge: Pick<StackBadge, "stackName" | "stackColor">[];
}

interface PfResponse {
  ok: boolean;
  portfolio: PfwithStack;
}

const Revised: NextPage = () => {
  const { admin, ok } = useAdmin();
  const router = useRouter();
  const { data: oldData } = useSWR<PfResponse>(
    router.query.id ? `/api/portfolio/${router.query.id}` : null
  );
  const [data, setData] = useState<PfwithStack>();
  function updateFields(fields: Partial<UploadFormResponse>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const [revised, { data: mutationData, loading }] =
    useMutation<UploadMutateResponse>(`/api/portfolio/${router.query.id}`);
  const { handleSubmit } = useForm<UploadFormResponse>({
    mode: "onChange",
  });
  const { step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <ContentForm {...data} updateFields={updateFields} key={"content"} />,
    <OptionsForm {...data} updateFields={updateFields} key={"options"} />,
  ]);
  const onValid = (validForm: UploadFormResponse) => {
    if (loading) return;
    if (!isLastStep) {
      (document.activeElement as HTMLElement).blur();
      return next();
    }
    validForm = data;
    revised({ ...validForm });
  };
  const checkKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Enter" && isLastStep) e.preventDefault();
  };
  const onBackClick = () => {
    if (isLastStep) return back();
    router.back();
  };
  useEffect(() => {
    if (oldData && oldData.ok) {
      setData(oldData.portfolio);
    }
  }, [oldData]);
  useEffect(() => {
    if (mutationData && mutationData.ok) {
      router.push(`/portfolio/${router.query.id}`);
    }
  }, [mutationData]);
  return (
    <>
      <Head>
        <title>{`Work || RB's Ground`}</title>
      </Head>
      <FormWrapper
        handleCheckKeyDown={checkKeyDown}
        onSubmit={handleSubmit}
        onValid={onValid}
        isLastStep={isLastStep}
      >
        <div className="flex h-full w-full flex-col">
          <div className={cls("flex h-full w-full flex-col")}>{step}</div>
          <div className={cls("flex h-fit")}>
            <FormButton
              kind="button"
              className="w-1/3 border border-transparent bg-transparent px-4 py-3 text-base font-medium text-amber-500 shadow-sm hover:bg-gray-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              onClick={onBackClick}
              text="⬅"
            />
            <FormButton
              kind="submit"
              className="w-full rounded-none border border-transparent bg-amber-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-600 focus:bg-amber-600 focus:outline-none"
              text={isLastStep ? "업로드" : "다음"}
            />
          </div>
        </div>
        {isFirstStep && (
          <div className="box-border hidden h-full overflow-y-scroll border-2 border-l-[1px] border-gray-300 bg-white p-3 lg:block">
            <MarkdownViewer source={data?.content} />
          </div>
        )}
      </FormWrapper>
    </>
  );
};

export default Revised;
