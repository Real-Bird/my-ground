import { useForm } from "react-hook-form";
import { KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useMutation from "@libs/client/useMutation";
import { useMultistepForm } from "@libs/client/useMultisteopForm";
import { cls } from "@libs/client/utils";
import { FormWrapper } from "@components/form";
import { MyPortfolio, StackBadge } from "@prisma/client";
import { FormButton } from "@components/common";
import { ContentFormContainer } from "@containers/Common/ContentFormContainer";
import { OptionsFormContainer } from "@containers/Common/OptionsFormContainer";
import useSWR from "swr";

const MarkdownViewer = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

export interface PFUploadFormResponse {
  thumbnail: string;
  title: string;
  startDate: string;
  endDate: string;
  github: string;
  deploy?: string;
  content: string;
  deployIcon?: string;
  stackBadge: Pick<StackBadge, "stackName" | "stackColor">[];
  deleteBadge?: Pick<StackBadge, "stackName" | "stackColor">[];
}

interface PFUploadMutateResponse {
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

const INITIAL_DATA: PFUploadFormResponse = {
  thumbnail: "",
  title: "",
  startDate: "",
  endDate: "",
  github: "",
  deploy: "",
  content: "",
  deployIcon: "",
  stackBadge: [],
};

const PortfolioUploadContainer = () => {
  const router = useRouter();
  const { data: oldData } = useSWR<PfResponse>(
    router.query.id ? `/api/portfolio/${router.query.id}` : null
  );
  const [data, setData] = useState(INITIAL_DATA);
  const [upload, { data: mutationData, loading }] =
    useMutation<PFUploadMutateResponse>(
      router.query.id ? `/api/portfolio/${router.query.id}` : `/api/portfolio`
    );
  const { handleSubmit } = useForm<PFUploadFormResponse>({
    mode: "onChange",
  });
  function updateFields(fields: Partial<PFUploadFormResponse>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <ContentFormContainer
      data={data}
      updateFields={updateFields}
      key={"content"}
    />,
    <OptionsFormContainer
      data={data}
      updateFields={updateFields}
      key={"options"}
    />,
  ]);
  const onValid = (validForm: PFUploadFormResponse) => {
    if (loading) return;
    if (!isLastStep) {
      (document.activeElement as HTMLElement).blur();
      return next();
    }
    validForm = data;
    upload({ ...validForm });
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
    if (mutationData && mutationData?.ok) {
      router.push(
        router.query.id
          ? `/portfolio/${router.query.id}`
          : `/portfolio/${mutationData.newPFId}`
      );
    }
  }, [mutationData]);
  return (
    <FormWrapper
      title="PF Upload"
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
        <div
          className="box-border hidden h-screen overflow-y-scroll border-2 border-l-[1px] border-gray-300 bg-white px-2 py-3 lg:block"
          data-color-mode="light"
        >
          <MarkdownViewer
            source={data.content}
            wrapperElement={{ "data-color-mode": "light" }}
          />
        </div>
      )}
    </FormWrapper>
  );
};

export default PortfolioUploadContainer;
