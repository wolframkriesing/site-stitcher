# site-stitcher

Others would call it a static site generator.
But to be honest, I don't know where it goes. 
Currently this tool serves for creating the (mostly) static website https://picostitch.com

## Develop (run locally)

This project uses docker to provide the environment needed to run this site.
This way only docker and docker-compose are required for running this project locally.

```
> docker-compose up --detach # start the container(s) in the background
Creating network "site-stitcher_default" with the default driver
Creating picostitch ... done
> docker exec -it picostitch bash # enter the container
root@12345:/app# npm install 
root@12345:/app# npm run dev:start

...

Starting up http-server, serving _output
Available on:
  http://127.0.0.1:5000
  http://172.19.0.2:5000
Hit CTRL-C to stop the server
```

Now you should be able to open [localhost:5000](http://localhost:5000) and see the same thing as
on [picostitch.com](https://picostitch.com).

## npm commands

- `npm run build` to build the site
- `npm run build:assets` to build just the assets (building css and images and deploy them locally)
- `npm run serve` to serve the site at http://localhost:5000

- `npm run dev:test` to run the tests in watch mode, makes the feedback loop fast
- `npm run dev:typecheck`
- `npm run dev:start` continuously updates the served files, just reload the browser, useful when developing 
  the templates etc.