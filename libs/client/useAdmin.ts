import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  admin: User;
}

export default function useAdmin() {
  const { data, error } = useSWR<ProfileResponse>("/api/admin");
  return { admin: data?.admin, isLoading: !data && !error, ok: data?.ok };
}
