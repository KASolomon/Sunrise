const fs = require("fs");
const { runInNewContext } = require("vm");

const refactorWeatherCodeObject = (originalObject, prefix) => {
  const refactoredObject = {};
  for (const key in originalObject) {
    const newKey = `${prefix}${key}`;
    refactoredObject[newKey] = {
      code: newKey,
      description: originalObject[key],
      iconSource: `require('../../assets/weather_icons/${newKey}.png')`,
    };
  }
  return refactoredObject;
};

// Replace these paths and filenames with your actual ones
const inputFilePath = "./weatherCodes.js";
const outputFilePath = "./newCodes.js";

// Read the original file
fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    // Create a context to execute the code
    const context = { module: { exports: {} } };
    runInNewContext(data, context);

    // Extract the exported object
    const code = context.module.exports;

    // Refactor the weather code objects
    const refactoredWeatherCode = {
      weatherCode: refactorWeatherCodeObject(code.weatherCode, ""),
      weatherCodeFullDay: refactorWeatherCodeObject(
        code.weatherCodeFullDay,
        ""
      ),
      weatherCodeDay: refactorWeatherCodeObject(code.weatherCodeDay, ""),
      weatherCodeNight: refactorWeatherCodeObject(code.weatherCodeNight, ""),
    };

    // Convert the refactored code back to a string
    const refactoredCodeString = `export default ${JSON.stringify(
      refactoredWeatherCode,
      null,
      2
    )};`;

    // Write the refactored code to the output file
    fs.writeFile(outputFilePath, refactoredCodeString, "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing to the file:", writeErr);
        return;
      }
      console.log(
        "Refactoring complete! Check the output file:",
        outputFilePath
      );
    });
  } catch (parseError) {
    console.error("Error parsing JavaScript code:", parseError);
  }
});
