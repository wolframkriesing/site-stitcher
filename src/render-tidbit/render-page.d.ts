import {Tidbit} from "../load-tidbit/Tidbit";

type IndexPageProductionDependencies = {
  writeFile?: (filename: Filename, content: string) => Promise<void>;
  renderPage?: (data: PlainObject) => string;
}
type SinglePageProductionDependencies = {
  writeFile?: (filename: Filename, content: string) => Promise<void>;
  renderPage?: (data: PlainObject) => string;
}

export function renderAndWriteTidbitsIndexPage(deps?: IndexPageProductionDependencies):
    (tidbits: Tidbit[], renderParams: PlainObject) => Promise<void>;

export function renderAndWriteTidbitPages(deps?: SinglePageProductionDependencies):
    (tidbits: Tidbit[], renderParams: PlainObject) => Promise<void>;
