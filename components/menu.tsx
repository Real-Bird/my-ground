import Link from "next/link";
import React from "react";

interface LayoutProps {
  path: string;
  menu: string;
  [key: string]: any;
}

export default function Menu({ menu, path }: LayoutProps) {
  return (
    <Link href={path}>
      <li className="block cursor-pointer bg-white px-4 py-2 text-sm leading-5 text-gray-900 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:border-b dark:border-gray-600 last:dark:border-b-0">
        {menu}
      </li>
    </Link>
  );
}
