// import dynamic from "next/dynamic";
import RegDate from "@components/common/regDate";
import { cls } from "@libs/client/utils";
import { memo } from "react";

// const RegDate = dynamic(() => import("@components/common/regDate"), {
//   suspense: true,
// });

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
              className="rounded-md bg-orange-200 px-1 text-xs"
              regDate={created}
              y
              m
              d
            />
          </div>
        </div>
      </div>
      <div
        className={cls(
          isModal
            ? "h-96 overflow-y-scroll break-words lg:h-[40rem]"
            : "h-40 overflow-y-hidden truncate leading-7 line-clamp-5 lg:h-64 lg:line-clamp-[9] ",
          "w-full whitespace-pre-wrap rounded-xl bg-orange-200 p-3 px-2 text-start"
        )}
      >
        {content}
      </div>
    </>
  );
};

export default memo(PostListItem);
