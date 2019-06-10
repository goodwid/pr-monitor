# pr-monitor

This started out as a [BitBar](https://getbitbar.com/) plugin. I had spun off another script that outputs direct to the console for general purpose usage, then realized it needed more work.

It has evolved into a single terminal app that has configuration options, storing the Github token and repositories to track.

## Installation

`npm install pr-monitor -g`

## Usage

### as a module

`npm i pr-monitor -S`

``` js
const token = '<github Token>'
const repos = [ 'goodwid/github-pr-monitor' ]
const getData =  require('pr-monitor')

getData(token, repos)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.log(err))
```

### as a CLI app

``` shell
# PRs
Total PRs: 1

github-pr-monitor: goodwid on update-readme  https://github.com/goodwid/github-pr-monitor/pull/1
```

Help is available within the app:

``` shell
# PRs --help

Usage: PRs [options] [command]

Show current pull requests for all configured repos.

Options:
  -b --bitBar            Outputs data in a format usable by bitBar.
  -t --terminal          Outputs data to the terminal.
  -j --json              Outputs data in JSON format.
  -h, --help             output usage information

Commands:
  config [options]       Configure the application
  show-config [options]  Display current configuration data.
  clear [options]        Clear current configuration data.
```

### Subcommands

#### config

``` shell
# PRs config --help
Usage: config [options]

Configure the application

Options:
  -g --githubToken <githubToken>  Github token to use for API call
  -a --addRepo <repoToAdd>        Add a repository to the monitor list
  -r --removeRepo <repoToRemove>  Remove a repository from the monitor list
  -d --defaultFormat <format>     Select a default format to use
  -h, --help                      output usage information
```

#### show-config

``` shell
# PRs show-config --help
Usage: show-config [options]

Display the current repositories monitored.

Options:
  -s --showKeys  Displays the Github token as well
  -h, --help     output usage information

```

#### clear

``` shell
# PRs clear --help
Usage: clear [options]

Clears all current configuration data.

Options:
  -g --githubToken  Removes just the Github token
  -r --repos        Removes just the repository data
  -h, --help        output usage information
```

### To use this project with BitBar

- add your github token:  `pr-monitor config -g <token>`
- add your repository: `pr-monitor config -a <org>/<repo>`
- set your default display `pr-monitor config -d bitBar`
- create a symbolic link from your bitbar dir to `index.js`:  `ln -s pr-monitor /path/to/bitbar/github-pr-5m.js'

For other use, follow the first three steps, and roll your own monitoring (conky? rainmeter?)
