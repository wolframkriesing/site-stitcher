# The magic dash in a Jinja template block

What the heck does `-%}` mean in a Jinja template?

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
[jinja-whitespace-control]: http://jinja.pocoo.org/docs/2.9/templates/#whitespace-control

dateCreated: 2017-01-21 10:00 CET
tags: jinja
template
spaceless
---
postTypes: post
