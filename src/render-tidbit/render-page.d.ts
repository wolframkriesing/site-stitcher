import {Tidbit} from "../load-tidbit/Tidbit";

type ProductionDependencies = {
  writeFile: (filename: Filename, content: string) => Promise<void>
}

export function renderAndWriteTidbitsIndexPage({writeFile}: ProductionDependencies):
    (tidbits: Tidbit[], renderParams: PlainObject) => Promise<void>;

export function renderAndWriteTidbitPages({writeFile}: ProductionDependencies):
    (tidbits: Tidbit[], renderParams: PlainObject) => Promise<void>;
