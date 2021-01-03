import * as marked from "marked";

/**
 * @param s {string}
 * @return {string}
 */
export const slug = s => new marked.Slugger().slug(s);
