dateCreated: 2014-01-10 10:00 CET
tags: git, github
postTypes: mini-post

# Deploy built files easier via gh-pages branch on github

I found it always painful to only update the gh-pages branch for
deploying to a custom domain, an easy solution is pushing a
subdirectory to gh-pages branch.

Like so:

    git subtree push --prefix docs origin gh-pages

found at [gsferreira.com](http://gsferreira.com/archive/2014/06/update-github-pages-using-a-project-subfolder/)
