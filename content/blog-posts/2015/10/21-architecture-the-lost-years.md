dateCreated: 2015-10-21 10:00 CET    
tags: architecture, video, TDD, knowledgebase    

# Uncle Bob - Architecture: The Lost Years

In this talk, Uncle Bob starts to set the context for why our industry has a hard
time catching up with the speed and also why it is so important that we do
spend more time on mindfully constructing software.
It's worth spending those 1,5h watching this talk, or less if you 2x the video speed :).

> If our answer is `well, we had to get to market fast` that's not going to cut it

[at 18:57 min][architecture-1]

> If you believe the web constrains your architecture, you have lost the war from the beginning

[at 28:08 min][architecture-2]

> I don't want you to spend a lot of time debugging, I want you to spend a lot of 
> time getting tests to pass.

[at 46:33 min][architecture-3]

> Another word for testable is decoupled. That's how you make something testable, you decouple.

[at 49:56 min][architecture-4]

Talking about rotten code, which is mostly argued to be done for speeding up (to market) 
reasons. About that he says:
> You do the thing that slows you down in order to go fast.
> I will leave you to deal with the logical inconsistency there.

[at 50:41 min][architecture-5]

Why he says that we fear to touch bad code:
> If you break it becomes yours.

[at 51:41 min][architecture-6]

He goes into detail why TDD is necessary and summarizes it all like this: 
> We keep control over the code, by having a suite of tests that we trust.

[55:03 min][architecture-7]

Uncle Bob about inheritance (that some frameworks force you to do, e.g. inherit from their base class):
> And when you derive, you marry. Once you have inherited from somewhere 
> there is no way out of that.
> Now everything in those base classes come streaming into your classes
> and you are stuck with them.
> But it's a one way marriage, it's a harem. You are in the harem. The guy
> who owns the framework [where the base class comes from] he is not married to you.

[at 1:12:30 h][architecture-8]

> Here is the thing about frameworks, you should never trust them.

[at 1:13:20 h][architecture-9]

His conclusion, after talking about the creation of FitNess and that it never
actually needed a database, is

> A good architecture allows major decisions, to be delayed until you can make them 
> with the most information, instead of the least.
and
> A good architect maximizes the number of decisions, not made.

[at 1:19:05 h][architecture-10]

> You make the UI a plugin to your use case, you make the DB a plugin to your use case,
> all your frameworks become plugins to your use case, so that you in your application can 
> screw them and they can't screw you.

[at 1:22:06 h][architecture-11]

[architecture-1]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=1137
[architecture-2]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=1688
[architecture-3]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=2793
[architecture-4]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=2996
[architecture-5]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=3041
[architecture-6]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=3101
[architecture-7]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=3303
[architecture-8]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=4349
[architecture-9]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=4400
[architecture-10]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=4745
[architecture-11]: https://www.youtube.com/watch?v=HhNIttd87xs&feature=youtu.be&t=4925
