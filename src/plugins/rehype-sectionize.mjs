function textContent(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(textContent).join('');
}

export default function rehypeSectionize() {
  return (tree) => {
    if (tree.type !== 'root') return;
    const output = [];
    let section;
    let number = 0;

    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') {
        number += 1;
        const title = textContent(node).trim();
        node.properties = {
          ...node.properties,
          className: [...(node.properties?.className ?? []), 'prose-section-title'],
        };
        section = {
          type: 'element',
          tagName: 'section',
          properties: {
            className: ['prose-section'],
            dataReveal: '',
            dataSectionNumber: String(number).padStart(2, '0'),
          },
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: { className: ['eyebrow', 'prose-section-eyebrow'] },
              children: [
                {
                  type: 'text',
                  value: `${String(number).padStart(2, '0')} — ${title.toUpperCase()}`,
                },
              ],
            },
            node,
          ],
        };
        output.push(section);
      } else if (section) {
        section.children.push(node);
      } else {
        output.push(node);
      }
    }

    tree.children = output;
  };
}
