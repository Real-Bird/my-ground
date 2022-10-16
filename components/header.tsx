import FullNavBar from "@components/fullNavbar";
import useAdmin from "@libs/client/useAdmin";
import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
  backUrl: string;
  title: string;
  onToggleDropdown: () => void;
}

const Header = ({ backUrl, title, onToggleDropdown }: HeaderProps) => {
  const router = useRouter();
  const onBackUrl = () => {
    if (backUrl === "back") {
      router.back();
    } else {
      router.push(backUrl);
    }
  };
  return (
    <header className="fixed top-0 flex h-12 w-full max-w-xl items-center justify-center border-b bg-white px-10 text-lg font-medium text-gray-800 lg:max-w-full">
      {backUrl ? (
        <div
          className="absolute left-4 my-auto cursor-pointer"
          onClick={onBackUrl}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        </div>
      ) : null}
      <Link href={"/"}>
        <a className="absolute left-4 hidden lg:inline-block">
          <img
            src="https://raw.githubusercontent.com/Real-Bird/my-ground/dev-branch2/public/myground.logo.png"
            className="h-10 w-10"
            alt="logo"
          />
        </a>
      </Link>
      <span className="lg:hidden">{title}</span>
      <div className="absolute right-4 hidden lg:block">
        <FullNavBar />
      </div>
      <div
        className="absolute right-4 top-1 cursor-pointer lg:hidden"
        onClick={onToggleDropdown}
      >
        <img
          src="https://raw.githubusercontent.com/Real-Bird/my-ground/dev-branch2/public/myground.logo.png"
          alt="profile"
          className="h-10 w-10 rounded-full bg-gray-500"
        />
      </div>
    </header>
  );
};

export default Header;
