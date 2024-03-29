import { RegDate } from "@components/common";
import { cls } from "@libs/client/utils";
import { memo } from "react";

interface PostListItemProps {
  title: string;
  name: string;
  content: string;
  colorCode: string;
  created: Date;
  isModal?: boolean;
}
const PostListItem = ({
  title,
  name,
  created,
  content,
  isModal,
  colorCode,
}: PostListItemProps) => {
  return (
    <>
      <div className="flex w-full items-center justify-start space-x-1 px-1 py-2">
        <div className={cls("w-16")}>
          <div
            className={cls(`bg-zinc-300`, "h-12 w-12 rounded-full")}
            style={{ background: colorCode }}
          />
        </div>
        <div
          className={cls(
            isModal && `w-4/6`,
            "flex h-20 w-40 flex-col items-start justify-center space-y-1 lg:w-64"
          )}
        >
          <h3
            className="w-full overflow-x-clip text-ellipsis whitespace-nowrap text-start text-sm font-bold lg:text-lg"
            title={title}
          >
            {title}
          </h3>
          <div className="flex items-center justify-start space-x-2">
            <span className="w-20 text-sm">{name}</span>
            <RegDate
              className="rounded-md bg-orange-200 px-1 text-xs dark:bg-orange-700"
              regDate={created}
            />
          </div>
        </div>
      </div>
      <div
        className={cls(
          isModal
            ? "h-96 overflow-y-scroll break-words lg:h-[40rem]"
            : "line-clamp-5 h-[9.5rem] overflow-y-hidden truncate leading-7 lg:line-clamp-[9] lg:h-[17rem] ",
          "w-full whitespace-pre-wrap rounded-xl bg-orange-200 p-3 px-2 text-start dark:bg-slate-800"
        )}
      >
        {content}
      </div>
    </>
  );
};

export default memo(PostListItem);
