interface MetaProps {
  keywords?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
}

export const Meta = ({
  keywords = "nextjs, 찐새, real-bird, 블로그",
  description = "찐새's Ground",
  og_title = "찐새's Ground",
  og_description = "찐새's Ground",
}: MetaProps) => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="author" content="real-bird" />
      <meta property="og:title" content={og_title} />
      <meta property="og:site_name" content="RB's Ground" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={og_description} />
      <meta property="og:url" content={`https://real-bird.vercel.app/`} />
      <link rel="canonical" href="https://real-bird.vercel.app/" />
      <meta name="theme-color" content="#ee8f02" />
      <title>RB&apos;s Ground</title>
    </>
  );
};
