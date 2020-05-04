import * as marked from "marked";

export class Tidbit {
  /**
   * @param raw {PlainObject}
   * @return {Tidbit}
   */
  static withRawData(raw) {
    const tidbit = new Tidbit();
    tidbit.bodyAsHtml = raw.bodyAsHtml;
    tidbit.headline = raw.headline;
    tidbit.abstractAsHtml = raw.abstractAsHtml;
    tidbit.dateCreated = raw.dateCreated;
    tidbit.tags = raw.tags;
    tidbit.oldUrls = raw.oldUrls;
    return tidbit;
  }
  /**
   * @return {RelativeUrl}
   */
  get url() {
    const datePart = this.dateCreated.split('-').slice(0, 2).join('/');
    const slug = new marked.Slugger().slug(this.headline);
    return '/tidbit/' + datePart + '/' + slug + '/';
  }
  headlineAsHtml(depth) {
    const headingPrefix = new Array(depth).fill('#').join('') + ' ';
    return marked.parse(headingPrefix + this.headline);
  }
}
