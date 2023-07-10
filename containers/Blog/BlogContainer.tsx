import { BlogPost } from "@components/blog";
import { Button, FloatingButton } from "@components/common";
import { FooterContainer, LayoutContainer } from "@containers/Common";
import Link from "next/link";
import { CategoryWithBlog } from "pages";

interface BlogContainerProps {
  ok: boolean;
  currentPostList: CategoryWithBlog[];
  nextPostList: CategoryWithBlog[][];
  onNext: () => void;
}

const BlogContainer = ({
  ok,
  currentPostList,
  nextPostList,
  onNext,
}: BlogContainerProps) => {
  return (
    <LayoutContainer title="BLOG">
      <section className="mx-3 flex h-fit w-full flex-col space-y-3 text-center lg:my-5 lg:w-[80%]">
        <div className="flex w-full flex-row items-center justify-center lg:relative">
          <h1 className="text-center text-xl font-bold text-red-600 lg:py-5 lg:text-2xl">
            My Blog List
          </h1>
          {ok && (
            <Link href={"/blog/upload"}>
              <a className="hidden lg:absolute lg:right-0 lg:block lg:h-12 lg:w-24">
                <Button text="Upload" />
              </a>
            </Link>
          )}
        </div>
        <ul className="space-y-2">
          {currentPostList?.map((post, idx) => (
            <BlogPost
              key={post.id}
              post={post}
              categories={post.category}
              idx={idx}
            />
          ))}
        </ul>
        {nextPostList[nextPostList.length - 1]?.length > 0 && (
          <Button
            className="animation-fadein"
            onClick={onNext}
            text="더 보기"
          />
        )}
      </section>
      {ok && (
        <FloatingButton href="/blog/upload" type="Blog Upload">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </FloatingButton>
      )}
      <FooterContainer />
    </LayoutContainer>
  );
};

export default BlogContainer;
