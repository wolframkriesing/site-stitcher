# Tests using `process.cpuUsage` and `process.memoryUsage`

slug: tests-using-processcpuusage-and-processmemoryusage
tags: javascript, nodejs, learning, testing, knowledgebase  
dateCreated: 2019-12-26 13:16 CET

Learning stuff about nodejs (or v8) while writing tests that ensure runtime behaviour, 
using process.cpuUsage and process.memoryUsage. Curious how brittle those tests become over time. 
Glad the app ALWAYS runs in the same docker container (dev and prod).

Originally posted at https://wolframkriesing.micro.blog/2019/12/26/learning-stuff-about.html

# Mocha's Magic `done` Parameter

slug: mochas-magic-done-parameter
tags: javascript, nodejs, mocha, testing, knowledgebase  
dateCreated: 2019-12-02 22:30 CET

Why a #mocha #test times out, when I write it like this: `it('...', _ => {});` but it does NOT time out, 
when I write: `it('...', () => {});`? Exactly, because the `_` is the magic `done`, that one needs to call.

Originally posted at http://wolframkriesing.micro.blog/2019/12/02/why-a-mocha.html
