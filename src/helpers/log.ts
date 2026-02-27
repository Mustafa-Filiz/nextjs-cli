import chalk from "chalk";

export const info = (message: string) =>
  console.info(chalk.bgBlue.bold(message));

export const warning = (message: string) =>
  console.warn(chalk.bgYellow.bold(message));

export const success = (message: string) =>
  console.log(chalk.bgGreen.bold(message));

export const error = (message: string) =>
  console.error(chalk.bgRed.bold(message));
