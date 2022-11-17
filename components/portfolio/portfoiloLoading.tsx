import { Skeleton } from "@mui/material";

const PortfolioLoading = () => {
  return (
    <div className="lg:w-2/3">
      <div className="flex w-full flex-row items-center justify-center border-b-2 border-dotted lg:relative">
        <Skeleton
          variant="text"
          animation="wave"
          height="5rem"
          width="30rem"
          className="pt-1 pb-5"
        />
      </div>
      <div className="py-5">
        <div className="flex flex-row justify-center md:justify-between">
          <div className="flex w-40 flex-col items-center space-y-1 md:w-[20%]">
            <span className="font-semibold">Stack</span>
            <div className="mx-auto w-36">
              <ul className="flex flex-row flex-wrap justify-start">
                {[0, 1].map((i) => (
                  <li key={i}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      height="1.25rem"
                      width="6rem"
                      className="m-0.5 rounded-md"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex w-1/3 flex-row justify-evenly space-x-5">
            <div className="flex flex-1 flex-col items-center space-y-1">
              <span className="font-semibold">Github</span>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="3rem"
                width="3rem"
                className="rounded-md py-1.5"
              />
            </div>
            <div className="flex flex-1 flex-col items-center space-y-1">
              <span className="font-semibold">Deploy</span>
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="3rem"
                width="3rem"
                className="rounded-md py-1.5"
              />
            </div>
          </div>
          <div className="flex w-1/3 flex-col items-center md:w-[20%]">
            <div className="font-semibold">Develop Date</div>
            <Skeleton
              variant="text"
              animation="wave"
              height="1.25rem"
              width="7rem"
            />
            <Skeleton
              variant="text"
              animation="wave"
              height="1.25rem"
              width="7rem"
            />
          </div>
        </div>
      </div>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="68vh"
        className="w-full rounded-md"
      />
    </div>
  );
};

export default PortfolioLoading;
