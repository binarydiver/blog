import { FC, IframeHTMLAttributes } from 'react';

const JsFiddle: FC<IframeHTMLAttributes<HTMLIFrameElement>> = props => {
  return <iframe {...props} />;
};

export default JsFiddle;
