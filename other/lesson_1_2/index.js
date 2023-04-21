import { promises as fs } from "fs";
import readline from "readline";
import { __dirname } from "./module.js";

// fs.readdir(__dirname)
//   .then((files) =>
//     Promise.all(
//       files.map(async (file) => ({
//         Size:
//           Math.round(((await fs.stat(file)).size / 1024) * 100) / 100 + "KB",
//         Name: file,
//       }))
//     )
//   )
//   .then(console.table);

const rl = readline.createInterface({
  input: process.stdin, // введення зі стандартного потоку
  output: process.stdout, // виведення у стандартний потік
});

const number = Math.round(Math.random() * 5);
rl.question("What the number [1 - 5]?\n", (cmd) => {
  if (isNaN(+cmd)) console.log("It is not a number");
  else if (+cmd !== number)
    console.log("This number is incorrect.\nCorrect: " + number);
  else console.log("Good Job. Number: ", number);
});
