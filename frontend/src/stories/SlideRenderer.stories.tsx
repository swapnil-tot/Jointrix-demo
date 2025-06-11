import type { Meta, StoryObj } from '@storybook/react';
import SlideRenderer from '../components/SlideRender.tsx';
import { markdownStore } from '../store/markdownStore.ts';
import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

const meta = {
  title: 'Components/SlideRenderer',
  component: SlideRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SlideRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeadingsAndLists: Story = {
  args: {
    content: `# Markdown Headings

## Level 2 Heading
### Level 3 Heading
#### Level 4 Heading
##### Level 5 Heading
###### Level 6 Heading

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

### Ordered List
1. First item
2. Second item
   1. Nested item 1
   2. Nested item 2
3. Third item`  },
  decorators: [
    (Story) => {
      markdownStore.setState({
        slides: [
          {
            id: '1',
            title: 'Headings and Lists',
            content: `# Markdown Headings

## Level 2 Heading
### Level 3 Heading
#### Level 4 Heading
##### Level 5 Heading
###### Level 6 Heading

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

### Ordered List
1. First item
2. Second item
   1. Nested item 1
   2. Nested item 2
3. Third item`,
            layout: 'default'
          }
        ],
        activeSlideId: '1',
        isPending: false
      });
      return <Story />;
    }
  ]
};

export const CodeBlocks: Story = {
  args: {
    content: `# Code Examples

## JavaScript
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\``,
  },
  decorators: [
    (Story) => {
      markdownStore.setState({
        slides: [
          {
            id: '1',
            title: 'Code Examples',
            content: `# Code Examples

## JavaScript
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

## Python
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

## CSS
\`\`\`css
.button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}
\`\`\`

## Inline Code
Use \`const x = 42\` for constants.`,
            layout: 'default'
          }
        ],
        activeSlideId: '1',
        isPending: false
      });
      return <Story />;
    }
  ]
};

export const TablesAndImages: Story = {
  args: {
    content: '# Tables and Images\n\n## Basic Table\n| Name | Age | Role |\n|------|-----|------|\n| John | 30  | Dev  |\n| Jane | 28  | PM   |\n| Bob  | 35  | QA   |\n\n## Complex Table\n| Feature | Basic | Pro | Enterprise |\n|---------|-------|-----|------------|\n| Users   | 1-5   | 6-20| 20+        |\n| Storage | 1GB   | 10GB| 100GB      |\n| Support | Email | Chat| 24/7       |\n\n## Images\n![Sample Image](https://via.placeholder.com/400x200)\n\n## Image with Link\n[![Linked Image](https://via.placeholder.com/200x100)](https://example.com)',
  },
  decorators: [
    (Story) => {
      markdownStore.setState({
        slides: [
          {
            id: '1',
            title: 'Tables and Images',
            content: '# Tables and Images\n\n## Basic Table\n| Name | Age | Role |\n|------|-----|------|\n| John | 30  | Dev  |\n| Jane | 28  | PM   |\n| Bob  | 35  | QA   |\n\n## Complex Table\n| Feature | Basic | Pro | Enterprise |\n|---------|-------|-----|------------|\n| Users   | 1-5   | 6-20| 20+        |\n| Storage | 1GB   | 10GB| 100GB      |\n| Support | Email | Chat| 24/7       |\n\n## Images\n![Sample Image](https://via.placeholder.com/400x200)\n\n## Image with Link\n[![Linked Image](https://via.placeholder.com/200x100)](https://example.com)',

            layout: 'default'
          }
        ],
        activeSlideId: '1',
        isPending: false
      });
      return <Story />;
    }
  ]
};

export const AdvancedFeatures: Story = {
  args: {
    content: "# Advanced Markdown Features\n\n## Emojis\n:crying_face: :red_heart: :rocket: :star:\n\n## Images\n\n![Minion](https://octodex.github.com/images/minion.png)\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg \"The Stormtroopocat\")\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg  \"The Dojocat\" \n\n ==Marked text== \n\n ### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)\n\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n",
  },
  decorators: [
    (Story) => {
      markdownStore.setState({
        slides: [
          {
            id: '1',
            title: 'Advanced Markdown Features',
            content: `# Advanced Markdown Features\n\n## Emojis\n:crying_face: :red_heart: :rocket: :star:\n\n## Images\n\n![Minion](https://octodex.github.com/images/minion.png)\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat" \n\n ==Marked text== \n\n ### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.`,    
            layout: 'default'
          }
        ],
        activeSlideId: '1',
        updateSlideContent: (id: string, content: string) => {
          console.log('Content updated:', content);
          markdownStore.setState(state => ({
            slides: state.slides.map(slide =>
              slide.id === id ? { ...slide, content } : slide
            )
          }));
        },
        isPending: false
      });
      return <Story />;
    }
  ]
}; 