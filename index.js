#!/usr/bin/env node

/* eslint-disable indent */

const pj = require('./package.json');
const program = require('commander');
const Preferences = require('preferences');
const app = pj.name;
const prefs = new Preferences(app);
const bitBarFormat = require('./lib/data-format/bitbar');
const terminalFormat = require('./lib/data-format/terminal');
const XMLFormat = require('./lib/data-format/xml');
const getData = require('./lib/get-data');
module.exports = getData;

const { alert, alertErr } = require('./lib/cli-tools');

program
  .version(pj.version)
  .command('config')
  .option('-g --githubToken <githubToken>', 'Github token to use for API call')
  .option('-a --addRepo <repoToAdd>', 'Add a repository to the monitor list')
  .option('-r --removeRepo <repoToRemove>', 'Remove a repository from the monitor list')
  .option('-d --defaultFormat <format>', 'Select a default format to use')
  .description('Configure the application')
  .action(({ githubToken, addRepo, removeRepo, defaultFormat }) => {
    if (defaultFormat) {
      if (['bitBar', 'terminal', 'json'].indexOf(defaultFormat) === -1) {
        alertErr('Default must be one of the following options: bitBar, terminal, json.');
        process.exit(1);
      }
      alert(`Default is set to ${defaultFormat}`);
      prefs.defaultFormat = defaultFormat;
    }
    if (githubToken) {
      prefs.githubToken = githubToken;
      alert('Github Token added.');
    }
    if (addRepo) {
      const repos = prefs.repos || [];
      if (repos.indexOf(addRepo) === -1) {
        repos.push(addRepo);
        prefs.repos = repos;
        alert(`${addRepo} has been added.`);
      } else {
        alertErr(`${addRepo} is already configured.`);
      }
    }
    if (removeRepo) {
      const repos = prefs.repos || [];
      const found = repos.indexOf(removeRepo);
      if (found === -1) {
        alertErr(`Repo ${removeRepo} not found.`);
      } else {
        repos.splice(found, 1);
        alert(`${removeRepo} has been removed.`);
      }
    }
    process.exit(0);
  });

program
  .command('show-config')
  .option('-s --showKeys', 'Displays the Github token as well')
  .description('Display the current repositories monitored.')
  .action((cmd) => {
    if (cmd.showKeys) prefs.githubToken
      ? alert(`Current Github token is ${prefs.githubToken}`)
      : alertErr('There is no Github token configured.');
    if (prefs.repos) {
      alert('The following repos are stored: ');
      prefs.repos.forEach(repo => alert(' - ' + repo));
    }
    process.exit(0);

  });

program
  .command('clear')
  .description('Clears all current configuration data.')
  .option('-g --githubToken', 'Removes just the Github token')
  .option('-r --repos', 'Removes just the repository data')
  .action((options) => {
    const { githubOrg, repos } = options;
    if (repos) {
      prefs.githubOrg = undefined;
      alertErr('Github repos have been cleared.');
    }
    if (githubToken) {
      prefs.githubToken = undefined;
      alertErr('Github token has been cleared.');
    }
    if (!githubOrg && !githubToken) {
      prefs.githubOrg = undefined;
      prefs.githubToken = undefined;
      alertErr('all configurations have been removed.');
    }
    process.exit(0);

  });

program
  .description('Show current pull requests for all configured repos.')
  .option('-b --bitBar', 'Outputs data in a format usable by bitBar.')
  .option('-t --terminal', 'Outputs data to the terminal.')
  .option('-j --json', 'Outputs data in JSON format.')
  .option('-x --xml', 'Outputs data in XML format, suitable for RSS.')
  .option('-c --count', 'Only show the number of PRs')
  .option('-N --nocolor', 'Omit colors in terminal output')
  .parse(process.argv);

const { bitBar, terminal, json, xml, count = false, nocolor = false } = program;
const { githubToken, repos, defaultFormat } = prefs;
const choice =
  bitBar ? 'bitBar' :
  terminal ? 'terminal' :
  json ? 'json' :
  xml ? 'xml' :
  defaultFormat || 'terminal';

let { dataHandler, errorHandler } = terminalFormat({ showColors: !nocolor });

switch (choice) {
  case 'json':
    dataHandler = data => console.log(JSON.stringify(data, null, 2));
    errorHandler = err => console.log(JSON.stringify(err));
    break;
  case 'bitBar':
    dataHandler = bitBarFormat.dataHandler;
    errorHandler = bitBarFormat.errorHandler;
    break;
  case 'xml':
    dataHandler = XMLFormat.dataHandler;
    errorHandler = XMLFormat.errorHandler;
    break;
}

getData(githubToken, repos, { count })
  .then(dataHandler)
  .catch(errorHandler);
