import * as marked from "marked";

const slug = s => new marked.Slugger().slug(s);

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
    tidbit._tagValues = raw.tags;
    tidbit.oldUrls = raw.oldUrls;
    return tidbit;
  }
  /**
   * @return {RelativeUrl}
   */
  get url() {
    const datePart = this.dateCreated.split('-').slice(0, 2).join('/');
    return '/tidbit/' + datePart + '/' + this.slug + '/';
  }
  get slug() {
    return slug(this.headline);
  }
  get tags() {
    return this._tagValues.map(t => ({value: t, slug: slug(t)}));
  }
}
