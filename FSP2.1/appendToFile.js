const fs = require("fs");

try {
    fs.appendFileSync("log.txt", "\n6   2024-10-23 14:32:09 [PID: 1234] [TID: 5678] [TAG: SUCCESS] [PACKAGE: app.module] [PR successfully printed data].")
        console.log("Data appended successfully");
} catch (error) {
    console.log("Error: ", error);
}