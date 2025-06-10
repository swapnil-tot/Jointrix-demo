import React from "react";
import emojiMap from "./emojiMap";


function renderInlineTag(node: any, index: any, tag: string) {
  return React.createElement(tag, { key: index }, node.children.map(renderNode));
}

export function renderNode(node: any, index: any) {
  switch (node.type) {
    case 'heading':
      return renderInlineTag(node,index,`h${node.depth}`)
    case 'strong':
      return renderInlineTag(node, index, 'strong');
    case 'emphasis':
      return renderInlineTag(node, index, 'em');
    case 'delete':
      return renderInlineTag(node, index, 'del');
    case 'text':
      return node.value
    // ... other cases
    default:
      return null;
  }
}


// Replace shortcodes/emoticons with emoji
function replaceEmojis(text: string): string {
    return text.replace(/:[a-zA-Z0-9_+-]+:|:-\)|:-\(|;\)|8-\)/g, match => emojiMap[match] || match);
}


export function renderTextNode(value: any, index: number) {
  const parts = [];
  let remaining = replaceEmojis(value);
  const regex = /(\^([^^]+)\^)|(~([^~]+)~~)|(==([^==]+)==)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push(remaining.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push(<sup key={`${index}-sup`}>{match[2]}</sup>);
    } else if (match[3]) {
      parts.push(<sub key={`${index}-sub`}>{match[4]}</sub>);
    } else if (match[5]) {
      parts.push(<mark key={`${index}-mark`}>{match[6]}</mark>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < remaining.length) {
    parts.push(remaining.slice(lastIndex));
  }
  return <React.Fragment key={index}>{parts}</React.Fragment>;
}