import useSWR from "swr";

interface TokenResponse {
  ok: boolean;
  userToken: string;
}

export default function useToken() {
  const { data, error } = useSWR<TokenResponse>("/api/token");
  return { token: data?.userToken, isLoading: !data && !error, ok: data?.ok };
}
