import { TOCList } from "@containers/Common";
import { useEffect, useState } from "react";

export function useTocList(content: string) {
  const [results, setResults] = useState<TOCList[]>([]);

  useEffect(() => {
    const tempArr: string[] = [];
    const titles = content
      .replaceAll(/^```(?:\w*)\n([\s\S]*?)```$/gm, "")
      .split(`\n`)
      .filter((t) => t.match(/^#{1,3} /g));

    const tocList = titles.map((item) => {
      let count = item.match(/#/g)?.length;
      if (count) {
        count = count * 5;
      }
      const title = item.split("# ")[1].replace(/`/g, "").trim();
      let link = title
        .replaceAll(/[`~!@#\$%\^&\*()=\+\\|\/\?<>,.\[\]"'\{\}]/g, "")
        .replaceAll(" ", "-")
        .toLowerCase();
      link =
        tempArr.filter((t) => t.includes(link)).length > 0
          ? `${link}-${tempArr.filter((t) => t.includes(link)).length}`
          : link;
      const temp = link.replace(/(-\d)$/g, "");
      tempArr.push(temp);
      return {
        title,
        link,
        count,
      };
    });
    setResults(tocList);
  }, [content]);
  return results;
}
