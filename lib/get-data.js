const request = require('./request');

const getData = async (token, repositories) => {
  if (!token) return Promise.reject('Token not present!');
  if (!repositories) return Promise.reject('Repositories not specified!');
  
  const github = request(token);

  async function getData(repo) {
    let res;
    try {
      res = await github.get(`/repos/${repo}/pulls`);
    }
    catch (e) {
      return e;
    }
    return res.data;
  }

  return Promise.all(repositories.map(repo => getData(repo)))
    .then(repos => {
      if (!repos) return;
      let output = { count: 0, data: {} };
      repos.forEach(repo => {
        repo.forEach(pr => {
          if (!pr) return null; 
          output.count++;
          const base = pr.base;
          const name = base.repo.name;
          const datum = { name: pr.user.login, branch: pr.head.ref, url: pr.html_url };
          if (output.data[name]) output.data[name].push(datum); 
          else output.data[name] = [datum];
        });
      });
      return output;
    });
};

module.exports = getData;
