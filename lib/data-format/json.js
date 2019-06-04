const request = require('../request');

module.exports = (token, repositories) => {
  const github = request(token);

  async function getData(repo) {
    let res;
    try {
      res = await github.get(`/repos/${repo}/pulls`);
    }
    catch (e) {
      console.log(JSON.stringify(e, null, 2));
      process.exit(1);  
    }
    return res.data;
  }

  Promise.all(repositories.map(repo => getData(repo)))
    .then(repos => {
      if (!repos) return;
      let output = { count: 0 };
      repos.forEach(repo => {
        repo.forEach(pr => {
          if (!pr) return null; 
          output.count++;
          const base = pr.base;
          const name = base.repo.name;
          const datum = { name: pr.user.login, branch: pr.head.ref, url: pr.html_url };
          if (output[name]) output[name].push(datum); 
          else output[name] = [datum];
        });
      });
      console.log(JSON.stringify(output, null, 2));
    })
    .catch(console.log);
};
