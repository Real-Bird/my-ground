import Button from "@components/buttonComponent";
import Layout, { type LogoutResponse } from "@components/layout";
import useAdmin from "@libs/client/useAdmin";
import useMutation from "@libs/client/useMutation";
import type { NextPage } from "next";
import Login from "@components/login";

const Auth: NextPage = () => {
  const { ok, mutate: adminMutate } = useAdmin();
  const [logout, { loading }] = useMutation<LogoutResponse>("/api/logout");
  const onLogout = async () => {
    if (loading) return;
    logout(null);
    await adminMutate(null, false);
  };
  return (
    <Layout title="Admin">
      <div className="mt-16 flex flex-col space-y-3 px-4">
        <h3 className="text-center text-3xl font-bold">I am Admin</h3>
        {ok ? (
          <div className="mx-3 flex w-36 items-center justify-center">
            <Button text="로그아웃" onClick={onLogout} />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Layout>
  );
};

export default Auth;
