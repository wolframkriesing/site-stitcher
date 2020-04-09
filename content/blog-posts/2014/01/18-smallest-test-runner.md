# Smallest test runner

IDEs are awesome, but sometimes in my way and setting up test runners
sometimes defeats the purpose of being fast with tests, which also
means having feedback constantly and continuously.

Thanks to
[@Christoph](http://twitter.com/c089) for showing me the shortest
test runner there is, it runs on the command line, like this:

    while true; do npm test; sleep 3; done;

it assumes of course, your tests can be run via `npm test`.

dateCreated: 2014-01-18 10:00 CET
---
tags:
tdd
testing

