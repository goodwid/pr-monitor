const request = require('../request');
const bitbar = require('bitbar');

module.exports = (token, repositories) => {
  const github = request(token);

  async function getData(repo) {
    let res;
    try {
      res = await github.get(`/repos/${repo}/pulls`);
    }
    catch (e) {
      console.log(`Error: ${e.code}|color="red" refresh="true"`);
      process.exit(1);  
    }
    return res.data;
  }
  
  const title = {
    text: '',
  };
  
  const output = [title, bitbar.separator];
  
  Promise.all(repositories.map(repo => getData(repo)))
    .then(repos => {
      if (!repos) return;
      let count = 0;
      repos.forEach(repo => {
        const submenu = repo.map(pr => {
          if (!pr) return null; 
          count++;
          const base = pr.base;
          const name = base.repo.name;
          return { text: `${pr.user.login} on ${pr.head.ref}`, href: pr.html_url, name };
        });
        if (submenu.length) {
          const text = submenu[0].name;
          const block = { text, color: 'yellow', submenu };
          output.push(block);
        }
      });
      title.color = 
        count <= 1 ? 'green' :
          count <= 4 ? 'yellow' :
            'red';
      title.text = `PRs: ${count}`;
    
      bitbar(output);
    })
    .catch(console.log);
};
