import dynamic from "next/dynamic";
import { cls } from "@libs/client/utils";
import { memo } from "react";

const RegDate = dynamic(() => import("@components/common/regDate"), {
  suspense: true,
});

interface PostListItemProps {
  title: string;
  name: string;
  created: Date;
  content: string;
  isModal?: boolean;
}
const PostListItem = ({
  title,
  name,
  created,
  content,
  isModal,
}: PostListItemProps) => {
  const random = Math.floor(Math.random() * 300);
  return (
    <>
      <div className="flex w-full items-center justify-start space-x-1 px-1 py-2 ">
        <div className={cls("w-16")}>
          <img
            className={cls(
              "h-12 w-12 rounded-full bg-gradient-to-br bg-blend-overlay"
            )}
            src={`https://picsum.photos/200/300?random=${random}`}
          />
        </div>
        <div className="flex w-40 flex-col items-start justify-center lg:w-64">
          <h3 className="w-full overflow-x-clip text-ellipsis whitespace-nowrap text-start text-sm font-bold lg:text-lg">
            {title}
          </h3>
          <div className="flex items-center justify-start space-x-2">
            <span className="text-sm">{name}</span>
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
            ? "h-[40rem] overflow-y-scroll"
            : "h-36 overflow-y-hidden truncate leading-7 line-clamp-5 lg:h-64 lg:line-clamp-[9]",
          "w-full whitespace-pre-wrap rounded-xl bg-orange-200 px-2 text-start "
        )}
      >
        {content}
      </div>
    </>
  );
};

export default memo(PostListItem);
