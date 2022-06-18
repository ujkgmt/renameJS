const fs = require("fs");
const chalk = require("chalk");
const {
  promises: { readdir },
} = require("fs");

const renameFN = (path, text) => {
  console.log(path, text);
  const files = fs.readdirSync(path);

//*   rename files in the sub folder of the root folder

  const getDirectories = async (source) =>
    (await readdir(source, { withFileTypes: true }))
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

  getDirectories(path).then((folders) => {
    for (const folder of folders) {
      const filesDir = fs.readdirSync(path + "/" + folder);
      for (const file of filesDir) {
        const d = new Date();
        console.log(
          chalk.green(`[${chalk.green(d.toLocaleString())}]`),
          `${path}/${folder}/${file}`,
          `[${chalk.yellow(`successful`)}]`
        );
        if (file.endsWith(".srt") && file.includes(text)) {
          fs.renameSync(
            `${path}/${folder}/${file}`,
            `${path}/${folder}/${file}`.replace(text, ""),
            (err) => {
              console.log(err);
            }
          );
        }
      }
      console.log(
        chalk.yellow("(folder)"),
        chalk.green(`${folder} [successful]`)
      );
    }
  });



//*   rename files in the root of the folder

  if (files.length <= 0) {
    console.log(chalk.red("not found files"));
  } else {
    for (const file of files) {
      if (file.endsWith(".srt") && file.includes(text)) {
        fs.renameSync(
          path + "/" + file,
          path + "/" + file.replace(text, ""),
          (err) => {
            console.log(err);
          }
        );
      }
    }
    console.log(chalk.green("successful"));
  }
};

module.exports = { renameFN };
