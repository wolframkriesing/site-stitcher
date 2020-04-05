# Deploying to gh-pages after successful test run on travis

I wanted to just push my source code to github's master branch and all the deployment after that shall be automatic. 
Every dev-op reading this will say "yeah sure, wtf?".

To make it a bit simpler, I have a pure client-side
app, in this case http://tddbin.com. So I started searching and tweeting.  
It all started with this tweet and the initial [help from Stephan][24b] 
Then I worked through this [article][24a], which is actually wrong where it states the `travis-encrypt`
call. In short it has to be like this: `travis-encrypt -r tddbin/tddbin-frontend GH_TOKEN=<the token github gave you>`
and everything behind the repo name will be encrypted, you can also add multiple env vars and then use them.
Just like [I did it on tddbin][24c]. In order to have the env vars you encoded available 
you need to put the encrypted secret into the [.travis.yml file][24d].

[24a]: https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
[24b]: https://twitter.com/boennemann/status/568061867052163073
[24c]: https://github.com/tddbin/tddbin-frontend/blob/23eaa1eb4049da64ee3b941270e92f8fd13b10c0/scripts/deploy-to-ghpages.sh#L5
[24d]: https://github.com/tddbin/tddbin-frontend/blob/23eaa1eb4049da64ee3b941270e92f8fd13b10c0/.travis.yml#L10-L13
---
created_at: 2014-02-19 11:00 CET
---
tags:

gh-pages
devops
deploy
javascript
travis
tddbin
---
post_type: mini-post
