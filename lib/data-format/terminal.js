/* eslint-disable indent */
const chalk = require('chalk');

const dataHandler = (results) => {
  const { count, data } = results;
  const color = count <= 1 ? 'green' :
                count <= 4 ? 'yellow' :
                'red';
  console.log(chalk[color].bold(`Total PRs: ${count}`));
  if (!data) return;
  console.log('');
  const repos = Object.keys(data);
  repos.forEach(repo => {
    data[repo].forEach(pr => {
      const { name, branch, url } = pr;
      console.log(`${chalk.cyan.bold(repo)}: ${chalk.green.bold(name)} on ${chalk.yellow.bold(branch)}  ${url}`);
    });
  });
};

const errorHandler = (err) => console.log(chalk.red.bold(`Error: ${err.code}`));

module.exports = { dataHandler, errorHandler };
