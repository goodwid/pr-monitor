# Pull Requests

This started out as a [BitBar](https://getbitbar.com/) plugin but I've spun off another script that outputs direct to the console for general purpose usage.

To use this project with BitBar:

- clone the repo, 
- copy `config.json.example` to `config.json` 
- add in the repos to monitor and your github key.
- create a symbolic link from your bitbar dir to `index.js`:  `ln -s /path/to/repo/index.js /path/to/bitbar/github-pr-5m.js'

For other use, follow the first three steps, and roll your own monitoring (conky? rainmeter?)
