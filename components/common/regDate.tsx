import timeAgo from "@libs/client/timeAgo";
import { useEffect, useState } from "react";

interface RegDateProps {
  regDate: Date;
  [key: string]: any;
}

const RegDate = ({ regDate, ...rest }: RegDateProps) => {
  const [date, setDate] = useState<string>();
  useEffect(() => {
    if (regDate && window) {
      const date = timeAgo(regDate);
      setDate(date);
    }
  }, [regDate]);

  return <>{date ? <span {...rest}>{date}</span> : "Loading..."}</>;
};

export default RegDate;
