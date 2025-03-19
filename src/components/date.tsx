export default function DateComponent({ date }: { date: string }) {
  const formattedDate = new Intl.DateTimeFormat("ka-GE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

  return <span>{formattedDate}</span>;
}
