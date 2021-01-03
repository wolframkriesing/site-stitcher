import {slug} from "../_shared/slug.js";

export class Tidbit {
  /**
   * @param raw {RawTidbit}
   * @return {Tidbit}
   */
  static withRawData(raw) {
    const tidbit = new Tidbit();
    tidbit.abstract = raw.abstract;
    tidbit.abstractAsHtml = raw.abstractAsHtml;
    tidbit.bodyAsHtml = raw.bodyAsHtml;
    tidbit.dateCreated = raw.dateCreated;
    tidbit.hasAbstractOnly = raw.hasAbstractOnly;
    tidbit.headline = raw.headline;
    tidbit.headlineAsHtml = raw.headlineAsHtml;
    tidbit.oldUrls = raw.oldUrls;
    tidbit.previewImage = raw.previewImage;
    tidbit.slug = raw.slug;
    tidbit._tagValues = raw.tags;
    return tidbit;
  }
  get _urlDatePart() {
    return this.dateCreated.split('-').slice(0, 2).join('/');
  }
  get url() {
    return '/tidbits/' + this._urlDatePart + '/' + this.slug + '/';
  }
  get tags() {
    return this._tagValues.map(t => ({value: t, slug: slug(t)}));
  }
  get previewImageUrl() {
    return '/tidbits/' + this._urlDatePart + this.previewImage.replace(/^.\./, '');
  }
}
