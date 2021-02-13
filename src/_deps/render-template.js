import nunjucks from "nunjucks";
import {TEMPLATES_DIRECTORY} from "../config.js";
import {toReadableDate, toReadableYearAndMonth, toWeekday} from "../_shared/date.js";

const nunjucksOptions = {
  autoescape: true,
  throwOnUndefined: true,
  trimBlocks: true,
  lstripBlocks: true,
};

const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(TEMPLATES_DIRECTORY), nunjucksOptions);
nunjucksEnv.addFilter('toReadableDate', toReadableDate);
nunjucksEnv.addFilter('toReadableYearAndMonth', toReadableYearAndMonth);
nunjucksEnv.addFilter('toWeekday', toWeekday);

/**
 * @param templateFilename {string}
 * @param data {PlainObject}
 * @return {string}
 */
export const renderTemplate = (templateFilename, data) => {
  try {
    return nunjucksEnv.render(templateFilename, data);
  } catch (e) {
    return `<h1>ERROR rendering this page</h1><pre>${e.stack}</pre>`;
  }
}

export const renderString_forTesting = (s, data) => {
  return nunjucksEnv.renderString(s, data);
}

