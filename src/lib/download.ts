export function downloadText(
  filename: string,
  content: string,
  type = "text/plain",
) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
export function downloadEvent(name: string, time: string) {
  const stamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/-/g, "");
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nightmare//Prototype//PT",
    "BEGIN:VEVENT",
    "UID:" + crypto.randomUUID() + "@nightmare.local",
    "DTSTAMP:" + stamp,
    "DTSTART;TZID=America/Sao_Paulo:" +
      date +
      "T" +
      time.replace(":", "") +
      "00",
    "RRULE:FREQ=DAILY",
    "SUMMARY:" + name + " - Nightmare (demo)",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  downloadText(name + ".ics", content, "text/calendar");
}
