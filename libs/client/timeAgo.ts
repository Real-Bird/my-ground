export default function timeAgo(startedDate: Date) {
  const started = new Date(startedDate);
  const today = new Date();
  const relativeFormatter = new Intl.RelativeTimeFormat("ko", {
    numeric: "always",
  });
  const localeFormatter = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const daysPassed = Math.ceil(
    (started.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const hoursPassed = Math.ceil(
    (started.getTime() - today.getTime()) / (1000 * 60 * 60)
  );
  if (hoursPassed === 0) {
    return "방금 전";
  } else if (hoursPassed < -1 && daysPassed > -1) {
    return relativeFormatter.format(hoursPassed, "hour");
  } else if (daysPassed <= -1 && daysPassed > -7) {
    return relativeFormatter.format(daysPassed, "day");
  } else {
    return localeFormatter.format(started.getTime());
  }
}
