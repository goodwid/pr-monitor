# Github pull request monitor

This started out as a [BitBar](https://getbitbar.com/) plugin. I had spun off another script that outputs direct to the console for general purpose usage, then realized it needed more work.

It has evolved into a single terminal app that has configuration options, storing the Github token and repositories to track.


To use this project with BitBar:

- add your github token  `pr-monitor config -g <token>`
- add your repository `pr-monitor config -a <org>/<repo>`
- set your default display `pr-monitor config -d bitBar`
- create a symbolic link from your bitbar dir to `index.js`:  `ln -s pr-monitor /path/to/bitbar/github-pr-5m.js'

For other use, follow the first three steps, and roll your own monitoring (conky? rainmeter?)
