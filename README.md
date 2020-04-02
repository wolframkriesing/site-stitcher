# site-stitcher

Others would call it static site generator.
But tbh, I don't know where it goes. 
Currently this tool serves for creating my website https://picostitch.com

## Develop

Use `./run.sh /bin/bash` and you have a docker container containing the environment needed
to run this project. In there you can `npm install` to install all node deps.

- `./run.sh npm run build` to build the site
- `./run.sh npm run serve` to serve the site at http://localhost:5000
- `./run.sh npm run dev:test` to run the tests in watch mode, makes the feedback loop fast
- `./run.sh npm run dev:start` continuously updates the served files, just reload the browser, useful when developing 
  the templates etc.