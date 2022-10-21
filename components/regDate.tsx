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
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (regDate && window) {
      const date = new Date(regDate);
      setDate(date);
    }
  }, [regDate]);
  return (
    <>
      {y && m && d ? (
        <span {...rest}>{`${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`}</span>
      ) : (
        <span {...rest}>{`${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(
          -2
        )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</span>
      )}
    </>
  );
}
