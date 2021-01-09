# The big Plan

Some things run in parallel, those are in chapters.

## jskatas.org
- [ ] sustainability
  - [ ] content findability
    - [ ] post on "Learn and re-learn (all of JavaScript), at your level and your speed"
  - [ ] store state of progress  
- [ ] make each kata's test description a page (using test-stitcher) SEO indexable, so jskatas.org is found when searching on google
  - [ ] render the meta data in a useful way, eg. dependencies of katas, more in depth links (e.g. with quotes)
- [ ] eventually show a completeness compared to the ECMAScript spec, once all is covered it will be the year 3000 anyways ;)
- [ ] requires some More HTML components (code editor, test runner, ...)
- [ ] offer desktop learning and completing of the katas using More HTML components on the page (not in tddbin)
- [ ] store progress in a private storage, such as jsonbin.org, solid, or alike

## picostitch.com - The Blog Where all Strings Come Together
- [ ] **Make picostitch a blog with more than just articles.**
  In order to experiment with new features and advanced functionality, some neat features that
  might go beyond the default blog need to be provided, for one to push the limits but also to
  be able to experiment with going different ways.
  - [ ] **Show stats**
    - [ ] stats per page, e.g. word count, headings count, lists, list items, counts word groups, e.g. 7x "web", 10x "css", etc.
    - [ ] stats menu item, which contains tags pages, word counts, most used words, etc.   
  - [ ] **Simplify pages**
    - [x] remove navi on the left
    - [ ] add all sub navigation items, so the URLs become really hackable, make /blog/2020/06/, /blog/2020/ and /blog/ work
  - [ ] **Dynamic homepage.**
    On the homepage I can try things like advanced links with previews, lists of articles when hovering
    over a tag, selecting, storing and maybe showing special content, webmentions etc. 

## site-stitcher, a Static Site Generator
- [ ] **Learn by building a purely static page, that offers all content without any JS.**
  Use More-HTML components mainly CBEs to extend the functionality and make it an amazing 
  blog experience that still scores very high in speed, which (needless to say)
  embraces a11y, progressive enhancement and degrades nicely.
- [ ] rendering via webmention.io  

## More HTML
- [ ] Components for jskatas.org
  - [ ] code editor component
  - [ ] test runner component
- [ ] **Define a clear API/language/structure for More HTML components.**
    For example, I can imagine kind of a hierarchy for the heading components "heading (or h1, h2, ...) - anchor", where 
    "heading (or h1, ...)" is the native HTML tag that gets extended and "anchor" is the feature that is
    provided. A native tag might get multiple features, to allow their composition allow naming each feature.
    Usable like this, e.g. `<h1 is=more-h1 anchor-show-link>...` where the "more-h1" CBE may provide all
    features, but the attributes can be referred to with a prefix "anchor" here.
  - [ ] Build docs/examples for More HTML components
    - [ ] Use site-stitcher for building the static sites!?
    - [ ] Have the API/structure (see above) in place
    - [ ] Build automated tests for the components, they should use the example pages

## Tools and Helpers
- [ ] **test-stitcher**, a tool to understand and "visualize" tests (by their description)
  in order to improve them
- [x] ~~**pico-tester**, a simple, fast and tiny test runner, that enforces test best practices~~ discontinued, mocha is doing all I need and is stable for a long time
- [ ] ci-tooling for codeberg (and others)
  - [ ] build a docker container for drone.io setup for one self
  - [ ] build another docker container, e.g. for jenkins - ONLY if configurable via files IN the repo
  - [ ] setup a server which people can use freely (with quota limitations)
  - [ ] if it scales join the e.V.
  - [ ] show how others can setup the CI env and we can offer self-hosted CI envs anyone can choose from
    and connect their repo to
  - [ ] find sponsors, ...


## Not Yet Started (Just Ideas)

### event-stitcher, a Web App on picotstitch.com
- [ ] read events from google calendar
- [ ] allow to mark events as "interesting", store that in my pod (solid, jsonbin, ...)
