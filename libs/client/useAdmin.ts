import { User } from "@prisma/client";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  admin: User;
}

export default function useAdmin() {
  const { data, error, mutate } = useSWR<ProfileResponse>("/api/admin");
  return {
    admin: data?.admin,
    isLoading: !data && !error,
    ok: data?.ok,
    mutate,
  };
}
