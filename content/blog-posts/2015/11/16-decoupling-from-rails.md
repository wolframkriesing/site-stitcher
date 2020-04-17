dateCreated: 2015-11-16 14:02 CET
tags: rails, testing  

# Decoupling from Rails

A [very good talk by Jim Weirich][decoupling-talk], where he shows how to pull the meat, the actual
business logic out of a rails app to make it testable in a fast manner concludes
with a very interesting idea.

[In the last minute of his talk][decoupling-idea] he presents an idea, where he proposes to use (cucumber) tests as
fast tests and flipping a switch to make them be your integration tests, that integrate the web 
pieces and allow a more thorough, but slower test run.

[decoupling-talk]: https://www.youtube.com/watch?v=tg5RFeSfBM4
[decoupling-idea]: https://youtu.be/tg5RFeSfBM4?t=4485
