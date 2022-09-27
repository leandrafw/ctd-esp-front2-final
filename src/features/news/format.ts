export const formatTime = (time: Date) => {
  const hour = new Date();
  const minutes = Math.floor(
  (hour.getTime() - time.getTime()) / 60000);
  return minutes
}

export const formatTitle = (text: string) => {
  return text.split(" ")
      .map((string) => {
          return string.charAt(0).toUpperCase() + string.slice(1);
      })
      .join(" ");
}