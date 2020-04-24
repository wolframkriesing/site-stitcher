# Tidbits

Find tiny pieces of code, commands, snippets, stuff that I find interesting, useful
or where I know that I will search for it again but it's not worth writing an
entire blog post about. Just make it findable. My private stackoverflow, without
the wrong code that one could copy ;).

## OKRs are Works in Progress

I read it multiple times already in [Measure What Matters](https://www.goodreads.com/book/show/39286958-measure-what-matters)
by John Doerr, that OKRs are flexible. I normally underline those things, but now I have to note it somewhere where I can find it again without physically needing the book. On page 54 he writes

> Remember that an OKR can be modified or even scrapped at any point in its cycle. Sometimes the "right" key results 
> surface weeks or months after a goal is put into play.

The TL;DR for me is the sentence after it

> OKRs are inherently works in progress, not commandments chiseled in stone.

**Learning and mastering OKRs takes time and practice.** On page 68 Brett Kopf of Remind says:

> OKRs are basically simple, but you don't master the process off the bat. Early on, we'd be off by 
> miles in our company-level objectives, mostly on the way-too-ambitious side.

## Capitalization Rules for Headlines

I didn't know that for English ["sources disagree on the details of capitalizing prepositions"](https://en.wikipedia.org/wiki/Capitalization#Titles). I read so often "capitalize all words of four letters or more". What an arbitrary rule is that? Ok, I will try to follow this and capitalizing all "major words", they call them.\
There are a couple (SEO) sites that capitalize your headline  correctly, you'll find them when you need 'em.

## Free Disk Space Used by Docker

TL;DR use any/all of `docker system prune`, `docker container prune`, `docker image prune`,  `docker volume prune` or `docker network prune` to free the according space.

Use `docker system df` to look at the disk space used by docker, to see if it is worth it, or to be better informed.
I got this output:
```
> docker system df
TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              125                 12                  15.27GB             15.03GB (98%)
Containers          53                  0                   12.6GB              12.6GB (100%)
Local Volumes       24                  9                   344.2MB             295.4MB (85%)
Build Cache         169                 0                   5.8GB               5.8GB
```

Now that you know, you can free the memory with:
```
> docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

Are you sure you want to continue? [y/N] y
Deleted Containers:
0b6aafd9ce1d346bec7470f6042b6e1b30516973e096ef1954ccd823f9bb846a
...
```

After that  no containers to be removed anymore, proof:
```
> docker container prune
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Total reclaimed space: 0B
```

Run `docker image prune --all` to gain a lot of disk space with the trade off of removing all your images, which will be downloaded when needed again.

## Upgrade npm Package to Latest Version

Run `npm install <package>@latest` to update to the latest version of a package, 
no matter the minor, major version, it always goes to the latest.

##  Diff of the Files in Two Directories

`diff --recursive <dir1> <dir2>` to diff the files and their contents in two directories
I just needed to do some golden master tests after updating a dependency

## MacOS Screenshot of the Current Window Only

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">
    MacOS: Woa, I didn&#39;t know you can take screenshots of windows with transparent backround 
    by doing CMD+Shift+4 and then hitting the space bar. 🤯 
    <a href="https://t.co/WjdV15q4H0">pic.twitter.com/WjdV15q4H0</a></p>
    &mdash; Nikolai Onken (@nonken) 
    <a href="https://twitter.com/nonken/status/1252701488046051328?ref_src=twsrc%5Etfw">April 21, 2020</a>
</blockquote>

