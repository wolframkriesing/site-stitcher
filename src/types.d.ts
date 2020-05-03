type Filename = string;
type DateString = string; // can we say: 2000-01-01 as a type?
type DateTimeString = string; // can we say: "2000-01-01 10:00 CET" as a type? just like in https://schema.org/dateCreated it can also be both

// type AbsoluteUrl = string; // e.g. http://all.com/stuff.html
type RelativeUrl = string; // e.g. /blog/2000/01/01-post/
// type PicostitchUrl = AbsoluteUrl | RelativeUrl; // eventually, if possible let it be a real URL type

type PlainObject = {
  [key: string]: any;
};