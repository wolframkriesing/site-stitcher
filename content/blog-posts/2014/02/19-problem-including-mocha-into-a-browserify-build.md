# Problem including mocha into a browserify build

I don't get mocha to build with browserify, I always get

```
Error: Cannot find module '../suite' from '/Users/me/tddbin-frontend/node_modules/mocha'
```

The problems mentioned in [those][22] [issues][23] seem to have no solution provided yet.
It seems that browserify picks up a built `mocha.js` and can't handle some magic done in there.  
My solution for now is to use [mocha from the CDN][24], which might not work in all use cases, but does for me now.

[22]: https://github.com/mochajs/mocha/issues/1316
[23]: https://github.com/mochajs/mocha/issues/880
[24]: http://cdnjs.com/libraries/mocha
---
created_at: 2014-02-19 10:00 CET
---
intro: 
---
tags:

javascript
testing
mocha
---
post_type: mini-post
