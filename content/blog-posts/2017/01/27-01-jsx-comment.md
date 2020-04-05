# Comments inside JSX

Sometimes I stumble over commenting out a part in my JSX template.
And I am always again looking for how to do that `{#` or `{--`
or what do I know.

That's how it works:

```text
const MyPage = () => {
  return (
    <div>
      this is visible
      {/*
        <div>should NOT { invisibleVar } rendered</div>
      */}
    </div>
  );
}
```

---
created_at: 2017-01-27 00:11 CET
---
tags:

react
jsx
comment
---
post_type: mini-post
