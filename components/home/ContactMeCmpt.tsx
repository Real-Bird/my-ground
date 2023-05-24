import Link from "next/link";
import { ReactNode } from "react";

interface ContactMeProps {
  logo: ReactNode;
  label: string;
  href?: string;
}

export const ContactMe = ({ logo, label, href }: ContactMeProps) => {
  return (
    <div className="flex w-full items-center space-x-3">
      <div className="h-10 w-10">{logo}</div>
      <span className="flex-1">
        {href ? (
          <Link href={href}>
            <a className="cursor-pointer" target="_blank">
              <h4 className="text-lg font-semibold">{label}</h4>
            </a>
          </Link>
        ) : (
          <h4 className="text-lg font-semibold">{label}</h4>
        )}
      </span>
    </div>
  );
};
