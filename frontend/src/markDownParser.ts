import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive';
import type { Compatible } from 'vfile';

export default function parseMarkdownToAST(markdown: Compatible | undefined) {
  const tree = unified().use(remarkParse).use(remarkGfm).use(remarkDirective).parse(markdown);
  
  return tree;
}
