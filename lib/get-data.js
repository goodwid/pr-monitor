const request = require('./request');
// eslint-disable-next-line no-useless-escape
const validRepoRegex =  /^[\w\.@\:\-~]+\/[\w\.@\:\-~]+$/;

const getData = async (token, repositories, options = { count: false }) => {
  if (!token) return Promise.reject('Token not present!');
  if (!repositories) return Promise.reject('Repositories not specified!');
  // forcing type into array, so it can be passed as a string if desired
  if (typeof repositories === 'string') repositories = [repositories];
  const validRepos = repositories
    .map(repo => validRepoRegex.test(repo))
    .reduce((a, b) => a && b);
  if (!validRepos) return Promise.reject('Invalid repo(s)');
  const { count } = options;

  const github = request(token);

  async function getData(repo) {
    let res;
    try {
      res = await github.get(`/repos/${repo}/pulls`);
    }
    catch (e) {
      // TODO: error-specific actions, eg: invalid github token.
      return Promise.reject(e);
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
      if (count) return { count: output.count };
      return output;
    });
};

module.exports = getData;
