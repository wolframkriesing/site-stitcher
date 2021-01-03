import * as marked from "marked";

export const slug = s => new marked.Slugger().slug(s);
