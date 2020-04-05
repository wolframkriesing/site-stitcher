# TestStitcher can handle many files

[TestStitcher][3] can now not only handle one file but any number of files
(see [the commit that finished it][1]) and show the tests in a structured way, 
see [the README][2] for all details.

While doing that I discovered that passing too many argument to the file seems
to stop at some point, it just doesn't do anything. Reading [here][4] this seems
not to be the issue, I ran `getconf ARG_MAX` and it's above 200k, 
so that should not have been the issue.
Anyways, thinking about it for a while I thought of making TestStitcher read a 
`.test-stitcher.config.json` of a project, which lists all files that shall be read by TestStitcher. 
In the future it might also contain whatever configurations.

## What is TestStitcher?
Test stitcher, a small project that I had in my head for years, is taking shape.
Test-sticher reads test files and spits out the test descriptions in a structured 
way. I am a big fan of readable and useful tests. Starting with well structured
test descriptions sounds like a great start. But that is just the start, I got
quite some ideas and a vision behind this one, watch this site for more info.

[1]: https://github.com/wolframkriesing/test-stitcher/commit/c885965fe81529e38a0577d76f87f5faa74191e1
[2]: https://github.com/wolframkriesing/test-stitcher#test-stitcher
[3]: https://github.com/wolframkriesing/test-stitcher
[4]: https://www.in-ulm.de/~mascheck/various/argmax/