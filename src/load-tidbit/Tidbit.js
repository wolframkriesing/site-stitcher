import * as marked from "marked";

const slug = s => new marked.Slugger().slug(s);

export class Tidbit {
  static withRawData(raw) {
    const tidbit = new Tidbit();
    tidbit.bodyAsHtml = raw.bodyAsHtml;
    tidbit.headline = raw.headline;
    tidbit.abstractAsHtml = raw.abstractAsHtml;
    tidbit.dateCreated = raw.dateCreated;
    tidbit._tagValues = raw.tags;
    tidbit.oldUrls = raw.oldUrls;
    tidbit.hasAbstractOnly = raw.hasAbstractOnly;
    return tidbit;
  }
  get url() {
    const datePart = this.dateCreated.split('-').slice(0, 2).join('/');
    return '/tidbits/' + datePart + '/' + this.slug + '/';
  }
  get slug() {
    return slug(this.headline);
  }
  get tags() {
    return this._tagValues.map(t => ({value: t, slug: slug(t)}));
  }
}
