import { cls } from "@libs/client/utils";

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
  const date = new Date(regDate);
  return (
    <>
      {y && m && d ? (
        <span {...rest}>{`${date.getFullYear()}-${("0" + date.getMonth()).slice(
          -2
        )}-${("0" + date.getDate()).slice(-2)}`}</span>
      ) : (
        <span {...rest}>{`${date.getFullYear()}-${("0" + date.getMonth()).slice(
          -2
        )}-${("0" + date.getDate()).slice(
          -2
        )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</span>
      )}
    </>
  );
}
