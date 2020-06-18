# More HTML

## Mikado Plan

- [ ] **Learn by building a purely static page, that offers all content without any JS.**
  Use More-HTML components mainly CBEs to extend the functionality and make it an amazing 
  blog experience that still scores very high in speed, which (needless to say)
  embraces a11y, progressive enhancement and degrades nicely.
  - [ ] **Make picostitch a blog with more than just articles.**
    In order to experiment with new features and advanced functionality, some neat features that
    might go beyond the default blog need to be provided, for one to push the limits but also to
    be able to experiment with going different ways.
    - [ ] **Give picostitch a dynamic homepage.**
      On the homepage I can try things like advanced links with previews, lists of articles when hovering
      over a tag, selecting, storing and maybe showing special content, webmentions etc. 
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
       