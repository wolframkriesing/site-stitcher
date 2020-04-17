dateCreated: 2015-11-16 14:21 CET
tags: code analytics, ruby  

# Run delta-flora

I was fighting a little bit with getting [Michael Feather][1]'s [delta-flora] to run, but made it finally.
My starter level of ruby knowledge made it not much simpler to get it to run :).
But in the end I succeeded doing the following steps.

1. `git clone git@github.com:michaelfeathers/delta-flora.git`
2. `cd delta-flora`
3. `gem install awesome-print` It was hard-core trying and reading (and trying to understand) error messages that
made me understand this :)
4. `cd lib`
5. open the ruby REPL by typing `irb`
6. `> load './repository.rb'`
7. `e = load_events("/Users/.../the/repo/path")` which will scan a repo
   and probably print out a lot like this
```
Calculating commit 1 of 3918
Calculating commit 2 of 3918
Calculating commit 3 of 3918
Calculating commit 4 of 3918
Calculating commit 5 of 3918
Calculating commit 6 of 3918
Calculating commit 7 of 3918
...
```

   the last number is the total number of commits in that repo.
8. and then you can run various methods like `> method_churns e` provided in the [analytics.rb][delta-flora-analytics]   
   to get some stats on the repo.
   
It might be worth digging a bit into [code_event.rb][delta-flora-codeevent] to see some more capabilities
of the analytics data.

If you reached this point and still have no clue what all this is about watch his talk
[The Hidden Dimension Of Refactoring][delat-flora-talk] at [craft conf 2015].

[1]: https://twitter.com/mfeathers
[delta-flora]: https://github.com/michaelfeathers/delta-flora
[delta-flora-analytics]: https://github.com/michaelfeathers/delta-flora/blob/756ae539250cc91afa4f853d508321d5552db256/lib/analytics.rb#L101
[delta-flora-codeevent]: https://github.com/michaelfeathers/delta-flora/blob/7dfde62fbdcf7c2b1c217d76556f43c1ddb77d58/lib/code_event.rb
[delat-flora-talk]: http://www.ustream.tv/recorded/61483799
[craft conf 2015]: http://craft-conf.com/2015
