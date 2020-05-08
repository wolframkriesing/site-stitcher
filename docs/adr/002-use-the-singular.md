# 2. Use the Singular

## Status

Accepted

## Context

I have written and seen a lot of code where it was not clear what rules apply, where to find a certain
file, how to write the import correctly and bugs caused by those missing definitions.

I just renamed a file from "tidbit/render-pages.js" to "tidbit/render-page.js" (the new name is singular) 
even though this file contains multiple page-render functions. But if I will start naming a file
depending of how many page-render function it contains I will have more work renaming and might intro bugs
(I know I have tests to prevent that, but they are not almighty either). I need one way to do it.

## Decision

Use the singular for as much consistency as possible.
As usual really good reasons for exceptions exist, but ask yourself many times if the exception is
worth dropping consistency for.

## Consequences

- it might feel cumbersome in the beginning
+ consistency
+ no time needed to search, just know names