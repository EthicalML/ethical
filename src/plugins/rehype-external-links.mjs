import { isExternalHref } from '../utils/external-links.mjs';

export default function rehypeExternalLinks() {
  return (tree) => {
    const visit = (node) => {
      if (
        node.type === 'element' &&
        node.tagName === 'a' &&
        isExternalHref(node.properties?.href)
      ) {
        node.properties = { ...node.properties, target: '_blank', rel: ['noopener', 'noreferrer'] };
      }
      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
