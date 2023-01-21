import { OptionsForm } from "@components/form";
import { PFUploadFormResponse } from "@containers/Portfolio/PFUploadContainer";
import { StackBadge } from "@prisma/client";
import {
  type KeyboardEventHandler,
  type MouseEventHandler,
  useState,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";

type T = PFUploadFormResponse;

interface OptionsFormContainerProps<T> {
  data: T;
  updateFields: (fields: Partial<T>) => void;
}
export const OptionsFormContainer = ({
  data,
  updateFields,
}: OptionsFormContainerProps<T>) => {
  const { register, setValue, getValues } = useForm<T>();
  const [stackBadges, setStackBadges] = useState<
    Pick<StackBadge, "stackName" | "stackColor">[]
  >([]);
  const [deleteBadge, setDeleteBadge] = useState<
    Pick<StackBadge, "stackName" | "stackColor">[]
  >([]);
  const onPushStacks: KeyboardEventHandler<HTMLInputElement> = (stacksForm) => {
    if (stacksForm.key !== "Enter" || !stacksForm.target.value) return;
    const [stack, color] = stacksForm.target.value.split("/");
    if (stackBadges.find((e) => e.stackName === stack)) {
      setValue("stackBadge", []);
      return;
    }
    setStackBadges((prev) => [
      ...prev,
      { stackName: stack, stackColor: color },
    ]);
    updateFields({
      stackBadge: [...data.stackBadge, { stackName: stack, stackColor: color }],
    });
    setValue("stackBadge", []);
  };
  const onStackUpdate: KeyboardEventHandler<HTMLInputElement> = (
    stacksForm
  ) => {
    if (stacksForm.key !== "Enter") return;
  };
  const onDeleteStack: MouseEventHandler<HTMLImageElement> = (e) => {
    const { id } = e.target as HTMLImageElement;
    setStackBadges((prev) => prev.filter((i) => i.stackName !== id));
    setDeleteBadge((prev) => [
      ...prev,
      ...stackBadges.filter((i) => i.stackName === id),
    ]);
    updateFields({
      stackBadge: stackBadges.filter((i) => i.stackName !== id),
      deleteBadge: [
        ...deleteBadge,
        ...stackBadges.filter((i) => i.stackName === id),
      ],
    });
  };
  const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const maxDateFormat = localeFormatter.format(new Date().getTime());
  useEffect(() => {
    if (data.stackBadge) {
      setStackBadges(data.stackBadge);
    }
  }, [data.stackBadge, setValue]);
  return (
    <OptionsForm
      {...data}
      updateFields={updateFields}
      key={"options"}
      getValues={getValues}
      maxDateFormat={maxDateFormat}
      onDeleteStack={onDeleteStack}
      onPushStacks={onPushStacks}
      onStackUpdate={onStackUpdate}
      register={register}
    />
  );
};
