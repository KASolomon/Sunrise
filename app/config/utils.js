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


export const trimApiData = (data, reservedKeys=[])=>{
for (let forecast of data) {
  for (let weatherItem in forecast.values) {
    if (
      !reservedKeys.includes(weatherItem) &&
      forecast.values[weatherItem] == 0
    ) {
      delete forecast.values[weatherItem];
    }
  }
}
return data
}