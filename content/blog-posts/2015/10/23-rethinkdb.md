dateCreated: 2015-10-23 10:00 CET  
tags: db    

# Rethink DB

RethinkDB is a topic that I had been investing some time into, because I tried to figure out which DB to use
for [cosmowiki]. What convinced me about: it is a DB which offers the
best of both worlds, the NoSQL world (schema "freedom") and SQL DB's relational data. RethinkDB
has [joins built-in][rethinkdb joins] as one of the core features. 
Besides built-in joins it claims to have a very simple scale out mechanism and almost magic, transparent
fail-over since version 2.1.

## Other RethinkDB links
* [Importing your data](http://rethinkdb.com/docs/importing/)
* [Third-party administration tools](http://www.rethinkdb.com/docs/third-party-admin-tools/)
* [JavaScript ReQL command reference](http://www.rethinkdb.com/api/javascript/)
* a very simple [admin tool for rethinkdb](https://github.com/neumino/chateau) that I used
* unfortunately there seem not many [community events](http://rethinkdb.com/community/) (listed here)
* [Thirty-second quickstart with RethinkDB](http://rethinkdb.com/docs/quickstart/)

Although, the [Architecture talk by Uncle Bob][1] also made me question myself if I really need a DB,
especially for [cosmowiki].

[1]: /blog/2015/10/21-architecture-the-lost-years/
[rethinkdb joins]: https://rethinkdb.com/docs/table-joins/
[cosmowiki]: https://github.com/cosmowiki/cosmowiki
