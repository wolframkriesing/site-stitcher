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
    return '/tidbit/' + datePart + '/' + this.slug + '/';
  }
  get slug() {
    return new marked.Slugger().slug(this.headline);
  }
}
