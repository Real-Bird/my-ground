import { TOCList } from "@containers/Common/TocContainer";
import { cls } from "@libs/client/utils";

interface TocProps {
  result: TOCList[];
  activeId: string;
}

export const Toc = ({ result, activeId }: TocProps) => {
  return (
    <ul className="space-y-1">
      {result.map((item, idx) => {
        if (item?.count && item.count <= 20 && item?.title) {
          return (
            <li
              key={item.title + idx}
              id={item.link}
              className={cls(
                activeId === item.link
                  ? "border-l-2 border-amber-400 bg-gray-100 font-semibold"
                  : "",
                "whitespace-pre-wrap break-all py-0.5 pl-0.5 hover:bg-gray-100 hover:font-semibold"
              )}
            >
              <a
                href={`#${item.link}`}
                className="overflow-hidden"
                style={{ marginLeft: `${item.count}px` }}
              >
                {item.title}
              </a>
            </li>
          );
        }
      })}
    </ul>
  );
};
