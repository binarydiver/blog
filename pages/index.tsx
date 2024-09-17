import FastGlob from 'fast-glob';
import fs from 'fs';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next/types';
import path from 'path';
import { BLOG_TITLE } from './_lib/constants';
import generateRssFeed from './_lib/rss';

export type ArticleMatter = {
  title: string;
  description: string;
  coverImagePath: string | null;
  slug: string;
  writtenAt: string;
  updatedAt: string;
};

type HomeProps = {
  articleMatters: ArticleMatter[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const ARTICLES_DIR = path.join(process.cwd(), 'pages');
  const articlesPaths = await FastGlob.glob('articles/**/*.md', {
    cwd: ARTICLES_DIR,
    dot: false,
    onlyFiles: true,
  });

  articlesPaths.sort().reverse();

  const articleMatters = articlesPaths.map(articlePath => {
    const articlePathElements = path.parse(articlePath);
    const slug = articlePath.slice(0, -1 * articlePathElements.ext.length);
    const source = fs.readFileSync(
      path.join(process.cwd(), 'pages/', articlePath),
      'utf8'
    );
    const { data } = matter(source);
    const { title, description, coverImageName, writtenAt, updatedAt } = data;

    return {
      title,
      description,
      coverImagePath: coverImageName ? `./${slug}/${coverImageName}` : null,
      slug,
      writtenAt,
      updatedAt,
    };
  });

  generateRssFeed(articleMatters);

  return {
    props: {
      articleMatters,
    },
  };
};
6;
const Home = (props: HomeProps) => {
  const { articleMatters } = props;

  return (
    <>
      <Head>
        <title>{BLOG_TITLE}</title>
        <meta name="description" content="This is Jason's personal blog." />
      </Head>

      <ul role="list" className="divide-y list-none my-2 ps-1 pe-1">
        {articleMatters.map(articleMatter => (
          <li className="m-0" key={articleMatter.writtenAt}>
            <article className="flex py-4">
              <div className="me-4">
                <Link className="no-underline" href={`${articleMatter.slug}`}>
                  {articleMatter.coverImagePath && (
                    <Image
                      className="m-0"
                      src={articleMatter.coverImagePath}
                      width={200}
                      height={200}
                      alt="cover image"
                      priority={true}
                    />
                  )}
                </Link>
              </div>
              <div>
                <Link className="no-underline" href={`${articleMatter.slug}`}>
                  <header className="underline underline-offset-4">
                    {articleMatter.writtenAt.substring(0, 10)} ::{' '}
                    {articleMatter.title}
                  </header>
                </Link>
                <p className="mt-2 mb-0">{articleMatter.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;

export const revalidate = 3600;
