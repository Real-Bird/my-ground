import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse<T = any> {
  ok: boolean;
  data: T;
}

export default function useNotFound(url: string) {
  const { data, error } = useSWR<ProfileResponse>(url);
  const router = useRouter();
  useEffect(() => {
    if (!data) {
      router.push("/404");
    }
  }, []);
  return { data: data?.data, isLoading: !data && !error, ok: data?.ok };
}
