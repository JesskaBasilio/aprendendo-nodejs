import chalk from "chalk";
import logSymbols from "log-symbols";

console.log(logSymbols.success, chalk.green.italic ("servidor iniciado com sucesso."));
console.log(logSymbols.error, chalk.red.bgBlack.bold ("servidor com problema"));