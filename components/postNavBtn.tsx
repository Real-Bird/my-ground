import Link from "next/link";

interface PostNavBtnProps {
  link: string;
  text: string;
}

export default function PostNavBtn({ link, text }: PostNavBtnProps) {
  return (
    <Link href={link}>
      <a className="hidden rounded-md border border-transparent bg-amber-500 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 lg:block">
        {text}
      </a>
    </Link>
  );
}
