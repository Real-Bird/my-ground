import Link from "next/link";
import React from "react";

interface LayoutProps {
  path?: string;
  menu: string;
  handleTheme?: () => void;
}

export const Menu = ({ menu, path, handleTheme }: LayoutProps) => {
  return (
    <li
      className="block cursor-pointer border-b border-gray-600 bg-white px-4 py-2 text-sm leading-5 text-gray-900 transition duration-150 ease-in-out last:border-b-0 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:border-gray-200 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700"
      onClick={handleTheme}
    >
      {path ? (
        <Link href={path}>
          <a>{menu}</a>
        </Link>
      ) : (
        <span>{menu}</span>
      )}
    </li>
  );
};
