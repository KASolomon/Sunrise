export const getUVIDescription = (UVIndex) => {
  if (UVIndex <= 2) {
    return "Low";
  } else if (UVIndex <= 5) {
    return "Moderate";
  } else if (UVIndex <= 7) {
    return "High";
  } else if (UVIndex <= 10) {
    return "Very High";
  } else if (UVIndex >= 11) {
    return "Extreme";
  } else {
    return "Unspecified";
  }
};

export const getCommonTime = (dateTime, returnMins = false) => {
  let fetchTime = dateTime;
  const tIndex = fetchTime.indexOf("T");
  fetchTime = fetchTime.slice(tIndex + 1, tIndex + 6);
  const divTime = fetchTime.split(":");
  const hour = divTime[0];
  const minute = divTime[1];

  return returnMins
    ? hour > 12
      ? `${hour - 12}:${minute} PM`
      : `${fetchTime} AM`
    : hour > 12
    ? `${hour - 12} PM`
    : `${hour < 10 ? hour[1] : hour} AM`;
};

