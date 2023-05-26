import { toMetaString } from "@libs/client/utils";
import Head from "next/head";

interface MetaProps {
  keywords?: string[];
  description?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
}

export const Meta = ({
  keywords,
  description = "RB's Ground",
  og_title = "RB's Ground",
  og_description = "RB's Ground",
  og_url = "",
}: MetaProps) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="author" content="real-bird" />
      <meta property="og:site_name" content="RB's Ground" />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://real-bird.vercel.app/" />
      <meta name="theme-color" content="#ee8f02" />
      <meta
        name="keywords"
        content={
          keywords
            ? toMetaString(...keywords) + ", RB's Ground"
            : "next.js, 찐새, real-bird, 블로그, RB's Ground"
        }
      />
      <meta name="description" content={description} />
      <meta property="og:title" content={og_title} />
      <meta property="og:description" content={og_description} />
      <meta
        property="og:url"
        content={`https://real-bird.vercel.app${og_url}`}
      />
    </Head>
  );
};
