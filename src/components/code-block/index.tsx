import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-js-extras.min';
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/themes/prism-okaidia.min.css';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

interface CodeBlockProps extends PropsWithChildren {
  'data-language': string;
}

type SrcLink = {
  title: string;
  url: string;
};

const CodeBlock: FC<CodeBlockProps> = props => {
  const { children, 'data-language': language } = props;
  let childrenClone = children;
  const ref = useRef(null);

  const getSrcLink = (): SrcLink | null => {
    if (typeof children === 'string') {
      const brIndex = children.indexOf('\n');
      const firstLine = children.slice(0, brIndex);
      const mark = '// src: ';
      const markBash = '# src: ';
      if (firstLine.startsWith(mark) || firstLine.startsWith(markBash)) {
        const match = firstLine.match(/\[(.+)\]\((.+)\)/);
        if (match && match.length === 3) {
          childrenClone = children.slice(brIndex + 1);
          return { title: match[1], url: match[2] };
        }
      }
    }

    return null;
  };

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current, false);
    }
  }, [children]);

  const srcLink = getSrcLink();

  return (
    <div className="code" aria-live="polite">
      {srcLink && (
        <div className="bg-[#272822] mb-[-1em] mt-2 px-2 py-1 rounded-t w-fit">
          <Link href={srcLink.url} target="_blank">
            {srcLink.title}
          </Link>
        </div>
      )}
      <pre ref={ref} className={`language-${language}`}>
        {childrenClone}
      </pre>
    </div>
  );
};

export default CodeBlock;
