import * as marked from "marked";

export class Tidbit {
  /**
   * @param raw {PlainObject}
   * @return {Tidbit}
   */
  static withRawData(raw) {
    const tidbit = new Tidbit();
    tidbit.headline = raw.headline;
    tidbit.abstract = raw.abstract;
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
}
