import timeAgo from "@libs/client/timeAgo";
import { useEffect, useState } from "react";

interface RegDateProps {
  regDate: Date;
  [key: string]: any;
}

export const RegDate = ({ regDate, ...rest }: RegDateProps) => {
  const date = timeAgo(regDate);
  return (
    <time {...rest} dateTime={date} suppressHydrationWarning>
      {date}
    </time>
  );
};
