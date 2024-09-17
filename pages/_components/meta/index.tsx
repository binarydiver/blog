import { BLOG_TITLE, SITE_URL } from '@/pages/_lib/constants';
import Head from 'next/head';

type MetaProps = {
  matter?: Record<string, any>;
};

const Meta = (props: MetaProps) => {
  const { matter } = props;

  let title = BLOG_TITLE;
  let description = 'Jason write his wisdom in here.';
  let slug = '/';
  let coverImagePath = null;
  let keywords = ['programming', 'it', 'tech'];

  if (matter) {
    title = matter.title;
    description = matter.description;
    slug = `articles/${matter.writtenAt
      .replace(/[-]/g, '/')
      .substring(0, 10)}/${matter.docName}`;
    coverImagePath = matter.coverImageName
      ? `${slug}/${matter.coverImageName}`
      : null;
    keywords = keywords.concat(matter.keywords);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="description" name="description" content={description} />
        <meta
          key="keywords"
          name="keywords"
          content={`${keywords?.join(', ')}`}
        />

        <meta key="og:title" name="og:title" content={title} />
        <meta
          key="og:description"
          name="og:description"
          content={description}
        />
        {coverImagePath && (
          <meta
            key="og:image"
            name="og:image"
            content={`${SITE_URL}/${coverImagePath}`}
          />
        )}
        <meta key="og:url" name="og:url" content={`${SITE_URL}/${slug}`} />
      </Head>
    </>
  );
};

export default Meta;
