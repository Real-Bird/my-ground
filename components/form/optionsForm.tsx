import FloatingInput from "@components/common/floatingInput";
import Input from "@components/common/input";
import { StackBadge } from "pages/test-form";
import {
  type KeyboardEventHandler,
  useState,
  MouseEventHandler,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  MouseEvent,
} from "react";
import { useForm } from "react-hook-form";

interface OptionsData {
  thumbnail: string;
  startDate: string;
  endDate: string;
  github: string;
  deploy?: string;
  deployIcon?: string;
  stacks: StackBadge[];
}

interface OptionsFormProps extends OptionsData {
  updateFields: (fields: Partial<OptionsData>) => void;
}

const OptionsForm = ({
  thumbnail,
  deploy,
  endDate,
  github,
  stacks,
  startDate,
  updateFields,
  deployIcon,
}: OptionsFormProps) => {
  const { register, setValue, getValues } = useForm<OptionsData>();
  const [stackBadges, setStackBadges] = useState<StackBadge[]>([]);
  const onPushStacks: KeyboardEventHandler<HTMLInputElement> = (stacksForm) => {
    if (stacksForm.key !== "Enter" || !stacksForm.target.value) return;
    const [stack, color] = stacksForm.target.value.split("/");
    if (stackBadges.find((e) => e.stack === stack)) {
      setValue("stacks", []);
      return;
    }
    setStackBadges((prev) => {
      return [...prev, { stack, color }];
    });
    updateFields({ stacks: [...stacks, { stack, color }] });
    setValue("stacks", []);
  };
  const onStackUpdate: KeyboardEventHandler<HTMLInputElement> = (
    stacksForm
  ) => {
    if (stacksForm.key !== "Enter") return;
  };
  const onDeleteStack: MouseEventHandler<HTMLImageElement> = (e) => {
    const { id } = e.target as HTMLImageElement;
    setStackBadges((prev) => prev.filter((i) => i.stack !== id));
    updateFields({ stacks: stacks.filter((i) => i.stack !== id) });
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-3 px-3 md:grid md:grid-cols-2 md:gap-5">
      <div className="flex w-full flex-col justify-center md:space-y-6 lg:h-4/5">
        <div className="h-64 w-full overflow-clip bg-teal-200">
          {getValues("thumbnail") && (
            <img
              src={getValues("thumbnail")}
              alt="thumbnail"
              className="my-0 mx-auto"
            />
          )}
        </div>
        <FloatingInput
          register={register("thumbnail", {
            required: true,
            onChange: (e) => updateFields({ thumbnail: e.target.value }),
            value: thumbnail,
          })}
          label="Thumbnail"
          name="thumbnail"
          type="url"
        />
        <FloatingInput
          register={register("github", {
            required: true,
            onChange: (e) => updateFields({ github: e.target.value }),
            value: github,
          })}
          label="Github"
          name="github"
          type="text"
        />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Input
            register={register("startDate", {
              required: true,
              onChange: (e) => updateFields({ startDate: e.target.value }),
              value: startDate,
            })}
            label="Development Start"
            name="startDate"
            type="date"
          />
          <Input
            register={register("endDate", {
              required: true,
              onChange: (e) => updateFields({ endDate: e.target.value }),
              value: endDate,
            })}
            label="Development End"
            name="endDate"
            type="date"
          />
        </div>
        <Input
          register={register("deploy", {
            onChange: (e) => updateFields({ deploy: e.target.value }),
            value: deploy,
          })}
          label="Deploy Url"
          name="deploy"
          type="url"
        />
        <Input
          register={register("deployIcon", {
            onChange: (e) => updateFields({ deployIcon: e.target.value }),
            value: deployIcon,
          })}
          label="Deploy Icon"
          name="deployIcon"
          type="text"
        />
        <div className="relative flex flex-row items-start  rounded-md shadow-sm">
          <div className="flex flex-col">
            <label
              htmlFor="stacks"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Stack Icon
            </label>
            <input
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
              {...register("stacks", {
                required: true,
              })}
              id="stacks"
              onKeyDown={onPushStacks}
              onKeyUp={onStackUpdate}
            />
          </div>
          <div className="mx-3 flex w-1/2 flex-row flex-wrap justify-items-start">
            {stackBadges.map((stack, i) => (
              <img
                className="mr-1 py-1"
                key={i}
                onClick={onDeleteStack}
                src={`https://img.shields.io/badge/${stack.stack}-${stack.color}?style=flat&logo=${stack.stack}&logoColor=white`}
                alt={stack.stack}
                id={stack.stack}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsForm;
