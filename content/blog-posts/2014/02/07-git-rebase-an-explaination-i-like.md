dateCreated: 2014-02-07 10:00 CET  
tags: git, rebase, knowledgebase  
postTypes: mini-post  
oldUrls: /blog/2014/02/git-rebase-an-explaination-i-like/  

# Git rebase, an explaination I like

I asked myself what branch rebase refers to. The one I want to rebase on or
the one I want to rebase from?

> Also notice that, like the git merge command, git rebase requires you to be on the branch that you want to move.

Thanks to the great [Rebasing][17] article I know now :). (And store it here, to know where to look it up).

In short. If I want to get my branch `about` to be back on top of master, I have
to rebase it onto master, like this:
```
git checkout about
git rebase master
```

As with everything, behave when rebasing! I believe that rebase is not meant for 
all situations. Sometimes it is much better to have a history visible in the commit
history.

[17]: http://rypress.com/tutorials/git/rebasing
