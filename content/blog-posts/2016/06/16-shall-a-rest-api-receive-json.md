dateCreated: 2016-06-16 10:00 CET  
tags: API, software design, JSON, REST, HTTP, knowledgebase    

# Shall a (rest) API receive JSON or "standard" POST params?

This topic came up today when we discussed the #crewmeister API, and made me think.
Until I remembered that we once in a project used to use the pure
POST params, which are basically key-value pairs.
And the question also reminded me of my PHP times, there
the server-side knew how to handle a key which looks like `user[0]`
and builds and array. But when I ran into that problem back then
we used to use python and there we didn't have that.

Final answer: Use JSON where possible! There might be some overhead
(if you don't use nodejs) on the backend, because you will need a
JSON decoder. But therefore you have a well-defined format for
receiving the data.
Transfer binary data, like image uploads in separate requests
encoded accordingly and you will be fine, I think.
