import * as marked from "marked";

const slug = s => new marked.Slugger().slug(s);

export class Tidbit {
  static withRawData(raw) {
    const tidbit = new Tidbit();
    tidbit.abstractAsHtml = raw.abstractAsHtml;
    tidbit.bodyAsHtml = raw.bodyAsHtml;
    tidbit.dateCreated = raw.dateCreated;
    tidbit.hasAbstractOnly = raw.hasAbstractOnly;
    tidbit.headline = raw.headline;
    tidbit.oldUrls = raw.oldUrls;
    tidbit.slug = raw.slug;
    tidbit._tagValues = raw.tags;
    return tidbit;
  }
  get url() {
    const datePart = this.dateCreated.split('-').slice(0, 2).join('/');
    return '/tidbits/' + datePart + '/' + this.slug + '/';
  }
  get tags() {
    return this._tagValues.map(t => ({value: t, slug: slug(t)}));
  }
}
