import chalk from "chalk";

export const log = console.log;

export const info = (message: string) => log(chalk.bgBlue.bold(message));
export const warning = (message: string) => log(chalk.bgYellow.bold(message));
export const success = (message: string) => log(chalk.bgGreen.bold(message));
export const error = (message: string) => log(chalk.bgRed.bold(message));
