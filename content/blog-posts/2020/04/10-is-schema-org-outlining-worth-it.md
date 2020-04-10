dateCreated: 2020-04-10 22:16 CET  
tags: the web,  structured data,  schema.org,  SEO,  search engines  

# Is schema.org outlining worth it?

I am a big fan of structured data and making the data we have on the web more accessible, 
easier to use, simply more worth it is a very useful thing. How useful is it investing in
outlining your website's today? I found a couple articles and quotes on the web.

Structured data is not only useful for search engines. Just imagine all websites that are 
online can be understood by computers and could be applied to help us and answer questions
we currently still search the web for, read and try to understand things.

Well, I do try to outline my content as good as I can and while doing so I am always
asking myself: How useful is it? Do only search engines benefit from it? Are there any real
applications that use structured data?

Here is what I found and thought was interesting, unfortunately no one answer.

> Structured data's effect on rankings
>
> Whether structured data affects rankings has been the subject of much discussion and many 
> experiments. As of yet, there is no conclusive evidence that this markup improves rankings. 
> But there are some indications that search results with more extensive rich snippets 
> (like those created using Schema) will have a better click-through rate. For best results, 
> experiment with Schema markup to see how your audience responds to the resulting rich snippets.

From this site: https://moz.com/learn/seo/schema-structured-data

> There are a lot of benefits to schema, but they're generally all on the mechanical end of things. 
> They aren't direct benefits for your users, and they aren't necessarily going to be directly visible at all. 
> However, it builds a foundation for a lot of potential benefit, and clarity of information.

> About 99 times out of 100, you'll get a search ranking boost from implementing schema markup. 
> A lot of the time it will be a very minor boost, but occasionally you'll be able to get rich snippets and, 
> with them, more visibility in the search results. It's a potentially huge source of visibility, benefit, and ranking.

Found on https://www.seoblog.com/add-schema-blog-posts/

One hint I found very useful and we should never forget when applying structured data is the following:

> Only mark up what a user can see.

I stick to outlining my data, I see (and also hope) it's worth it.
Not only that, it also made it easy for me [structuring my code, naming attributes][2] like `dateCreated`, `headline`
and `abstract` for a blog post, on schema.org they have a [type BlogPosting][1] which I leaned on
and applied. This gives me less headaches with naming things, just look up all types on 
[schema.org's full hierarchy list][3].

[1]: https://schema.org/BlogPosting
[2]: https://github.com/wolframkriesing/site-stitcher/blob/6925dda07475850c656f12b5cbbf1f889764c5f4/src/BlogPost.d.ts#L5-L6
[3]: https://schema.org/docs/full.html
