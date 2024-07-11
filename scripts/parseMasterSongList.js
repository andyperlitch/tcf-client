const fs = require("fs");
const csv = require("@fast-csv/parse");
const path = require("path");
const csvFilePath = "/Users/andy/Downloads/Master Song List - Sheet1.csv";
const jsonFilePath = path.resolve(__dirname, "../src/songlist.json");
const stream = fs.createReadStream(csvFilePath);
const jsonData = [];

csv
  .parseStream(stream, { headers: true })
  .on("data", (data) => {
    jsonData.push(data);
  })
  .on("end", () => {
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(jsonFilePath, jsonString);
    console.log("JSON file has been created successfully.");
  })
  .on("error", (error) => {
    console.error("An error occurred while parsing the CSV file:", error);
  });
