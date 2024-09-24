import Heading from '@/components/heading';
import {
  Config,
  Node,
  RenderableTreeNode,
  Schema,
  Tag,
} from '@markdoc/markdoc';

// Or replace this with your own function
function generateID(
  children: RenderableTreeNode[],
  attributes: Record<string, any>
) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }
  return children
    .filter(child => typeof child === 'string')
    .join(' ')
    .replace(/[?|\/]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export const heading: Schema<Config, typeof Heading> = {
  render: Heading,
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = generateID(children, attributes);

    return new Tag(
      this.render as unknown as string, // wait to release https://github.com/markdoc/markdoc/pull/509
      { ...attributes, id },
      children
    );
  },
};
