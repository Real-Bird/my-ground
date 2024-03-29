import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { MyPortfolio, StackBadge } from "@prisma/client";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { FormWrapper, FormButton } from "@components/form";
import { ContentFormContainer, OptionsFormContainer } from "@containers/Common";
import useMutation from "@libs/client/useMutation";
import { useMultistepForm } from "@libs/client/useMultisteopForm";
import { cls } from "@libs/client/utils";
import "@uiw/react-markdown-preview/markdown.css";
import { ThemeContext } from "@libs/client/context";

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
  const { theme } = useContext(ThemeContext);

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
      onSubmit={handleSubmit}
      onValid={onValid}
      isLastStep={isLastStep}
    >
      <div className="flex h-full w-full flex-col">
        <div className={cls("flex h-full w-full flex-col")}>{step}</div>
        <div className={cls("flex h-fit")}>
          <FormButton
            kind="button"
            className="focus:ring-offset-2dark:border-transparent w-1/3 border border-transparent bg-transparent px-4 py-3 text-base font-medium text-amber-500 shadow-sm hover:bg-gray-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-amber-500 dark:text-slate-800 dark:hover:bg-amber-600"
            onClick={onBackClick}
            text="⬅"
          />
          <FormButton
            kind="submit"
            className="w-full rounded-none border border-transparent bg-amber-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-600 focus:bg-amber-600 focus:outline-none dark:border-transparent dark:bg-slate-800 dark:hover:bg-slate-700"
            text={isLastStep ? "업로드" : "다음"}
          />
        </div>
      </div>
      {isFirstStep && (
        <div
          className="box-border hidden h-screen overflow-y-scroll border-2 border-l-[1px] border-gray-300 bg-white px-2 py-3 dark:border-transparent dark:bg-slate-600 lg:block"
          data-color-mode={theme}
        >
          <MarkdownViewer
            source={data.content}
            wrapperElement={{ "data-color-mode": theme }}
            style={{
              backgroundColor: theme === "light" ? "#cbd5e1" : "#475569",
            }}
          />
        </div>
      )}
    </FormWrapper>
  );
};

export default PortfolioUploadContainer;
