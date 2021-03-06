const yargs = require("yargs");
const chalk = require("chalk");
const { renameFN, moveFN } = require("./modules");


yargs.scriptName(`${chalk.yellow("rename files")}`);
yargs.usage(`$0 ${chalk.red("<command>")} ${chalk.green("[args]")}`);

yargs.version("1.1.0");

// using ===>  node ./app.js rename p --path C:\Users\ujkgm\OneDrive\Desktop\renameJS\title t --text _Downloadly.ir_en
yargs.command({
  command: "rename",
  aliases: ["r"],
  describe: `${chalk.green("[rename Files]")}`,
  builder: {
    path: {
      alias: "p",
      describe: "A folder where you can search and rename files",
      demandOption: true,
      type: "string",
    },
    path: {
      alias: "t",
      describe: "Text to remove from file name",
      demandOption: true,
      type: "string",
    },
  },
  handler({ path, text }) {
    renameFN(path, text);
  },
});

// using ====> node ./app.js move p --path C:\Users\ujkgm\OneDrive\Desktop\renameJS\title f --folder subTitle
yargs.command({
  command: "move",
  aliases: ["m"],
  describe: `${chalk.green("[move Files]")}`,
  builder: {
    path: {
      alias: "p",
      describe: "A folder where you can search and rename files",
      demandOption: true,
      type: "string",
    },
    path: {
      alias: "f",
      describe: "Text to remove from file name",
      demandOption: true,
      type: "string",
    },
  },
  handler({ path, folder }) {
    moveFN(path, folder);
  },
});

yargs.parse();
