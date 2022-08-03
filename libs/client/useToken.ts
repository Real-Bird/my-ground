import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface TokenResponse {
  ok: boolean;
  userToken: string;
}

export default function userToken() {
  const { data, error } = useSWR<TokenResponse>("/api/token");
  return { token: data?.userToken, isLoading: !data && !error, ok: data?.ok };
}
