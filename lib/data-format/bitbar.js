/* eslint-disable indent */
const bitbar = require('bitbar');

const dataHandler = results => {
  const { count, data } = results;

  const title = {
    text: '',
  };
  title.color = 
    count <= 1 ? 'green' :
    count <= 4 ? 'yellow' :
    'red';
  title.text = `PRs: ${count}`;

  const output = [title, bitbar.separator];

  if (!data) return bitbar(output);
  
  const repos = Object.keys(data);
  repos.forEach(repo => {
    const submenu = data[repo].map(pr => {
      const { name, branch, url } = pr;
      return { text: `${name} on ${branch}`, href: url, name: branch };
    });
    output.push({ text: repo, color: 'yellow', submenu });
  });

  bitbar(output);
};

const errorHandler = err =>  console.log(`Error: ${err.code}|color="red" refresh="true"`);

module.exports = { dataHandler, errorHandler };
