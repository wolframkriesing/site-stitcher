dateCreated: 2020-05-24 15:26 CET
tags: css, html, web, learning, knowledgebase
isDraft: true

# Learning CSS Grid - 2????

## CSS Property `grid-template-rows` and `grid-template-columns`

Below, I use the aliases `grid-template-rows` and `grid-template-columns` for `grid-template`:
```
<style>
  .grid {
    display: grid;
    grid-template-rows: 2rem 50px;
    grid-template-columns: 1fr 100px 1fr;
  }
</style>
```
They render exactly the same.



<style>
.grid > * {
  background-color: lightsalmon;
  border: 1px solid black;
}
.grid.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; 
  grid-auto-rows: 2rem; 
  align-items: center; 
  justify-items: center;
}
</style>
<div class="grid grid2">
    <span>span one</span>
    <span>span two</span>
    <span>span three</span>
    <span>span four</span>
    <span>span five</span>
</div>


