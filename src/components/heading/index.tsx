import { createElement, FC, PropsWithChildren } from 'react';

interface HeadingProps extends PropsWithChildren {
  id: string;
  level: number;
  className: string;
}

const Heading: FC<HeadingProps> = props => {
  const { id = '', level = 1, children, className } = props;
  return (
    <a href={`#${id}`} className="no-underline">
      {createElement(
        `h${level}`,
        {
          id,
          className: [
            'heading',
            className,
            'cursor-pointer',
            "hover:after:opacity-100 after:content-['_#'] after:opacity-0 after:transition-opacity after:duration-300 after:text-gray-500",
          ]
            .filter(Boolean)
            .join(' '),
        },
        children
      )}
    </a>
  );
};

export default Heading;
