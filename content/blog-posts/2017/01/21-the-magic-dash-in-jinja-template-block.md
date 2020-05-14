dateCreated: 2017-01-21 10:00 CET  
tags: jinja, template, spaceless  
postTypes: post, knowledgebase    
oldUrls: /blog/2017/01/the-magic-dash-in-jinja-template-block/  

# What is `-%}` for, in a Jinja Template? or The Magic Dash in a Jinja Template Block

What the heck does `-%}` mean in a Jinja template?  
TL;DR: It removes whitespaces inside a block. The offical docs say it "strip[s] whitespace in templates [...] add a minus sign (-) to the start or end of a block", so `{%- ` at the end of the block works too, but you better [play with around with it to really understand it][try-jinja] the dash is quite flexible.

## Example with all Whitespaces Removed - A lot of Dashes Used

```
Dear {{- name -}}
,

{%- if not asleep -%}    
  <p>
  Welcome!
  </p>
{%- endif -%}

The end
```

Notice the **six dashes**, not only in blocks `{%-`  and `-%}` but also when rendering variables `{{-` and `-}}`. (I did not find this in the docs though). The above template renders out the following result:

```
DearJane,<p>
··Welcome!
··</p>The·end
```

## Example with No Whitespaces Removed - no dashes used

The same template, just  **all dashes removed** looking like this:

```
Dear {{ name }}
,

{% if not asleep %}    
  <p>
  Welcome!
  </p>
{% endif %}

The end
```

renders a lot spaces and newlines:

```
Dear·Jane
,

····
··<p>
··Welcome!
··</p>


The·end
```

FYI: I tried all of the above in [jinja.quantprogramming.com][try-jinja].

## I Discovered it Through Lektor

By using Lektor I need to learn [Jinja][jinja], the template engine used. And I have to say it has the addons that I had always wished for in Django's template language (swig). For example there is `else` for the `for` loop, which applies when there is nothing to loop over.

And while looking for a tag system I came across [lektor-tags] which looks like the tag power and simplicity I need. While trying to get it to run, I came across this piece of Jinja template:
```jinja
{% for t in this.tags -%}
  #{{ t }}
{% endfor %}
```
and I saw this typo in there **`-%}`**, so I removed the `-`, since I thought it was a typo. Later I saw it more often, even in an `if` and in `macro` and before `endmacro` too. So I figured it was not a typo. And it wasn't :).

So I started hunting the documentation. I found places where `-%}` was used but it was never described what the dash was for. Until I finally found it, of course by accident. In the [Jinja docs in the chapter Whitespace Control][jinja-whitespace-control] it says the following:
> You can also strip whitespace in templates by hand. If you add a minus sign (-) to the start or end of a block (e.g. a For tag), a comment, or a variable expression, the whitespaces before or after that block will be removed:
>
> ```jinja
> {% for item in seq -%}
>   {{ item }}
> {%- endfor %}
> ```

What a blessing. Something we always wanted in a template language. I remember back in the django days, the verbose `{{ spaceless }}` was quite noisy. I think this is a smart, simple and great addition. I am just not sure if the trade-off in time I spent to figure out what the magic is good for could be improved. Suggestions and ideas welcome.

[jinja]: http://jinja.pocoo.org/
[lektor-tags]: https://pypi.python.org/pypi/lektor-tags
[jinja-whitespace-control]: https://jinja.palletsprojects.com/en/2.11.x/templates/#whitespace-control
[try-jinja]: http://jinja.quantprogramming.com
