dateCreated: 2014-03-20 14:00 CET
tags: npm, tool, nodejs, javascript, knowledgebase  
postTypes: summary
oldUrls: /blog/2014/03/npm-as-a-build-tool/

# How to Use npm as a Build Tool

I am sure my uxebu-partner [@Tobias] posted this link in our internal [flowdock][38] (never used it? do it now! it's Slack in better).
[@Tobias] knows all the tools.
  
And we at [uxebu] are not so big grunt, gulp, etc. fans we rather let npm do the jobs that
it just does well, so here are some pieces extracted from a great article about how to use [npm as build tool][39].

This pretty much sumarizes what you are going to read, if you follow [this link][39].

> some developers were brazen enough to present me with a Gruntfile and say "how could this be done in npm?!". I thought I'd pull out how-tos from the original draft and make a new post, just focussing on how to do these common tasks with npm.

Windows always comes in the way again, there are some good tips here how to work around it.

> 1) Rather than relying on built in commands, you could simply use alternatives - for example instead of using rm, use the npm rimraf package.  
> 2) Rather than trying to use syntax that is not cross compatible, stick to just the above ones. You'd be surprised just how much you can get done with just &&, >, |, and <.

Finally glob's `**` deciphered, for me :)

> such as *.js and expand the stars out as wildcards. Using two stars allows it to search recursively.

Version bumping is baked into NPM.

> This actually comes baked into npm (it is a package manager after all). Simply run npm version patch to increment the patch number (e.g. 1.1.1 -> 1.1.2), npm version minor to increment the minor version number (e.g. 1.1.1 -> 1.2.0) or npm version major (e.g. 1.1.1 -> 2.0.0).

[@Tobias]: http://twitter.com/tklipstein
[38]: http://flowdock.com
[uxebu]: http://uxebu.com
[39]: http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
