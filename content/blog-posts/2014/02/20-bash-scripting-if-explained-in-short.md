dateCreated: 2014-02-20 10:00 CET
tags: bash, if, knowledgebase
postTypes: link-list
oldUrls: /blog/2014/02/bash-scripting-if-explained-in-short/

# Bash scripting "if" explained in short

Not sure if  I will ever get bash right, but little helpers like this explaining how "if" works
are always helpful (to me).

```bash
if [ "$1" == "something" ]; then     ## GOOD
if [ "$1" = "something" ]; then      ## GOOD
if [ "$1"="something" ]; then        ## BAD (operator spacing)
if ["$1" == "something"]; then       ## BAD (bracket spacing)

if [[ $a == z* ]]; then   # True if $a starts with a "z" (pattern matching).
if [[ $a == "z*" ]]; then # True if $a is equal to z* (literal matching).

if [ $a == z* ]; then     # File globbing and word splitting take place.
if [ "$a" == "z*" ]; then # True if $a is equal to z* (literal matching).
```

http://stackoverflow.com/a/18220301/21050

