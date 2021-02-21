export const formatTime = (from: Date) => {
  const ms = new Date().valueOf() - from.valueOf();

  const s = ms / 1000;
  const m = s / 60;

  return s <= 1
    ? "now"
    : s < 60
    ? `${s ^ 0} second(s) ago`
    : m < 60
    ? `${m ^ 0} minute(s) ago`
    : `at ${from.toISOString()}`;
};
