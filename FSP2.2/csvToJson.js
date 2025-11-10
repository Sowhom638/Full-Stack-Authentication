const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// path to the csv file
const csvFilePath = path.join(__dirname, "data.csv");

// an array to store json data
const results = [];

// read the csv file
fs.createReadStream(csvFilePath).pipe(csv()) // .pipe() parses the csv into rows
.on('data', (data) => results.push(data)) // after parsing the csv into rows we are pushing the data into the array
.on("end", () => {
  // path to json file
  const jsonFilePath = path.join(__dirname, "data.json");

  try {
    // writing the json data into json file
    fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("Error writing the JSON file:", error);
  }
})
.on("error", (err) => {
  console.error("Error reading the CSV file:", err);
});