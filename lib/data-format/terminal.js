/* eslint-disable indent */
const chalk = require('chalk');

module.exports = (options = { showColors: true }) => {
  return {
    dataHandler: (results) => {
      const showColors = options.showColors;
      const { count, data, error } = results;
      const color = count <= 1 ? 'green' :
                    count <= 4 ? 'yellow' :
                    'red';
      console.log(showColors
        ? chalk[color].bold(`Total PRs: ${count}`)
        : `Total PRs: ${count}`);
      if (!data) return;
      console.log('');
      const repos = Object.keys(data);
      repos.forEach(repo => {
        data[repo].forEach(pr => {
          const { name, branch, url } = pr;
          console.log(showColors
            ? `${chalk.cyan.bold(repo)}: ${chalk.green.bold(name)} on ${chalk.yellow.bold(branch)}  ${url}`
            : `${repo}: ${name} on ${branch}  ${url}`);
        });
      });
      if(error.length > 0) {
        console.log(showColors
          ? chalk.red.bold('Error reported.  See JSON output for details')
          : 'Error reported.  See JSON output for details');
      }
    },
    errorHandler: (err) => console.log(options.showColors ? chalk.red.bold(`Error: ${err.code}`) : `Error: ${err.code}`),
  };
};
