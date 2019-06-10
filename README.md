# Github pull request monitor

This started out as a [BitBar](https://getbitbar.com/) plugin. I had spun off another script that outputs direct to the console for general purpose usage, then realized it needed more work.

It has evolved into a single terminal app that has configuration options, storing the Github token and repositories to track.

## Installation

`npm install pr-monitor -g`

## Usage

<pre>
> PRs
Total PRs: 1

github-pr-monitor: goodwid on update-readme  https://github.com/goodwid/github-pr-monitor/pull/292
</pre>


<pre>

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
</pre>

`PRs config 

### To use this project with BitBar:

- add your github token  `pr-monitor config -g <token>`
- add your repository `pr-monitor config -a <org>/<repo>`
- set your default display `pr-monitor config -d bitBar`
- create a symbolic link from your bitbar dir to `index.js`:  `ln -s pr-monitor /path/to/bitbar/github-pr-5m.js'

For other use, follow the first three steps, and roll your own monitoring (conky? rainmeter?)
