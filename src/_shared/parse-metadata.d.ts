import {BlogPostMetadata} from '../BlogPost';
import {TidbitMetadata} from "../load-tidbits/Tidbit";
import {Token} from 'marked';

export type MetadataParseConfig = {key: string, type: 'string'} | {key: string, type: 'array', separator: string}

export function parseMetadata(token: Token, configs: MetadataParseConfig[]): BlogPostMetadata | TidbitMetadata;
