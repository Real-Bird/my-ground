export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function toMetaString(...arr: string[]): string {
  return arr.join(", ");
}

export function toBoldDangerousHtml(str: string) {
  return str.replace(
    /(`|'|")((?=\w)[\w\W ]+?|[ㄱ-ㅎ가-힣 ]+?)(`|'|")/gm,
    `<strong class="font-bold px-1 bg-amber-500 rounded-md">$2</strong>`
  );
}

export function toUnderlineDangerousHtml(str: string) {
  return str.replace(
    /(`|'|")((?=\w)[\w\W ]+?|[ㄱ-ㅎ가-힣 ]+?)(`|'|")/gm,
    `<strong class="font-semibold underline text-amber-500">$2</strong>`
  );
}

export function randomColor() {
  const colorList = [
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
    "#0f172a",
    "#fef2f2",
    "#fee2e2",
    "#fecaca",
    "#fca5a5",
    "#f87171",
    "#ef4444",
    "#dc2626",
    "#b91c1c",
    "#991b1b",
    "#7f1d1d",
    "#fefce8",
    "#fef9c3",
    "#fef08a",
    "#fde047",
    "#facc15",
    "#eab308",
    "#ca8a04",
    "#a16207",
    "#854d0e",
    "#713f12",
    "#ecfdf5",
    "#d1fae5",
    "#a7f3d0",
    "#6ee7b7",
    "#34d399",
    "#10b981",
    "#059669",
    "#047857",
    "#065f46",
    "#064e3b",
    "#ecfeff",
    "#cffafe",
    "#a5f3fc",
    "#67e8f9",
    "#22d3ee",
    "#06b6d4",
    "#0891b2",
    "#0e7490",
    "#155e75",
    "#164e63",
    "#f5f3ff",
    "#ede9fe",
    "#ddd6fe",
    "#c4b5fd",
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#6d28d9",
    "#5b21b6",
    "#4c1d95",
    "#fff1f2",
    "#ffe4e6",
    "#fecdd3",
    "#fda4af",
    "#fb7185",
    "#f43f5e",
    "#e11d48",
    "#be123c",
    "#9f1239",
    "#881337",
  ];
  return colorList[Math.floor(Math.random() * colorList.length)];
}

export function randomChroma() {
  const chromaList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  return chromaList[Math.floor(Math.random() * chromaList.length)].toString();
}

export function makeHeadingId(content: string) {
  const tempArr: string[] = [];
  const containedId = content
    .split(`\n`)
    .map((item) => {
      if (item.match(/^#{1,3} /g)) {
        const count = item.match(/#/g)?.length;
        const title = item.split("# ")[1].replace(/`/g, "").trim();
        let link = title
          .replace(/[`~!@#\$%\^&\*()=\+\\|\/\?<>,.\[\]"'\{\}]/g, "")
          .replaceAll(" ", "-")
          .toLowerCase();
        link =
          tempArr.filter((t) => t.includes(link)).length > 0
            ? `${link}-${tempArr.filter((t) => t.includes(link)).length}`
            : link;
        const temp = link.replace(/(-\d)$/g, "");
        tempArr.push(temp);
        return "#".repeat(count) + " " + title + "\\#" + link;
      }
      return item;
    })
    .join("\n");
  return containedId;
}
