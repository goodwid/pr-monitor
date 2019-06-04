const request = require('../request');
const chalk = require('chalk');


module.exports = (token, repositories) => {
  const github = request(token);

  async function getData(repo) {
    let res;
    try {
      res = await github.get(`/repos/${repo}/pulls`);
    }
    catch (e) {
      console.log(chalk.red(`Error: ${e.code}`));
      process.exit(1);  
    }
    return res.data;
  }

  Promise.all(repositories.map(repo => getData(repo)))
    .then(repos => {
      if (!repos) return;
      let count = 0;
      let output = '';
      repos.forEach(repo => {
        repo.forEach(pr => {
          if (!pr) return null; 
          count++;
          const base = pr.base;
          const name = base.repo.name;
          output += `${chalk.cyan(name)}: ${chalk.green(pr.user.login)} on ${chalk.yellow(pr.head.ref)}  ${pr.html_url}\n`;
          return name;
        });
      });
      const color = count <= 1 ? 'green' :
        count <= 4 ? 'yellow' :
          'red';
      const title = chalk[color](`Total PRs: ${count}\n\n`);
      output = title + output;
      console.log(output);
    })
    .catch(console.log);
};
