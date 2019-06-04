const chalk = require('chalk');

exports.alert = (msg) => console.log(chalk.green(`[*] ${msg}`));
exports.alertErr = (msg) => console.log(chalk.red(`[X] ${msg}`));
