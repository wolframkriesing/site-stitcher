# Tidbits

Find tiny pieces of code, commands, snippets, stuff that I find interesting, useful
or where I know that I will search for it again but it's not worth writing an
entire blog post about. Just make it findable. My private stackoverflow, without
the wrong code that one could copy ;).

## Capitalization Rules for Headlines

I didn't know that for English ["sources disagree on the details of capitalizing prepositions"](https://en.wikipedia.org/wiki/Capitalization#Titles). I read so often "capitalize all words of four letters or more". What an arbitrary rule is that? Ok, I will try to follow it.\
There are a couple (SEO) sites that capitalize your headline, you'll find them when you need 'em.

## Free Disk Space Used by Docker

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

