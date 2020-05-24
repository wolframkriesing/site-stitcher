dateCreated: 2020-05-23 15:26 CET
tags: css, html, web, learning, knowledgebase
isDraft: true

# Learning CSS Grid - Basics

Finally I need a CSS grid. Here is my intro to it.
If you prefer a video [this one (28 minutes)](https://www.youtube.com/watch?v=jV8B24rSN5o) explains grid basics very well.
But before learning CSS grid, I need to answer the question if I need it.
I know flexbox quite ok, so why not use flexbox. 

## The Question: Flexbox or Grid?
[MDN states](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Relationship_of_Grid_Layout#Grid_and_flexbox) 
flexbox best suits for one dimensional (row or column) and grid for two-dimensional layouts.

The most helpful explanation is given on the [MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Relationship_of_Grid_Layout#Content_out_or_layout_in),
distinguishing the two use cases quite well:

> An ideal **use case for flexbox** is when you have a set of items and want to space them out 
> evenly in a container. You let the size of the content decide how much individual space each item takes up.

> When you use **CSS Grid Layout** you create a layout and then you place items into it, or you allow the 
> auto-placement rules to place the items into the grid cells according to that strict grid.

The shorter, but less explicit one is:

> A simple question to ask yourself when deciding between grid or flexbox is:
>  
> - do I only need to control the layout by row or column – use a flexbox
> - do I need to control the layout by row and column – use a grid

I like to start using it as simple as possible, doing baby steps.
I start with `display: grid` and `grid: ...` properties.

## CSS Property `grid`

The CSS property `grid` ([MDN site](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)) 
is a [shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)
perfect for a simple grid setup to learn the power of CSS grid.

I use a surrounding HTML tag `<section>` that wraps our grid, it gets the `display:grid`
property and the grid's layout is determined by the `grid` property:
```
<section class="grid">
  <span>&updownarrow; ...</span>
  ...
</section>

<style>
  .grid {
    display: grid;
    grid: 3rem 100px / 1fr 50px 2fr;
  }
</style>
```

It renders like this:

<style>
.grid {
  margin-bottom: var(--spacing-big);
}
.grid > * {
  background-color: lightsalmon;
  border: 1px solid black;
}
.grid.grid1 {
  display: grid;
  grid: 3rem 100px / 1fr 150px 2fr; 
}
</style>
<section class="grid grid1">
    <span>&updownarrow; 3rem &nbsp; &leftarrow; 1fr &rightarrow;</span>
    <span>&leftarrow; 150px &rightarrow;</span>
    <span>&leftarrow; 2fr wide &rightarrow; (fr=fraction) </span>
    <span>&updownarrow; 100px</span>
    <span></span>
    <span></span>
    <span>&updownarrow; auto</span>
    <span></span>
    <span></span>
    <span>&updownarrow; auto</span>
    <span></span>
</section>

The `/` in the `grid: ...` property separates the definition for the row heights and column widths   
```
grid: <row heights> / <column widths>
```

The use of the `grid` shorthand only reflects part of what it can do.
Some explanations about the above code, if its all obvious skip them:
* The **`display: grid` must be set**, on the container that will be the grid, here the `<section>`.
* The **`grid: ...` property defines a grid template**, consisting of the columns widths and the rows heights.
* Only every row and column that is defined in the template is rendered with the given dimensions.
* All **row heights after the 2nd row fall back to `auto`**.
* We defined eleven SPANs, the grid template only defined three columns, a new row starts every three columns.
* The unit `fr` is described [in the spec like this](https://drafts.csswg.org/css-grid/#fr-unit): 
  > A flexible length or `<flex>` is a dimension with the `fr` unit, which represents a fraction of the 
  > leftover space in the grid container.

The short intro to the `grid` property makes it already possible to use it and create various grids.

## CSS Property `grid-template`

Above we used the shortest shorthand version, the CSS property `grid`.
```
grid: 3rem 100px / 1fr 150px 2fr;
```

The following means and renders the same. It is just a bit more explicit, 
still a shorthand for defining the row and column dimensions.
```
grid-template: 3rem 100px / 1fr 150px 2fr;
```

The explicit version is the following, and still renders exactly like all above.
```
grid-template-rows: 3rem 100px;
grid-template-columns: 1fr 150px 2fr;
```

Let's see how to be a bit more flexible, using a CSS function `repeat`.

## CSS Function `repeat()`
Above I defined very explicit how many columns, how many rows and their dimensions.
Using the CSS function [`repeat()`](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)
allows recurring pattern, like here:

``` 
display: grid;
grid: repeat(2, 3rem 100px) / repeat(3, 1fr); 
```

The function `repeat(2, 3rem 100px)` repeats `3rem 100px` twice.\
And `repeat(3, 1fr)` for the rows it repeats `1fr` three times.

<style>
.grid.grid2 {
  display: grid;
  grid: repeat(2, 3rem 100px) / repeat(3, 1fr); 
}
.grid.grid2 .marked {
  background-color: #fdc6b0;
}
</style>
<section class="grid grid2">
    <span>&updownarrow; 3rem &nbsp; &leftarrow; 1fr &rightarrow;</span>
    <span>&leftarrow; 1fr &rightarrow;</span>
    <span>&leftarrow; 1fr &rightarrow; </span>
    <span>&updownarrow; 100px</span>
    <span></span>
    <span></span>
    <span class="marked">&updownarrow; 3rem<br/>(not <code>auto</code> anymore)</span>
    <span class="marked"></span>
    <span class="marked"></span>
    <span class="marked">&updownarrow; 100px<br/>(not <code>auto</code> anymore)</span>
    <span class="marked"></span>
    <span class="marked"></span>
    <span>&updownarrow; auto</span>
    <span></span>
    <span></span>
    <span>&updownarrow; auto</span>
    <span></span>
    <span></span>
</section>
