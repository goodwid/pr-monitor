#!/usr/bin/env node

const program = require('commander');
const Preferences = require('preferences');
let app = 'pr-monitor';
const prefs = new Preferences(app);
const bitBarFormat = require('./lib/data-format/bitbar');
const terminalFormat = require('./lib/data-format/terminal');
const jsonFormat = require('./lib/data-format/json');
const formatOptions = { bitBar: bitBarFormat, terminal: terminalFormat, json: jsonFormat };

// const getData = require('./lib/get-data');
const { alert, alertErr } = require('./lib/cli-tools');

program
  .command('config')
  .option('-g --githubToken <githubToken>')
  .option('-a --addRepo <repoToAdd>')
  .option('-r --removeRepo <repoToRemove>')
  .option('-d --defaultFormat <format>', 'Display format')
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
  .option('-s --showKeys')
  .description('Display current configuration data.')
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
  .description('Clear current configuration data.')
  .option('-g --githubToken')
  .option('-r --repos')
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
  .parse(process.argv);

const { bitBar, terminal, json } = program;
const { githubToken, repos, defaultFormat } = prefs;
const display = 
  bitBar ? 'bitBar' :
    terminal ? 'terminal' :
      json ? 'json' :
        defaultFormat || 'terminal';
const formatter = formatOptions[display];
formatter(githubToken, repos);
