# Keep a github fork in sync

As often as I look for this, I need to write it down.
For example for my fork of [github:dropping-spray], which got inspired by this [tweet][19]
and the following discussion.

[github:dropping-spray]: https://github.com/Narigo/dropping-spray/
[19]: https://twitter.com/NarigoDF/status/567572946626297857

```bash
> # 1 - add the (so called) upstream repo so you can refer to it locally
> git remote add upstream git@github.com:Narigo/dropping-spray.git
> #2 - just double check it's there
> git remote -v
origin	git@github.com:wolframkriesing/dropping-spray.git (fetch)
origin	git@github.com:wolframkriesing/dropping-spray.git (push)
upstream	git@github.com:Narigo/dropping-spray.git (fetch)
upstream	git@github.com:Narigo/dropping-spray.git (push)
> # 3 - get up to date, I think in the flow as listed here its not needed, we are quite up to date
> git fetch upstream
> # 4 - fianlly merge in the latest stuff from the original repo
> git merge upstream/gh-pages
```

As you can see above, I merged the `gh-pages` branch and not `master`!
---
created_at: 2014-02-17 10:00 CET
---
tags:

github
fork
remote repo
sync
---
post_type: post
