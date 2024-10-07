---
docName: 'build-blog-with-nextjs-on-github'
title: Next.js로 GitHub Page에 블로그 개설하기
description: Next.js로 정적 웹사이트를 추출하여 GitHub Page 위에서 운영할 수 있는 블로그를 개설한 과정에 대한 이야기이다.
keywords: ['next.js', 'blog', 'markdoc']
writtenAt: '2024-09-24 17:40'
updatedAt: '2024-10-04 17:30'
---

# Next.js로 GitHub Page에 블로그 개설하기

## 서문

나만의 보관소에 기록하고 있는 내용을 공개적으로 공유하고, 다른 사람에게 전달할 때도 수월하게 하고 싶어 블로그를 개설하기로 했다.\
그래서 다음과 같이 원하는 주요 기능을 정하고 블로그를 운영하기 위한 여러 방법을 모색했다.

1. 글을 쉽게 이전 및 추출할 수 있도록 DB 통제권을 가져야 한다.
2. 표준화된 포맷으로 글을 작성할 수 있어 파싱이 수월해야 한다.
3. 글에 답글을 달 수 있어 소통이 가능해야 한다.
4. 레이아웃과 테마를 최대한 커스텀할 수 있어야 한다.
5. 국내/외 검색 엔진에 크롤링될 수 있어야 한다.

1, 2번을 제외한다면 블로그를 운영하기 좋은 웹 서비스들은 많이 존재한다. 특히 4번의 검색 엔진 노출의 경우 유명한 블로그 서비스에 글을 올리는 것이 백링크 측면에서 더 유리하다. 하지만 프로그래머일수록 1, 2번을 해결하고 싶지 않을까. 왜냐하면 데이터베이스 통제권이 없다는 것은 서비스 제공자에 의해 내 글이 제어될 수 있다는 것으로 내가 쓴 글의 소유권을 절반만 갖고 있다고 봐야 한다.

물론 완전한 해결책은 직접 웹사이트를 만들어서 서버를 구매해 올리는 것이다. 하지만 대개 이런 Zero to One이 얼마나 거추장스러운 일인지 모두가 잘 안다. 게다가 투자하는 모든 자원에 비해 결과가 목표를 과도하게 넘어서 자기만족에 그칠 가능성이 매우 높다. 예측하기 어려운 미래에 대한 모든 시작은 변화에 능동적으로 대처할 수 있도록 규모가 작아야 좋다.

그래서 추가적인 재화의 소모도 없고 오직 프로그래밍 능력만으로 1 ~ 5번을 대체로 만족할 수 있는 방법으로 GitHub Page를 이용하기로 결정했다. 과거에는 Jekyll를 이용해서 정적 사이트를 만들어 GitHub Page에 올리는 것이 많이 사용되는 방식이었다. 하지만 리액트 바람이 불어온 뒤 격변의 시간이 지난 웹 시장에는 정적 웹사이트를 추출할 수 있는 라이브러리들이 훨씬 더 많아졌다.

내가 현재 가장 익숙한 정적 웹사이트 제작 프레임워크는 Next.js였고 이를 이용해서 개발하기로 했다.

## 개발 과정

Next.js 14.2.x 기준으로 개발하였다.\
다음 [CLI](https://nextjs.org/docs/pages/api-reference/cli/create-next-app)로 Next.js 프로젝트를 생성한다.

```bash
pnpm create next-app nextjs-blog --ts --tailwind --eslint --no-app --src-dir --import-alias "@/*" --use-pnpm
```

### 프로젝트 구조

프로젝트 주요 구조는 다음과 같다.

```
public/
     └─ scripts/theme.js
src/
  ├─ components/
  │           ├─ article-layout/
  │           │               ├─ footer.tsx
  │           │               ├─ header.tsx
  │           │               └─ index.tsx
  │           ├─ root-layout/index.tsx
  │           ├─ meta/index.tsx
  │           └─ code-block/index.tsx
  │
  │─ lib/
  │    ├─ constants.ts
  │    ├─ rss.ts
  │    └─ sitemap.ts
  │
  │─ markdoc/
  │        └─ nodes/
  │               ├─ fence.markdoc.ts
  │               └─ index.ts
  │
  └─ pages/
         ├─ articles/
         │         ├─ _draft/*.md
         │         └─ {year}/{month}/{day}/*.md
         ├─ _app.tsx
         ├─ _document.tsx
         └─ index.tsx
next.config.mjs
package.json
tailwind.config.ts
tsconfig.json
```

전체 코드는 [여기](https://github.com/binarydiver/template-nextjs-blog/tree/v1.0.0)를 참고하고 주요한 부분만 추려서 정리한다.

### Markdoc 세팅

마크다운 문서를 렌더링하기 위해 선택한 라이브러리는 Markdoc이다.\
Markdoc은 커스텀 문법을 추가해서 요소를 확장하고 상호작용 가능한 요소도 삽입할 수 있게 해준다.\
또한 Next.js 지원을 위한 별도의 플러그인과 연동 가이드를 제공한다.

```bash
pnpm add @markdoc/next.js @markdoc/markdoc
```

`next.config.mjs`에 다음과 같이 `withMarkdoc`이라는 함수로 설정을 추가한다.\
`mode: 'static'`은 Next.js의 `getStaticProps`를 이용해서 Markdoc 페이지를 생성하는 옵션이다.

```js
// src: [next.config.mjs](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/next.config.mjs)
const nextConfig = {
  /* ... */
  ...withMarkdoc({ mode: 'static' })({
    pageExtensions: ['md', 'mdoc', 'jsx', 'tsx'],
  }),
};
```

위 설정 후 pages 하위에 마크다운 문서를 생성하고 주소로 접속하면 플러그인에 의해 자동으로 렌더링을 해준다.
이 방법을 쓰면 마크다운을 파싱해서 React로 렌더링하는 코드를 추가로 작성할 필요가 없다.
플러그인을 사용하지 않고 수동으로 파싱, 렌더링을 하고 싶다면 [여기](https://markdoc.dev/docs/examples/react)를 참고하면 된다.

나는 "articles/{year}/{month}/{day}/{file_name.md}" 같은 패턴으로 마크다운 문서들을 생성했다.
Markdoc은 마크다운에 [frontmatter](https://markdoc.dev/docs/frontmatter)라는 페이지 레벨의 메타데이터 기록을 지원한다.
이를 활용하기 위해 마크다운 문서 처음에 `---` 구분자로 필요한 정보를 나열했다.
string으로 받기 위해서는 ""로 감싸야 하며 그렇지 않으면 날짜와 같은 특정 서식은 자동 파싱된다.

```
---
docName: 'explain_man_command_en'
title: 'Explain cat command in English'
description: 'Explain cat command in English.'
coverImageName: 'marnhe-du-plooy-U6u_A5z6mME-unsplash.jpg'
keywords: ['posix cat', 'linux cat', 'en']
writtenAt: '2024-09-10 10:00'
updatedAt: '2024-09-10 10:00'
---
```

### 홈, 글 목록

이제 홈에 글 목록을 보여주기 위한 작업을 해보자.
`getStaticProps`는 빌드 시 pre-render를 위해 실행되어 반환되는 최종 props를 Home 컴포넌트에 넘겨줄 것이다.
그러므로 `getStaticProps`에서 모든 아티클의 마크다운 파일 경로를 읽어서 `matter`를 추출, 가공한다.\
여기서 폴더 트리를 직접 탐색하지 않고 빠른 속도로 원하는 파일들의 경로를 획득하기 위해 [fast-glob](https://github.com/mrmlnc/fast-glob?tab=readme-ov-file#fast-glob)를 이용했다.\
마크다운의 `matter` 정보를 읽기 위해서는 [gray-matter](https://github.com/jonschlinkert/gray-matter?tab=readme-ov-file#gray-matter---)를 이용했다.

```bash
pnpm add fast-glob gray-matter --save-dev
```

```jsx
// src: [pages/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/index.tsx)
import FastGlob from 'fast-glob';
import matter from 'gray-matter';
/* ... */

export type ArticleMatter = {
  title: string,
  description: string,
  coverImagePath: string | null,
  slug: string,
  writtenAt: string,
  updatedAt: string,
};

type HomeProps = {
  articleMatters: ArticleMatter[],
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const ARTICLES_DIR = path.join(process.cwd(), 'pages');
  const articlesPaths = await FastGlob.glob(
    ['articles/**/*.md', '!articles/_draft/*'], // _draft 폴더 내 문서는 노출하지 않음.
    {
      cwd: ARTICLES_DIR,
      dot: false,
      onlyFiles: true,
    }
  ); // ['articles/2024/09/10/explain_man_command_en.md', 'articles/2024/09/11/...']

  // glob은 순차적인 정렬을 보장하지 않으므로, 최신 글을 상위 노출하기 위해 역순으로 정렬함.
  articlesPaths.sort().reverse();

  const articleMatters = articlesPaths.map(articlePath => {
    const articlePathElements = path.parse(articlePath);
    // {ext: .md, base: 'explain_cat_command_jp.md', dir: 'articles/2024/09/12' ...}
    const slug = articlePath.slice(0, -1 * articlePathElements.ext.length);
    // remove file extension like 'articles/2024/09/10/explain_cat_command_en'
    const source = fs.readFileSync(
      path.join(process.cwd(), 'pages/', articlePath),
      'utf8'
    );
    const { data } = matter(source); // get frontmatter
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

  return {
    props: {
      articleMatters,
    },
  };
};

/*...*/
```

이제 `getStaticProps`에서 가공한 `HomeProps`를 넘겨받아 Home에 목록을 출력한다.

```jsx
// src: [pages/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/index.tsx)
const Home = (props: HomeProps) => {
  const { articleMatters } = props;

  return (
    <>
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
                      height={133}
                      alt="cover image"
                      priority={true}
                    />
                  )}
                </Link>
              </div>
              <div>
                <Link className="no-underline" href={`${articleMatter.slug}`}>
                  <header className="underline underline-offset-4 mt-[-0.5rem]">
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
```

여기까지하면 홈에서 항목을 클릭해서 해당 마크다운까지 이동할 수 있어 기본적인 형태가 완성된다.

### 스타일링

하지만 tailwindcss를 적용한 프로젝트는 기본 서식이 없어 마크다운 렌더링에 스타일이 적용되어 있지 않다.
서식을 직접 수동으로 지정하거나 미리 지정된 서식의 [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) 플러그인을 쓰면 된다.

```bash
pnpm add @tailwindcss/typography --save-dev
```

`tailwind.config.ts`에서 플러그인으로 추가한다.

```ts
// src: [tailwind.config.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/tailwind.config.ts)
import typography from '@tailwindcss/typography';

export default {
  /* ... */
  plugins: [typography],
};
```

모든 페이지에 적용되야 하기 때문에 body에 스타일을 적용한다.
`prose`가 기본 서식을 의미하고 다크 모드인 경우 `prose-invert`가 적용되도록 한다.

```jsx
// src: [pages/_document.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/_document.tsx)
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-zinc-100 prose prose-zinc dark:bg-zinc-950 dark:prose-invert max-w-full">
        {/* ... */}
      </body>
    </Html>
  );
}
```

이제 아티클에 접속하면 마크다운이 스타일링되어 나오지만 코드 블락 내 소스코드가 문법 강조(Syntax Highlight)되지 않는다.
범용적인 라이브러리가 [Prism.js](https://prismjs.com/)라 이를 사용했다.

```bash
pnpm add prismjs
pnpm add @types/prismjs --save-dev
```

Markdoc은 마크다운에서 이용하는 문법 요소들을 [Nodes](https://markdoc.dev/docs/nodes)라고 부르며 각각 커스터마이징이 가능하다.
이를 위해 Markdoc schema를 정의해야 하는데 구조는 [여기](https://markdoc.dev/docs/nextjs#schema-customization)서 확인할 수 있다.
문법 강조를 위해 코드 블락 내 소스 코드에 해당되는 언어들을 각각 임포트해줘야 한다.
커스텀 코드 블락을 만들고 이를 Markdoc에 코드 블락을 의미하는 fence node에 연결한다.

```jsx
// src: [src/components/code-block/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/components/code-block/index.tsx)
import Prism from 'prismjs';
import 'prismjs/components/prism-bash.min'; // https://github.com/PrismJS/prism/tree/v1.29.0/components
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/themes/prism-okaidia.min.css'; // Theme, https://github.com/PrismJS/prism/tree/v1.29.0/themes
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

interface CodeBlockProps extends PropsWithChildren {
  'data-language': string;
}

const CodeBlock: FC<CodeBlockProps> = props => {
  const { children, 'data-language': language } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current, false);
    }
  }, [children]);

  return (
    <div className="code" aria-live="polite">
      <pre ref={ref} className={`language-${language}`}>
        {children}
      </pre>
    </div>
  );
};

export default CodeBlock;
```

```jsx
// src: [src/markdoc/nodes/fence.markdoc.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/markdoc/nodes/fence.markdoc.ts)
import CodeBlock from '@/components/code-block';
import { nodes } from '@markdoc/markdoc';

export const fence = {
  render: CodeBlock,
  attributes: nodes.fence.attributes,
};
```

### 라이트 / 다크 테마

tailwindcss에서 다크 모드를 수동으로 지정하는 방법 중에 selector를 이용했다.
이는 `<html class="dark">`와 같이 dark 클래스가 지정되면 하위 엘레먼트들의 `dark:`가 붙는 모든 클래스들이 활성화되는 방식이다.

```ts
// src: [tailwind.config.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/tailwind.config.ts)
export default {
  darkMode: 'selector',
  /* ... */
} as Config;
```

라이트/다크 테마를 지원하고 수동으로 지정할 수 있도록 color-theme 정보를 `localStorage`에 저장하는 스크립트를 만들어 추가한다.
기본값은 시스템의 테마를 따르되 수동으로 테마를 지정한 후에는 로컬에 저장된 테마 설정을 따르게 된다.

```js
// src: [public/scripts/theme.js](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/public/scripts/theme.js)
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) // system theme
) {
  document.documentElement.classList.add('dark');
  localStorage.setItem('color-theme', 'dark');
} else {
  document.documentElement.classList.remove('dark');
  localStorage.setItem('color-theme', 'light');
}
```

이제 스크립트를 `_document.tsx`에서 호출하도록 불러온다.
위 스크립트가 다른 Next.js 모듈보다 먼저 호출되도록 strategy를 지정한다.
커스텀 도메인을 사용하지 않으면 `...github.io/template-nextjs-blog/` 와 같이 뒤에 저장소 이름이 항상 붙어야 한다.
따라서 로컬에서 실행할 때는 저장소 이름이 없이, 배포 시에는 저장소 이름이 붙도록 조건을 붙여야 리소스를 받아오는데 문제가 없다.

```jsx
// src: [pages/_document.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/_document.tsx)
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-zinc-100 prose prose-zinc dark:bg-zinc-950 dark:prose-invert max-w-full">
        <Main />
        <NextScript />
        <Script
          src={`${IS_ENV_PROD ? PATH_PREFIX_PROD : ''}/scripts/theme.js`} // /template-nextjs-blog/scripts/theme.js
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
```

`header.tsx`에 테마 토글 버튼을 추가한다.
`theme.js`에서 `localStorage`에 color-theme을 지정하므로 이를 기준으로 토글시키면 된다.

```jsx
// src: [components/article-layout/header.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/components/article-layout/header.tsx)
const Header = (props: HeaderProps) => {
  const { title } = props;
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('color-theme');
    setIsDarkTheme(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const theme = localStorage.getItem('color-theme');
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setIsDarkTheme(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setIsDarkTheme(true);
    }
  };

  return (
    <nav className="border-b p-4">
      {/* ... */}
      <div className="flex flex-1 gap-x-2 items-center justify-end">
        {/* ... */}
        <button
          type="button"
          className="text-white bg-gray-300 hover:bg-gray-400 focus:ring-gray-500 focus:outline-none focus:ring-2 font-medium rounded-lg text-4xl px-1.5 pb-1 dark:bg-gray-100 dark:hover:dark:bg-gray-400 dark:focus:ring-gray-200"
          onClick={() => toggleTheme()}
        >
          🌓︎
        </button>
      </div>
    </nav>
  );
};
```

### SEO, Meta 태그

이제 SEO를 위해 페이지마다 메타 태그를 넣어보자.
Next.js에서 `_document.tsx`에 <Head> 내 다른 메타를 추가하면 메타 태그가 중복되는 문제가 발생했다.
그래서 공통 메타와 페이지별 메타를 구분할 필요가 있어 root-layout과 article-layout을 나눴다.
여기서도 다른 페이지에서 덮어씌워야 하는 메타 태그들은 key 값을 주어 중복을 방지했다.

```jsx
// src: [src/components/root-layout/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/components/root-layout/index.tsx)
const RootLayout: FC<RootLayoutProps> = props => {
  const { children } = props;

  return (
    <div>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${IS_ENV_PROD ? PATH_PREFIX_PROD : ''}/favicon.ico`} // /template-nextjs-blog/favicon.ico
        />
        <meta name="color-scheme" content="dark light" />
        <meta
          key="keywords"
          name="keywords"
          content="blog, template, programming, it, tech"
        />

        <meta
          key="og:title"
          name="og:title"
          content="Next.js Blog Template | Home"
        />
        <meta
          key="og:description"
          name="og:description"
          content="Next.js Blog Template Website"
        />
        <meta key="og:url" name="og:url" content={SITE_URL} />
        <meta name="og:site_name" content="Next.js Blog Template" />
      </Head>
      {children}
    </div>
  );
};
```

페이지마다 별도로 지정되는 메타들은 컴포넌트로 만들어 재활용했다.

```jsx
// src: [src/components/meta/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/components/meta/index.tsx)
const Meta = (props: MetaProps) => {
  const { matter } = props;
  /* ... */
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
```

컴포넌트가 `getLayout`을 이용한다면 지정한 레이아웃으로 감싸고 그렇지 않으면 `_app.tsx`에서 지정한 레이아웃으로 감싸도록 했다.
현재는 모든 페이지가 `getLayout`을 이용하지 않기 때문에 Root > Article로 이어지는 레이아웃으로 감싸진다.
여기서 Markdoc의 `frontmatter`를 Meta에 넘겨 페이지마다 다른 메타를 노출하는 구성이다.

```jsx
// src: [src/pages/_app.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/_app.tsx)
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    (page => {
      const frontMatter = page.props.markdoc?.frontmatter;

      return (
        <RootLayout>
          <ArticleLayout>
            <Meta matter={frontMatter} />
            {page}
            <hr />
          </ArticleLayout>
        </RootLayout>
      );
    });

  return getLayout(<Component {...pageProps} />);
}
```

### RSS

RSS 피드 기능을 추가하기 위해 다음 패키지들을 설치했다.

```bash
pnpm add -D rss @types/rss
```

아티클들의 `matter` 정보를 넘겨받아 `rss.xml`를 public/에 생성한다.

```ts
// src: [src/lib/rss.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/lib/rss.ts)
/* ... */
const generateRssFeed = async (articleMatters: ArticleMatter[]) => {
  const siteOrigin =
    process.env.NODE_ENV === 'production'
      ? `https://binarydiver.github.io${PATH_PREFIX_PROD}`
      : 'http://localhost:3000';

  const feedOptions = {
    title: 'Blog Title | RSS Feed',
    description: 'Welcome to Blog Title',
    site_url: siteOrigin,
    feed_url: `${siteOrigin}/rss.xml`,
    image_url: `${siteOrigin}/rss-512.png`,
    pubDate: new Date(),
    copyright: `Copyright ${new Date().getFullYear()}, Author`,
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  articleMatters.map(articleMatter => {
    feed.item({
      title: articleMatter.title,
      description: articleMatter.description,
      url: `${siteOrigin}/${articleMatter.slug}`,
      date: new Date(articleMatter.updatedAt),
    });
  });

  // Write the RSS feed to a file as XML.
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
};

export default generateRssFeed;
```

가공된 `matter` 정보를 넘겨줄 수 있는 곳이 Home의 `getStaticProps`이므로 여기서 RSS 생성 함수를 호출한다.
이러면 빌드할 때마다 갱신된 rss.xml이 생성된다.

```jsx
// src: [src/pages/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/index.tsx)
import generateRssFeed from '../lib/rss';
/* ... */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  /* ... */
  const articleMatters = articlesPaths.map(articlePath => {
    /* ... */
  });

  generateRssFeed(articleMatters);

  return {
    props: {
      articleMatters,
    },
  };
};
```

### Sitemap

비슷하게 `sitemap.xml`도 빌드 시 생성되도록 구현했다.

```bash
pnpm add sitemap --save-dev
```

```jsx
// src: [src/lib/sitemap.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/lib/sitemap.ts)
/* ... */
const generateSitemap = async (articleMatters: ArticleMatter[]) => {
  const sitemap = new SitemapStream({ hostname: BASE_URL + PATH_PREFIX_PROD });

  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);

  sitemap.write({
    url: PATH_PREFIX_PROD,
    changefreq: EnumChangefreq.WEEKLY,
    priority: 1.0,
    lastmod: new Date().toISOString().substring(0, 10),
    img: [],
    video: [],
    links: [],
  } satisfies SitemapItem);

  articleMatters.forEach(matter => {
    const sitemapItem: SitemapItem = {
      url: matter.slug,
      changefreq: EnumChangefreq.WEEKLY,
      priority: 0.8,
      lastmod: matter.updatedAt.substring(0, 10),
      img: matter.coverImagePath ? [{ url: matter.coverImagePath }] : [],
      video: [],
      links: [],
    };
    sitemap.write(sitemapItem);
  });

  sitemap.end();
};

export default generateSitemap;
```

### 배포하기

생성된 정적 웹사이트를 GitHub Page로 배포하기 위해 다음 패키지를 설치한다.

```bash
pnpm add gh-pages --save-dev
```

여기서 코드를 main 으로 푸시할 때마다 자동으로 Page로 배포되도록 GitHub Action을 구성해도 된다.
하지만 나는 그 정도 기능이 필요하지 않다고 여겨 커맨드로 배포하는 방식을 선택했다.
커맨드 배포는 package.json에 아래 스크립트를 추가한다.
`.nojekyll` 파일은 깃허브가 jekyll 프로젝트로 인식해서 언더스코어가 붙은 폴더를 무시하는 것을 막기 위해 생성해야 한다.
그리고 커스텀 도메인을 사용한다면 CNAME 파일을 추가할 것을 권장한다.
`CNAME` 파일이 없으면 배포할 때마다 커스텀 도메인이 풀려버리기 때문이다.

```json
// src: [package.json](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/package.json)
{
  /* ... */
  "scripts": {
    /* ... */
    "predeploy": "pnpm run build && touch out/.nojekyll && echo \"your-domain.com\" > out/CNAME"
    // ref. https://github.blog/news-insights/bypassing-jekyll-on-github-pages/
    // ref. https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages#cname-errors
  }
}
```

이제 `pnpm run deploy`를 실행하면 `gh-pages` 브랜치에 out/에 생성된 정적 웹사이트가 올라가고 깃허브에 의해 호스팅된다.

## Troubleshooting

- 도메인 관리를 cloudflare로 할 때 custom domain 연결 후 접속 시 `too many request ...` 에러가 발생한다면, dns proxy를 끄거나 https 옵션을 full(strict)로 변경해야 한다.
  > ref. [Fix “Too many redirects” error after enabling Cloudflare Proxy](https://medium.com/@flaviocopes/fix-too-many-redirects-error-after-enabling-cloudflare-proxy-7fb94fe98989)

## To-Do

- Markdoc의 기능을 이용해서 가독성을 높이는 태그를 추가 개발할 필요가 있다.
- 초기에는 아티클 수가 적지만 많아지면 편의 상 검색 기능이 필요하다.\
  아무래도 텍스트 기반 검색이나 구글의 사이트 검색을 써야 할 것으로 보인다.
- Markdoc의 예제가 Next.js의 페이지 라우팅을 이용하고 있어서 동일한 방식으로 구현했다.\
  하지만 앱 라우팅이 더 편리한 부분이 있어 변경하는 것을 고려할 수 있다.
- 모든 글이 프로그래밍에 관련되지 않을 수 있어 카테고리를 나누어야 할 수 있다.\
  matter를 활용해서 태그 방식으로 하고 홈에서 나누어서 표시할 필요가 있다.
- Markdoc의 heading node를 커스텀하여 fragment로 이동할 수 있게 했지만 현재 읽는 곳이 어느 위치인지 직관적이지 않다.\
  글이 길어지면 더욱 스크롤를 따라 내려오는 TOC(Table Of Contents)가 한쪽에 있는 것이 편리할 것이다.
- Giscus는 깃허브에 로그인을 해야만 답글을 달 수 있어 한계가 있다.\
  이를 완전히 극복하려면 유료 서비스를 이용해야 하는데, 파이어베이스를 이용해서 라이브러리를 개발하면 무료로 상당량 받아낼 수 있을 것 같다.
- Markdoc 관련 검색을 하다 [Astro](https://astro.build/)라는 서비스를 발견했는데 이것도 정적 웹사이트 제작이 가능하다.\
  한번 장점이 있는지 테스트해볼 필요가 있다.

## Major References

1. [Use Markdoc and Next.js to Build a Git-powered Markdown Blog](https://code.pieces.app/blog/building-blogs-markdoc-nextjs)
2. [How to build a blog using Next.js and Markdoc](https://medium.com/@docploy/how-to-build-a-blog-using-next-js-and-markdoc-b4cfe8ed9dca)
3. [Creating an RSS Feed in your Next.js Project](https://dev.to/promathieuthiry/creating-an-rss-feed-in-your-nextjs-project-20em)
4. [Using Markdoc with Next.js](https://markdoc.dev/docs/nextjs)
5. [GitHub: markdoc/markdoc-starter](https://github.com/markdoc/markdoc-starter)
