dateCreated: 2021-01-19 00:17 CET
tags: testing, open source, readable code
isDraft: true

# More Readable Tests, Docs, ...

I used [axios] in a project and while I was reading the docs to
learn how multiple interceptors work, I had to dig all the way into the
tests and into the source code to finally understand it fully.

This led me to improve the tests to document how axios handles
multiple interceptors (as they call them).
I refactored the tests and added some, that imho make it more explicit
how it works. See [my branch here](https://github.com/wolframkriesing/axios/tree/document-multiple-inceptors).

In order to update the docs, which was my initial goal, I used test-stitcher,
to pull out the descriptions and massage them a little bit so they fit well into
the docs.
