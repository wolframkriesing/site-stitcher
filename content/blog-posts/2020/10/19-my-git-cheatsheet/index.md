dateCreated: 2020-10-19 12:34 CET
tags: git, tools, cheatsheet

# My Git Cheatsheet

Since I moved to Linux for work I started to look up and collect the git commands I need most. 
On Linux I do not have my beloved [GitUp app](https://gitup.co/)
which is an amazing visual and fully keyboard controllable git tool available for MacOS only.
Here is my list of git commands. As usual I created this collection so I know where to copy+paste commands from ;).

## Branch stuff
| Command | What it does |
| --- | --- |
| `git checkout -t -b <branch-name>` | Create new branch |
| `git checkout -b branchxyz origin/branchxyz` | Checkout branch from origin |
| `git push -u origin feature` | Push a NEW branch to origin |
| `git push origin` | Push updates for a branch that is already at origin |
| `git branch --delete <branch name>` | Delete a local branch |
| `git branch --move <old-name> <new-name>` | Rename a local branch |
| `git branch` | List all local branches |
| `git fetch; git branch --all`<br/>`git fetch; git branch -a` | List all local AND remote branches, before fetch all branch info from remote  |
| `git checkout about`<br/>`git rebase main`<br/>`git push origin --force-with-lease` | I want to get my branch "about" to be on top of "main", and push it without overriding updates in `origin` |
| `git checkout --track origin/remote-branch` | Checkout a remote branch locally, with tracking  |

## Commit
| Command | What it does |
| --- | --- |
| `git commit -m 'message' filename.js` | Commit one file |
| `git commit -am` | Open an editor and commit ALL changed files |
| `git commit -am "My message"` | Add and commit ALL changed files with the given message |
| `git add -p` <br/>OR<br/> `git commit -p` | Commit parts of a file (so called hunks), most useful next options: y,n,s |
| `git commit --amend` | Amend the last commit |
| `git checkout -- <file-name>` | Reset file to last commit |

## Others
| Command | What it does |
| --- | --- |
| `git diff --cached` | See the staged code |
| `git fetch origin` | Update local branch with branches from origin |
| `git log <branchname>` | Shows the log of that branch |
| `git cherry-pick <commit hash>` | Cherry pick a certain commit |

## Visual Tool on Linux
There is one visual tool I use on Linux though, which is [git cola](https://git-cola.github.io/).
Thanks to [@d4nyll](https://twitter.com/d4nyll) for suggesting it:

<blockquote class="twitter-tweet">
    <p lang="en" dir="ltr">
        Git Cola is not the most attractive, but it has everything I need. I&#39;ve used GitKraken, but it eats a lot of my memory and it&#39;s not free.
    </p>
    &mdash; Daniel Li (@d4nyll) <a href="https://twitter.com/d4nyll/status/1303282211702022144?ref_src=twsrc%5Etfw">September 8, 2020</a>
</blockquote>

