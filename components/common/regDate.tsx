import timeAgo from "@libs/client/timeAgo";
import { useEffect, useState } from "react";

interface regDateProps {
  regDate: Date;
  y?: boolean;
  m?: boolean;
  d?: boolean;
  hour?: boolean;
  min?: boolean;
  sec?: boolean;
  [key: string]: any;
}

export default function RegDate({
  regDate,
  y,
  m,
  d,
  hour,
  min,
  sec,
  ...rest
}: regDateProps) {
  const [date, setDate] = useState<string>();
  useEffect(() => {
    if (regDate && window) {
      const date = timeAgo(regDate);
      setDate(date);
    }
  }, [regDate]);

  return <>{date ? <span {...rest}>{date}</span> : "Loading..."}</>;
}
