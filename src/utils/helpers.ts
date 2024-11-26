export const getTimeElapsed = (time1: number, time2: number) => {
  const elapsed = time2 - time1; // Previous time in milliseconds
  const seconds = Math.floor(elapsed / 1000); // Convert to seconds
  const minutes = Math.floor(seconds / 60); // Convert to minutes
  const hours = Math.floor(minutes / 60); // Convert to hours
  const days = Math.floor(hours / 24); // Convert to days

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else {
    return `${days} day${days !== 1 ? "s" : ""}`;
  }
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
