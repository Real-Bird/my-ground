import { useEffect, useState } from "react";

interface TimeResponse {
  [key: string]: {
    [key: string]: string;
  };
}

export default function useTimer(): TimeResponse {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [amPm, setAmPm] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setYear(date.getFullYear().toString());
      setMonth((date.getMonth() + 1).toString().padStart(2, "0"));
      setDay(date.getDate().toString().padStart(2, "0"));
      setAmPm(date.getHours() >= 12 ? "PM" : "AM");
      setHour((prev) =>
        +prev % 12
          ? `${+prev % 12}`.padStart(2, "0")
          : date.getHours().toString().padStart(2, "0")
      );
      setMinute(date.getMinutes().toString().padStart(2, "0"));
      setSecond(date.getSeconds().toString().padStart(2, "0"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return {
    date: { year, month, day },
    timer: { amPm, hour, minute, second },
  };
}
