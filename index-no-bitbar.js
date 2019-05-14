#!/usr/bin/env /usr/local/bin/node

const config = require('./config.json');
const { repos, github_key } = config;
const request = require('./lib/request')(github_key);
const chalk = require('chalk');

async function getData(repo) {
  let res;
  try {
    res = await request.get(`/repos/${repo}/pulls`);
  }
  catch (e) {
    console.log(chalk.red(`Error: ${e.code}`));
    process.exit(1);  
  }
  return res.data;
}

const promises = repos.map(repo => getData(repo));

Promise.all(promises).then(repos => {
  if(!repos) return
  let count = 0;
  let output = ''
  repos.forEach(repo => {
    const submenu = repo.map(pr => {
      if(!pr) return null; 
      count++;
      const base = pr.base;
      const name = base.repo.name;
      output += `${chalk.cyan(name)}: ${chalk.green(pr.user.login)} on ${chalk.yellow(pr.head.ref)}  ${pr.html_url}\n`
      return name;
    })
    if(submenu.length) {
      const text = submenu[0].name;
    }
  });
  const color = count <= 1 ? 'green':
                count <= 4 ? 'yellow' :
                'red';
  const title = chalk[color](`Total PRs: ${count}\n\n`);
  output = title + output;
  console.log(output)
})
  .catch(console.log);


