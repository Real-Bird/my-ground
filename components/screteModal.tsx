import Button from "@components/buttonComponent";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface SecretForm {
  secret: string;
}

interface SecretModalProps {
  postId: number;
  setOpenSecretModal: Dispatch<SetStateAction<boolean>>;
}

interface PassingResponse {
  ok: boolean;
  error?: string;
}

const SecretModal = ({
  postId,
  setOpenSecretModal,
  ...rest
}: SecretModalProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SecretForm>();
  const [passing, { data, loading }] = useMutation<PassingResponse>(
    `/api/contact/validate?id=${postId}`
  );
  const onValid = ({ secret }: SecretForm) => {
    if (loading) return;
    passing({ secret });
  };
  const onCloseModal = () => setOpenSecretModal(false);
  useEffect(() => {
    if (data?.ok) {
      router.push(`/contact/${postId}?valid=true`);
    }
    if (data?.ok === false) {
      setError("secret", { message: data?.error });
    }
  }, [data]);
  return (
    <div
      className="fixed left-0 top-0 z-20 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      style={{ margin: 0 }}
    >
      <div
        className="absolute top-5 right-5 cursor-pointer text-white hover:text-gray-300"
        onClick={onCloseModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-amber-500">It is Secret!</h3>
        <p className="text-lg text-white">게시글의 비밀번호를 입력해주세요.</p>
        <form onSubmit={handleSubmit(onValid)} className="space-y-3">
          <label
            className="mb-1 block text-sm font-medium text-white"
            htmlFor="secret"
          >
            Secret Password
          </label>
          <div className="relative flex flex-col items-start  rounded-md shadow-sm">
            <input
              id="secret"
              {...register("secret")}
              type={"password"}
              className={
                "w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-600 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
              }
            />
            <div
              className={cls(
                errors?.secret?.message ? "visible" : "invisible",
                "text-red-500"
              )}
            >
              잘못된 비밀번호입니다.
            </div>
          </div>
          <Button text={loading ? "Verifying..." : "Go To Post!"} />
        </form>
      </div>
    </div>
  );
};

export default SecretModal;
