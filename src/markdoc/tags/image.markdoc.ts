import Image from 'next/image';

export default {
  render: Image,
  attributes: {
    width: {
      type: Number,
      default: '500',
      errorLevel: 'critical',
      required: true,
    },
    height: {
      type: Number,
      default: '500',
      errorLevel: 'critical',
      required: true,
    },
    src: {
      type: String,
      errorLevel: 'critical',
      required: true,
    },
    alt: {
      type: String,
      errorLevel: 'critical',
      required: true,
    },
  },
};
