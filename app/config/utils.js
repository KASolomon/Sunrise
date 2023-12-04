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
