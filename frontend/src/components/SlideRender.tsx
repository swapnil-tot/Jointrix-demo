import React from 'react';
import { markdownStore } from '../store/markdownStore';
import parseMarkdownToAST from '../markDownParser';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import { renderTextNode } from '../utils/functions';


const defMap: any = {};

function getDefinitions(ast: any) {
    for (const node of ast?.children) {
        if (node.type === 'definition' || node.type === 'footnoteDefinition') {
            defMap[node.identifier] = node;
        }
    }
    return defMap;
}


function renderFootnotes() {
    return (
        <section className="footnotes">
            <hr />
            <ol>
                {Object.entries(defMap).map(([id, node]) => (
                    node?.type === "footnoteDefinition" && <li key={id} id={`fn-${id}`} >
                        {node?.children?.map(renderNode)}
                        <a href={`#fnref-${id}`} style={{ display: 'inline' }}>↩</a>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export function renderNode(node: any, index: any) {
    switch (node.type) {
        case 'heading':
            const HeadingTag = `h${node.depth}`;
            return <HeadingTag>{node.children.map(renderNode)}</HeadingTag>;
        case 'paragraph':
            return <p key={index}>{node.children.map(renderNode)}</p>;
        case 'list':
            return node?.ordered ? <ol key={index}>{node.children.map(renderNode)}</ol> : <ul key={index}>{node.children.map(renderNode)}</ul>
        case 'listItem':
            return <li key={index}>{node.children.map(renderNode)}</li>;
        case 'inlineCode':
            return <code>{node.value}</code>;
        case 'code':
            return (
                <pre key={index}>
                    <code className={`language-${node.lang || 'javascript'}`}>{node.value}</code>
                </pre>
            );
        case 'blockquote':
            return <blockquote key={index}>{node.children.map(renderNode)}</blockquote>;
        case 'html':
            return <span key={index} dangerouslySetInnerHTML={{ __html: node.value }} />;
        case 'strong':
            return <strong key={index}>{node.children.map(renderNode)}</strong>;
        case 'emphasis':
            return <em key={index}>{node.children.map(renderNode)}</em>;
        case 'delete':
            return <del>{node.children.map(renderNode)}</del>;
        case 'link':
            return <a href="${node.url}" title="${node.title || ''}">{node.children.map(renderNode)}</a>;
        case 'image':
            return <img src={`${node.url}`} alt={`${node.alt}`} title={`${node.title} || ''`} height={100} />;
        case "thematicBreak":
            return <hr></hr>;

        case 'imageReference': {
            const def = defMap[node.identifier];
            if (def) {
                const alt = node.alt || '';
                const titleAttr = def.title ? ` title="${def.title}"` : '';
                return <img src={`${def.url}`} alt={`${alt}`} title={`${titleAttr}`} height={100} />;
            }
            return '';
        }

        case 'footnoteReference':
            const def = defMap[node.identifier]
            return (
                <sup key={index} id={`fnref-${def.identifier}`}>
                    <a href={`#fn-${def.identifier}`}>[{def.identifier}]</a>
                </sup>
            );

        case 'footnote':
            return (
                <sup key={index} className="inline-footnote">
                    {node.children.map(renderNode)}
                </sup>
            );

        case 'table':
            return (<table cellPadding={0} cellSpacing={0}><tbody>{node.children.map(renderNode)}</tbody></table>)
        case 'tableRow':
            return (<tr key={`${index}-row`} >{node.children.map(renderNode)}</tr>)
        case 'tableCell':
            return (<td key={`${index}-column`}> {node.children.map(renderNode)}</td>)

        case 'text':
            return renderTextNode(node.value,index)
        default:
            return null;
    }
}


export default function SlideRenderer() {

  const getActiveSlide = markdownStore((s: { getActiveSlide: any; }) => s.getActiveSlide)
  const slide = getActiveSlide()
    // console.log(slide)
  if (!slide) return null

    const ast = parseMarkdownToAST(slide.content)
    getDefinitions(ast)

    return (<div className="slide">
        {ast?.children?.map((node, i) => (
            <div key={i}>{renderNode(node, i)}</div>
        ))}
        {renderFootnotes()}
    </div>)
}
