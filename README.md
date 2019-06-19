<h1 align="center">Welcome to pr-monitor 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.3.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/goodwid/github-pr-monitor#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/goodwid/github-pr-monitor/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/goodwid/github-pr-monitor/blob/master/LICENSE">
    <img alt="License: GPL-2.0-only" src="https://img.shields.io/badge/License-GPL-2.0-only-yellow.svg" target="_blank" />
  </a>
</p>

This started out as a [BitBar](https://getbitbar.com/) plugin. I had spun off another script that output its data direct to the console for general purpose usage, then realized it needed more work.

It has evolved into a module wrapped in a terminal app that has configuration options, storing the Github token and repositories to track in preferences, or receiving them as parameters as a module.

## Usage

### As a module

#### Installation

`npm i pr-monitor -S`

``` js
const token = '<github Token>'
const repos = [ 'goodwid/github-pr-monitor' ]
const getData =  require('pr-monitor')
const options = { count: true }; // optional, defaults to false

getData(token, repos, options) // returns a JavaScript object
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.log(err))
```

The data object returned looks like:

``` json
{
  "count": 3,
  "data": {
    "repo1": [
      {
        "name": "alice",
        "branch": "branch1",
        "url": "https://github.com/...pull/298"
      },
      {
        "name": "bob",
        "branch": "branch2",
        "url": "https://github.com/...pull/292"
      }
    ],
    "repo2": [
      {
        "name": "cathy",
        "branch": "branch1",
        "url": "https://github.com/.../pull/97"
      }
    ]
  }
}

```

### as a CLI app

#### Global installation

`npm install pr-monitor -g`

``` bash
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
  -V, --version          output the version number
  -b --bitBar            Outputs data in a format usable by bitBar.
  -t --terminal          Outputs data to the terminal.
  -j --json              Outputs data in JSON format.
  -c --count             Only show the number of PRs
  -h, --help             output usage information

Commands:
  config [options]       Configure the application
  show-config [options]  Display the current repositories monitored.
  clear [options]        Clears all current configuration data.

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


## Author

👤 **David Goodwin &lt;goodwid@gmail.com&gt;**

* Twitter: [@goodwid](https://twitter.com/goodwid)
* Github: [@goodwid](https://github.com/goodwid)

## 🤝 Contributing

Contributions, issues and feature requests are welcome !<br />Feel free to check [issues page](https://github.com/goodwid/github-pr-monitor/issues).

## Show your support

Give a ⭐️ if this project helped you !

## 📝 License

Copyright © 2019 [David Goodwin &lt;goodwid@gmail.com&gt;](https://github.com/goodwid).<br />
This project is [GPL-2.0-only](https://github.com/goodwid/github-pr-monitor/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_