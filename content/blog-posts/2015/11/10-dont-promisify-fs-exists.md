dateCreated: 2015-11-10 09:53 CET  
tags: javascript, async  

# Don't promisify `fs.exists`

Don't promisify `fs.exists` since this does not play by the rules of node style callback params,
where the first one should be err and then data. It seems this does return only the data, which
[promisify] understands as an error and does throw right away. Instead do what the 
[node js docs suggest][promisify-nodejsdocs] 
too and use `fs.access` instead, like so: `promisify(fs.access)(aPath, fs.R_OK)`.
See it in action [here in the cosmowiki].

[promisify]: https://github.com/digitaldesignlabs/es6-promisify
[promisify-nodejsdocs]: https://nodejs.org/api/fs.html#fs_fs_exists_path_callback
[promisify-inuse]: https://github.com/cosmowiki/cosmowiki/blob/f027f758f9db6779175b2bb9595684fb6a3776c6/src/scripts/minify-json/many-files.js#L15
