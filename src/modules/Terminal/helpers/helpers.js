export function formatTimestamp(seconds) {
  const date = new Date(seconds * 1000);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear(); // Год

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const secondsStr = date.getSeconds().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${secondsStr}`;
}
