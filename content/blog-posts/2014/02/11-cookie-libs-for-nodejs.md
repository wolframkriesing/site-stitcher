dateCreated: 2014-02-11 10:00 CET  
tags: cookie, javascript, library  
postTypes: post  
oldUrls: /blog/2014/02/cookie-libs-for-nodejs/  

# Cookie libs for (node)js

If you want to dive into cookies, here is the [RFC6265]. I was looking around for some decent cookie libraries. There seem to be some
of them.

[RFC6265]: http://tools.ietf.org/html/rfc6265

And it is very irritating that some are as young as from last year.
I thought this topic is old enough so that there is one standard solution
and done. But I seem to be wrong. 
What all of them have in common is their quality of testing is quite interesting.
From nothing at all to hard core integration tests. Lot's of potential for 
refactoring projects.

https://github.com/jshttp/cookie  
The simplest cookie lib ever, I guess. Also great for understanding cookies well,
if it is complete - I don't know.
> cookie is a basic cookie parser and serializer. It doesn't make assumptions about how you are going to deal with your cookies. It basically just provides a way to read and write the HTTP cookie headers.

https://github.com/Ajnasz/ajncookie  
Basically the same feature set as the one above, though I really like
the API, it's so close to the request/response.
> A very simple cookie manager

https://github.com/pillarjs/cookies  
Seems to be pretty complex. Uses Keygrip underneath, so the actual lib is quite small. 
> Cookies is a node.js module for getting and setting HTTP(S) cookies. Cookies can be signed to prevent tampering, using Keygrip. It can be used with the built-in node.js HTTP library, or as Connect/Express middleware.

https://github.com/goinstant/tough-cookie  
The biggest one, that even implements cookieJar (a way to bundle and kinda anonymize/hide cookies). 
> RFC6265 Cookies and CookieJar for Node.js
