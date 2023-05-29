import { ContentForm } from "@components/form";
import { PFUploadFormResponse } from "@containers/Portfolio/PFUploadContainer";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "@libs/client/context";

type T = PFUploadFormResponse;

interface ContentFormContainerProps<T> {
  data: T;
  updateFields: (fields: Partial<T>) => void;
}

export const ContentFormContainer = ({
  data,
  updateFields,
}: ContentFormContainerProps<T>) => {
  const { title } = data;
  const { register, setValue } = useForm<T>({
    mode: "onChange",
  });
  const [height, setHeight] = useState(0);
  const mdeWrapper = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (title) {
      setValue("title", title);
    }
  }, [title, setValue]);

  useEffect(() => {
    if (mdeWrapper) {
      setHeight(
        document.documentElement.clientHeight -
          (mdeWrapper.current.offsetTop +
            mdeWrapper.current.parentElement.nextElementSibling.clientHeight)
      );
    }
  }, []);

  return (
    <ContentForm
      {...data}
      updateFields={updateFields}
      register={register}
      height={height}
      mdeWrapper={mdeWrapper}
      theme={theme}
    />
  );
};
