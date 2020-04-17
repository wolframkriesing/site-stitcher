dateCreated: 2015-11-10 09:53 CET  
tags: tests, mocha  

# Where do my tests go OR Run mocha tests with WebStorm IDE

I had been fighting for the last years, always again to make WebStorm run all my tests
the way I want. I moved tests into the `src` folder then back into a `tests` folder.
The latter is painful, since I have to keep the structures of two folders in sync that way,
which is just inefficient, especially when I refactor so much, which I think is simply 
necessary and the right thing to do.

So logical next step was to move the tests into the `src` directory. Making that run with 
mocha is not so simple, since mocha always wants to load all files in the given test directory.
And the pattern matching is too hard to use imho. To run mocha [I now use a `find`][testslay-1]
which is okish I would say. But this does not work in WebStorm, since I like to have the test runs
embedded and execute asap. After searching for a while [this seems to be the solution for using 
this approach in WebStorm][testslay-2].

[testslay-1]: https://github.com/cosmowiki/cosmowiki/blob/4f5abd6cffd99e0df0cb55c20534a8d7a95ae34d/package.json#L16
[testslay-2]: https://youtrack.jetbrains.com/issue/WEB-10437#comment=27-991595
