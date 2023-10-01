import fs from 'fs';
import glob from 'glob-promise';
import matter from 'gray-matter';
import getConfig from 'next/config';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import path from 'path';

const assetPrefix = getConfig().publicRuntimeConfig?.assertPrefix ?? '';

type Article = {
  title: string;
  description: string;
  cover: string | null;
  slug: string;
  writeAt: string;
};

export const getStaticProps: GetStaticProps<{
  articles: Article[];
}> = async () => {
  const ARTICLES_DIR = path.join(process.cwd(), 'pages/articles');
  const articlesPaths = await glob('**/*.md', { cwd: ARTICLES_DIR });
  const articles = articlesPaths.map(articlePath => {
    const slug = path.basename(articlePath, path.extname(articlePath));
    const source = fs.readFileSync(
      path.join(process.cwd(), 'pages/articles', articlePath),
      'utf8'
    );
    const { data } = matter(source);
    const { title, description, cover, writeAt } = data;

    return {
      title,
      description,
      cover: cover ?? null,
      slug,
      writeAt,
    };
  });
  return {
    props: {
      articles,
    },
  };
};

export default function Home({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Next.js Blog Template</title>
        <meta name="description" content="Next.js Blog Template Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${assetPrefix}/favicon.ico`} />
      </Head>

      <ul
        role="list"
        className="divide-y divide-slate-400 list-none marker:text-slate-300"
      >
        {articles.map(article => (
          <li key={article.slug} className="pt-2">
            <Link className="no-underline" href={`/articles/${article.slug}`}>
              <header className="underline underline-offset-4">
                {article.cover && (
                  <Image
                    src={article.cover}
                    width={300}
                    height={200}
                    alt="cover"
                  />
                )}
                {article.writeAt}, {article.title}
              </header>
              <p>{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
