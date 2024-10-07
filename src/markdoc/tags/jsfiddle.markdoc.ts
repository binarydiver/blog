import JsFiddle from '@/components/jsfiddle';

export default {
  render: JsFiddle,
  attributes: {
    width: {
      type: String,
      default: '100%',
      errorLevel: 'critical',
      required: true,
    },
    height: {
      type: String,
      default: '500',
      errorLevel: 'critical',
      required: true,
    },
    src: {
      type: String,
      errorLevel: 'critical',
      required: true,
    },
  },
};
