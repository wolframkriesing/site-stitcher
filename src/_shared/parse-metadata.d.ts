import {BlogPostMetadata} from '../blog-post/BlogPost';
import {TidbitMetadata} from "../load-tidbit/Tidbit";
import {Token} from 'marked';

export type MetadataParseConfig = 
    {key: string, type: 'boolean'} | 
    {key: string, type: 'string'} | 
    {key: string, type: 'array', separator: string}

export function parseMetadata(token: Token, configs: MetadataParseConfig[]): BlogPostMetadata | TidbitMetadata;
