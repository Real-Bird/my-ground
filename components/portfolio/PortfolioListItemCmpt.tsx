import Link from "next/link";

interface PortfolioListItemProps {
  id: number;
  thumbnail: string;
  title: string;
}

const PortfolioListItem = ({
  id,
  thumbnail,
  title,
}: PortfolioListItemProps) => {
  return (
    <li className="h-fit">
      <Link href={`/portfolio/${id}`}>
        <a className="flex aspect-video w-full flex-col items-center rounded-md shadow-md hover:scale-105 dark:bg-amber-500">
          <img
            src={thumbnail}
            className="h-32 w-full rounded-md bg-slate-400 lg:h-48"
            alt={thumbnail}
            loading="lazy"
          />
          <div className="w-full truncate whitespace-nowrap px-2 py-1 text-center text-xl font-bold">
            {title}
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PortfolioListItem;
