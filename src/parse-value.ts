import type { ValueNode } from './types';

/**
 * Parse a theme value string into a ValueNode for resolution
 * @example
 * parseValue("black palette") // { kind: "palette", ref: "black", value: 1 }
 * parseValue("1 rem") // { kind: "rem", value: 1 }
 */
export function parseValue(input: string): ValueNode {
  const parts = input.trim().split(/\s+/);

  // Handle palette references: "colorName palette"
  if (parts[1] === 'palette') {
    return { kind: 'palette', ref: parts[0], value: 1 };
  }

  const value = Number(parts[0]);

  if (isNaN(value)) {
    throw new Error(`Invalid value: "${input}". First part must be a number.`);
  }

  const unit = parts.slice(1).join(' ');

  switch (unit) {
    case 'px':
    case 'pixel':
    case 'pixels':
      return { kind: 'px', value };
    case 'rem':
    case 'root':
      return { kind: 'rem', value };
    case 'em':
    case 'parent':
      return { kind: 'em', value };
    case 'base':
    case 'spacing':
      return { kind: 'base', value };
    case 'innerGutter':
    case 'inner gutter':
      return { kind: 'innerGutter', value };
    case 'abs':
    case 'absolute':
      return { kind: 'absolute', value };
    default: {
      throw new Error(
        `Unknown unit: "${unit}". Valid units: px, rem, em, base, innerGutter, absolute, palette`
      );
    }
  }
}

/**
 * Resolve a value node to a CSS variable or value
 */
export function resolveValueNode(node: ValueNode): string {
  switch (node.kind) {
    case 'palette':
      return `var(--color-${node.ref})`;
    case 'px':
      return `${node.value}px`;
    case 'rem':
      return `${node.value}rem`;
    case 'em':
      return `${node.value}em`;
    case 'base':
      return `var(--space-base)`;
    case 'innerGutter':
      return `var(--inner-gutter)`;
    case 'absolute':
      return `${node.value}`;
    default: {
      const exhaustive: never = node;
      return exhaustive;
    }
  }
}