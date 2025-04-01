(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[575],{8183:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/articles/2024/09/24/build-blog-with-nextjs-on-github",function(){return e(2084)}])},2084:function(n,t,e){"use strict";e.r(t),e.d(t,{__N_SSG:function(){return u},default:function(){return b},markdoc:function(){return h}});var r=e(5271),a=e(487),s=e(9500),o=e(7393),i=e(9030),c=e(5089);let l={tags:(0,o.w)(i),nodes:(0,o.w)(c),functions:(0,o.w)({}),...(0,o.w)({})},m=new s.ZP.Tokenizer({allowComments:!0}).tokenize("---\ndocName: 'build-blog-with-nextjs-on-github'\ntitle: Next.js로 GitHub Page에 블로그 개설하기\ndescription: Next.js로 정적 웹사이트를 추출하여 GitHub Page 위에서 운영할 수 있는 블로그를 개설한 과정에 대한 이야기이다.\nkeywords: ['next.js', 'blog', 'markdoc']\nwrittenAt: '2024-09-24 17:40'\nupdatedAt: '2024-10-04 17:30'\n---\n\n# Next.js로 GitHub Page에 블로그 개설하기\n\n## 서문\n\n나만의 보관소에 기록하고 있는 내용을 공개적으로 공유하고, 다른 사람에게 전달할 때도 수월하게 하고 싶어 블로그를 개설하기로 했다.\\\n그래서 다음과 같이 원하는 주요 기능을 정하고 블로그를 운영하기 위한 여러 방법을 모색했다.\n\n1. 글을 쉽게 이전 및 추출할 수 있도록 DB 통제권을 가져야 한다.\n2. 표준화된 포맷으로 글을 작성할 수 있어 파싱이 수월해야 한다.\n3. 글에 답글을 달 수 있어 소통이 가능해야 한다.\n4. 레이아웃과 테마를 최대한 커스텀할 수 있어야 한다.\n5. 국내/외 검색 엔진에 크롤링될 수 있어야 한다.\n\n1, 2번을 제외한다면 블로그를 운영하기 좋은 웹 서비스들은 많이 존재한다. 특히 4번의 검색 엔진 노출의 경우 유명한 블로그 서비스에 글을 올리는 것이 백링크 측면에서 더 유리하다. 하지만 프로그래머일수록 1, 2번을 해결하고 싶지 않을까. 왜냐하면 데이터베이스 통제권이 없다는 것은 서비스 제공자에 의해 내 글이 제어될 수 있다는 것으로 내가 쓴 글의 소유권을 절반만 갖고 있다고 봐야 한다.\n\n물론 완전한 해결책은 직접 웹사이트를 만들어서 서버를 구매해 올리는 것이다. 하지만 대개 이런 Zero to One이 얼마나 거추장스러운 일인지 모두가 잘 안다. 게다가 투자하는 모든 자원에 비해 결과가 목표를 과도하게 넘어서 자기만족에 그칠 가능성이 매우 높다. 예측하기 어려운 미래에 대한 모든 시작은 변화에 능동적으로 대처할 수 있도록 규모가 작아야 좋다.\n\n그래서 추가적인 재화의 소모도 없고 오직 프로그래밍 능력만으로 1 ~ 5번을 대체로 만족할 수 있는 방법으로 GitHub Page를 이용하기로 결정했다. 과거에는 Jekyll를 이용해서 정적 사이트를 만들어 GitHub Page에 올리는 것이 많이 사용되는 방식이었다. 하지만 리액트 바람이 불어온 뒤 격변의 시간이 지난 웹 시장에는 정적 웹사이트를 추출할 수 있는 라이브러리들이 훨씬 더 많아졌다.\n\n내가 현재 가장 익숙한 정적 웹사이트 제작 프레임워크는 Next.js였고 이를 이용해서 개발하기로 했다.\n\n## 개발 과정\n\nNext.js 14.2.x 기준으로 개발하였다.\\\n다음 [CLI](https://nextjs.org/docs/pages/api-reference/cli/create-next-app)로 Next.js 프로젝트를 생성한다.\n\n```bash\npnpm create next-app nextjs-blog --ts --tailwind --eslint --no-app --src-dir --import-alias \"@/*\" --use-pnpm\n```\n\n### 프로젝트 구조\n\n프로젝트 주요 구조는 다음과 같다.\n\n```\npublic/\n     └─ scripts/theme.js\nsrc/\n  ├─ components/\n  │           ├─ article-layout/\n  │           │               ├─ footer.tsx\n  │           │               ├─ header.tsx\n  │           │               └─ index.tsx\n  │           ├─ root-layout/index.tsx\n  │           ├─ meta/index.tsx\n  │           └─ code-block/index.tsx\n  │\n  │─ lib/\n  │    ├─ constants.ts\n  │    ├─ rss.ts\n  │    └─ sitemap.ts\n  │\n  │─ markdoc/\n  │        └─ nodes/\n  │               ├─ fence.markdoc.ts\n  │               └─ index.ts\n  │\n  └─ pages/\n         ├─ articles/\n         │         ├─ _draft/*.md\n         │         └─ {year}/{month}/{day}/*.md\n         ├─ _app.tsx\n         ├─ _document.tsx\n         └─ index.tsx\nnext.config.mjs\npackage.json\ntailwind.config.ts\ntsconfig.json\n```\n\n전체 코드는 [여기](https://github.com/binarydiver/template-nextjs-blog/tree/v1.0.0)를 참고하고 주요한 부분만 추려서 정리한다.\n\n### Markdoc 세팅\n\n마크다운 문서를 렌더링하기 위해 선택한 라이브러리는 Markdoc이다.\\\nMarkdoc은 커스텀 문법을 추가해서 요소를 확장하고 상호작용 가능한 요소도 삽입할 수 있게 해준다.\\\n또한 Next.js 지원을 위한 별도의 플러그인과 연동 가이드를 제공한다.\n\n```bash\npnpm add @markdoc/next.js @markdoc/markdoc\n```\n\n`next.config.mjs`에 다음과 같이 `withMarkdoc`이라는 함수로 설정을 추가한다.\\\n`mode: 'static'`은 Next.js의 `getStaticProps`를 이용해서 Markdoc 페이지를 생성하는 옵션이다.\n\n```js\n// src: [next.config.mjs](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/next.config.mjs)\nconst nextConfig = {\n  /* ... */\n  ...withMarkdoc({ mode: 'static' })({\n    pageExtensions: ['md', 'mdoc', 'jsx', 'tsx'],\n  }),\n};\n```\n\n위 설정 후 pages 하위에 마크다운 문서를 생성하고 주소로 접속하면 플러그인에 의해 자동으로 렌더링을 해준다.\n이 방법을 쓰면 마크다운을 파싱해서 React로 렌더링하는 코드를 추가로 작성할 필요가 없다.\n플러그인을 사용하지 않고 수동으로 파싱, 렌더링을 하고 싶다면 [여기](https://markdoc.dev/docs/examples/react)를 참고하면 된다.\n\n나는 \"articles/{year}/{month}/{day}/{file_name.md}\" 같은 패턴으로 마크다운 문서들을 생성했다.\nMarkdoc은 마크다운에 [frontmatter](https://markdoc.dev/docs/frontmatter)라는 페이지 레벨의 메타데이터 기록을 지원한다.\n이를 활용하기 위해 마크다운 문서 처음에 `---` 구분자로 필요한 정보를 나열했다.\nstring으로 받기 위해서는 \"\"로 감싸야 하며 그렇지 않으면 날짜와 같은 특정 서식은 자동 파싱된다.\n\n```\n---\ndocName: 'explain_man_command_en'\ntitle: 'Explain cat command in English'\ndescription: 'Explain cat command in English.'\ncoverImageName: 'marnhe-du-plooy-U6u_A5z6mME-unsplash.jpg'\nkeywords: ['posix cat', 'linux cat', 'en']\nwrittenAt: '2024-09-10 10:00'\nupdatedAt: '2024-09-10 10:00'\n---\n```\n\n### 홈, 글 목록\n\n이제 홈에 글 목록을 보여주기 위한 작업을 해보자.\n`getStaticProps`는 빌드 시 pre-render를 위해 실행되어 반환되는 최종 props를 Home 컴포넌트에 넘겨줄 것이다.\n그러므로 `getStaticProps`에서 모든 아티클의 마크다운 파일 경로를 읽어서 `matter`를 추출, 가공한다.\\\n여기서 폴더 트리를 직접 탐색하지 않고 빠른 속도로 원하는 파일들의 경로를 획득하기 위해 [fast-glob](https://github.com/mrmlnc/fast-glob?tab=readme-ov-file#fast-glob)를 이용했다.\\\n마크다운의 `matter` 정보를 읽기 위해서는 [gray-matter](https://github.com/jonschlinkert/gray-matter?tab=readme-ov-file#gray-matter---)를 이용했다.\n\n```bash\npnpm add fast-glob gray-matter --save-dev\n```\n\n```jsx\n// src: [pages/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/index.tsx)\nimport FastGlob from 'fast-glob';\nimport matter from 'gray-matter';\n/* ... */\n\nexport type ArticleMatter = {\n  title: string,\n  description: string,\n  coverImagePath: string | null,\n  slug: string,\n  writtenAt: string,\n  updatedAt: string,\n};\n\ntype HomeProps = {\n  articleMatters: ArticleMatter[],\n};\n\nexport const getStaticProps: GetStaticProps<HomeProps> = async () => {\n  const ARTICLES_DIR = path.join(process.cwd(), 'pages');\n  const articlesPaths = await FastGlob.glob(\n    ['articles/**/*.md', '!articles/_draft/*'], // _draft 폴더 내 문서는 노출하지 않음.\n    {\n      cwd: ARTICLES_DIR,\n      dot: false,\n      onlyFiles: true,\n    }\n  ); // ['articles/2024/09/10/explain_man_command_en.md', 'articles/2024/09/11/...']\n\n  // glob은 순차적인 정렬을 보장하지 않으므로, 최신 글을 상위 노출하기 위해 역순으로 정렬함.\n  articlesPaths.sort().reverse();\n\n  const articleMatters = articlesPaths.map(articlePath => {\n    const articlePathElements = path.parse(articlePath);\n    // {ext: .md, base: 'explain_cat_command_jp.md', dir: 'articles/2024/09/12' ...}\n    const slug = articlePath.slice(0, -1 * articlePathElements.ext.length);\n    // remove file extension like 'articles/2024/09/10/explain_cat_command_en'\n    const source = fs.readFileSync(\n      path.join(process.cwd(), 'pages/', articlePath),\n      'utf8'\n    );\n    const { data } = matter(source); // get frontmatter\n    const { title, description, coverImageName, writtenAt, updatedAt } = data;\n\n    return {\n      title,\n      description,\n      coverImagePath: coverImageName ? `./${slug}/${coverImageName}` : null,\n      slug,\n      writtenAt,\n      updatedAt,\n    };\n  });\n\n  return {\n    props: {\n      articleMatters,\n    },\n  };\n};\n\n/*...*/\n```\n\n이제 `getStaticProps`에서 가공한 `HomeProps`를 넘겨받아 Home에 목록을 출력한다.\n\n```jsx\n// src: [pages/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/index.tsx)\nconst Home = (props: HomeProps) => {\n  const { articleMatters } = props;\n\n  return (\n    <>\n      <ul role=\"list\" className=\"divide-y list-none my-2 ps-1 pe-1\">\n        {articleMatters.map(articleMatter => (\n          <li className=\"m-0\" key={articleMatter.writtenAt}>\n            <article className=\"flex py-4\">\n              <div className=\"me-4\">\n                <Link className=\"no-underline\" href={`${articleMatter.slug}`}>\n                  {articleMatter.coverImagePath && (\n                    <Image\n                      className=\"m-0\"\n                      src={articleMatter.coverImagePath}\n                      width={200}\n                      height={133}\n                      alt=\"cover image\"\n                      priority={true}\n                    />\n                  )}\n                </Link>\n              </div>\n              <div>\n                <Link className=\"no-underline\" href={`${articleMatter.slug}`}>\n                  <header className=\"underline underline-offset-4 mt-[-0.5rem]\">\n                    {articleMatter.writtenAt.substring(0, 10)} ::{' '}\n                    {articleMatter.title}\n                  </header>\n                </Link>\n                <p className=\"mt-2 mb-0\">{articleMatter.description}</p>\n              </div>\n            </article>\n          </li>\n        ))}\n      </ul>\n    </>\n  );\n};\n```\n\n여기까지하면 홈에서 항목을 클릭해서 해당 마크다운까지 이동할 수 있어 기본적인 형태가 완성된다.\n\n### 스타일링\n\n하지만 tailwindcss를 적용한 프로젝트는 기본 서식이 없어 마크다운 렌더링에 스타일이 적용되어 있지 않다.\n서식을 직접 수동으로 지정하거나 미리 지정된 서식의 [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) 플러그인을 쓰면 된다.\n\n```bash\npnpm add @tailwindcss/typography --save-dev\n```\n\n`tailwind.config.ts`에서 플러그인으로 추가한다.\n\n```ts\n// src: [tailwind.config.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/tailwind.config.ts)\nimport typography from '@tailwindcss/typography';\n\nexport default {\n  /* ... */\n  plugins: [typography],\n};\n```\n\n모든 페이지에 적용되야 하기 때문에 body에 스타일을 적용한다.\n`prose`가 기본 서식을 의미하고 다크 모드인 경우 `prose-invert`가 적용되도록 한다.\n\n```jsx\n// src: [pages/_document.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/_document.tsx)\nexport default function Document() {\n  return (\n    <Html lang=\"en\">\n      <Head />\n      <body className=\"antialiased bg-zinc-100 prose prose-zinc dark:bg-zinc-950 dark:prose-invert max-w-full\">\n        {/* ... */}\n      </body>\n    </Html>\n  );\n}\n```\n\n이제 아티클에 접속하면 마크다운이 스타일링되어 나오지만 코드 블락 내 소스코드가 문법 강조(Syntax Highlight)되지 않는다.\n범용적인 라이브러리가 [Prism.js](https://prismjs.com/)라 이를 사용했다.\n\n```bash\npnpm add prismjs\npnpm add @types/prismjs --save-dev\n```\n\nMarkdoc은 마크다운에서 이용하는 문법 요소들을 [Nodes](https://markdoc.dev/docs/nodes)라고 부르며 각각 커스터마이징이 가능하다.\n이를 위해 Markdoc schema를 정의해야 하는데 구조는 [여기](https://markdoc.dev/docs/nextjs#schema-customization)서 확인할 수 있다.\n문법 강조를 위해 코드 블락 내 소스 코드에 해당되는 언어들을 각각 임포트해줘야 한다.\n커스텀 코드 블락을 만들고 이를 Markdoc에 코드 블락을 의미하는 fence node에 연결한다.\n\n```jsx\n// src: [src/components/code-block/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/components/code-block/index.tsx)\nimport Prism from 'prismjs';\nimport 'prismjs/components/prism-bash.min'; // https://github.com/PrismJS/prism/tree/v1.29.0/components\nimport 'prismjs/components/prism-json.min';\nimport 'prismjs/components/prism-jsx.min';\nimport 'prismjs/components/prism-typescript.min';\nimport 'prismjs/themes/prism-okaidia.min.css'; // Theme, https://github.com/PrismJS/prism/tree/v1.29.0/themes\nimport { FC, PropsWithChildren, useEffect, useRef } from 'react';\n\ninterface CodeBlockProps extends PropsWithChildren {\n  'data-language': string;\n}\n\nconst CodeBlock: FC<CodeBlockProps> = props => {\n  const { children, 'data-language': language } = props;\n  const ref = useRef(null);\n\n  useEffect(() => {\n    if (ref.current) {\n      Prism.highlightElement(ref.current, false);\n    }\n  }, [children]);\n\n  return (\n    <div className=\"code\" aria-live=\"polite\">\n      <pre ref={ref} className={`language-${language}`}>\n        {children}\n      </pre>\n    </div>\n  );\n};\n\nexport default CodeBlock;\n```\n\n```jsx\n// src: [src/markdoc/nodes/fence.markdoc.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/markdoc/nodes/fence.markdoc.ts)\nimport CodeBlock from '@/components/code-block';\nimport { nodes } from '@markdoc/markdoc';\n\nexport const fence = {\n  render: CodeBlock,\n  attributes: nodes.fence.attributes,\n};\n```\n\n### 라이트 / 다크 테마\n\ntailwindcss에서 다크 모드를 수동으로 지정하는 방법 중에 selector를 이용했다.\n이는 `<html class=\"dark\">`와 같이 dark 클래스가 지정되면 하위 엘레먼트들의 `dark:`가 붙는 모든 클래스들이 활성화되는 방식이다.\n\n```ts\n// src: [tailwind.config.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/tailwind.config.ts)\nexport default {\n  darkMode: 'selector',\n  /* ... */\n} as Config;\n```\n\n라이트/다크 테마를 지원하고 수동으로 지정할 수 있도록 color-theme 정보를 `localStorage`에 저장하는 스크립트를 만들어 추가한다.\n기본값은 시스템의 테마를 따르되 수동으로 테마를 지정한 후에는 로컬에 저장된 테마 설정을 따르게 된다.\n\n```js\n// src: [public/scripts/theme.js](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/public/scripts/theme.js)\nif (\n  localStorage.getItem('color-theme') === 'dark' ||\n  (!('color-theme' in localStorage) &&\n    window.matchMedia('(prefers-color-scheme: dark)').matches) // system theme\n) {\n  document.documentElement.classList.add('dark');\n  localStorage.setItem('color-theme', 'dark');\n} else {\n  document.documentElement.classList.remove('dark');\n  localStorage.setItem('color-theme', 'light');\n}\n```\n\n이제 스크립트를 `_document.tsx`에서 호출하도록 불러온다.\n위 스크립트가 다른 Next.js 모듈보다 먼저 호출되도록 strategy를 지정한다.\n커스텀 도메인을 사용하지 않으면 `...github.io/template-nextjs-blog/` 와 같이 뒤에 저장소 이름이 항상 붙어야 한다.\n따라서 로컬에서 실행할 때는 저장소 이름이 없이, 배포 시에는 저장소 이름이 붙도록 조건을 붙여야 리소스를 받아오는데 문제가 없다.\n\n```jsx\n// src: [pages/_document.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/_document.tsx)\nexport default function Document() {\n  return (\n    <Html lang=\"en\">\n      <Head />\n      <body className=\"antialiased bg-zinc-100 prose prose-zinc dark:bg-zinc-950 dark:prose-invert max-w-full\">\n        <Main />\n        <NextScript />\n        <Script\n          src={`${IS_ENV_PROD ? PATH_PREFIX_PROD : ''}/scripts/theme.js`} // /template-nextjs-blog/scripts/theme.js\n          strategy=\"beforeInteractive\"\n        />\n      </body>\n    </Html>\n  );\n}\n```\n\n`header.tsx`에 테마 토글 버튼을 추가한다.\n`theme.js`에서 `localStorage`에 color-theme을 지정하므로 이를 기준으로 토글시키면 된다.\n\n```jsx\n// src: [components/article-layout/header.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/components/article-layout/header.tsx)\nconst Header = (props: HeaderProps) => {\n  const { title } = props;\n  const [isDarkTheme, setIsDarkTheme] = useState(false);\n\n  useEffect(() => {\n    const theme = localStorage.getItem('color-theme');\n    setIsDarkTheme(theme === 'dark');\n  }, []);\n\n  const toggleTheme = () => {\n    const theme = localStorage.getItem('color-theme');\n    if (theme === 'dark') {\n      document.documentElement.classList.remove('dark');\n      localStorage.setItem('color-theme', 'light');\n      setIsDarkTheme(false);\n    } else {\n      document.documentElement.classList.add('dark');\n      localStorage.setItem('color-theme', 'dark');\n      setIsDarkTheme(true);\n    }\n  };\n\n  return (\n    <nav className=\"border-b p-4\">\n      {/* ... */}\n      <div className=\"flex flex-1 gap-x-2 items-center justify-end\">\n        {/* ... */}\n        <button\n          type=\"button\"\n          className=\"text-white bg-gray-300 hover:bg-gray-400 focus:ring-gray-500 focus:outline-none focus:ring-2 font-medium rounded-lg text-4xl px-1.5 pb-1 dark:bg-gray-100 dark:hover:dark:bg-gray-400 dark:focus:ring-gray-200\"\n          onClick={() => toggleTheme()}\n        >\n          \uD83C\uDF13︎\n        </button>\n      </div>\n    </nav>\n  );\n};\n```\n\n### SEO, Meta 태그\n\n이제 SEO를 위해 페이지마다 메타 태그를 넣어보자.\nNext.js에서 `_document.tsx`에 <Head> 내 다른 메타를 추가하면 메타 태그가 중복되는 문제가 발생했다.\n그래서 공통 메타와 페이지별 메타를 구분할 필요가 있어 root-layout과 article-layout을 나눴다.\n여기서도 다른 페이지에서 덮어씌워야 하는 메타 태그들은 key 값을 주어 중복을 방지했다.\n\n```jsx\n// src: [src/components/root-layout/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/components/root-layout/index.tsx)\nconst RootLayout: FC<RootLayoutProps> = props => {\n  const { children } = props;\n\n  return (\n    <div>\n      <Head>\n        <link\n          rel=\"icon\"\n          type=\"image/x-icon\"\n          href={`${IS_ENV_PROD ? PATH_PREFIX_PROD : ''}/favicon.ico`} // /template-nextjs-blog/favicon.ico\n        />\n        <meta name=\"color-scheme\" content=\"dark light\" />\n        <meta\n          key=\"keywords\"\n          name=\"keywords\"\n          content=\"blog, template, programming, it, tech\"\n        />\n\n        <meta\n          key=\"og:title\"\n          name=\"og:title\"\n          content=\"Next.js Blog Template | Home\"\n        />\n        <meta\n          key=\"og:description\"\n          name=\"og:description\"\n          content=\"Next.js Blog Template Website\"\n        />\n        <meta key=\"og:url\" name=\"og:url\" content={SITE_URL} />\n        <meta name=\"og:site_name\" content=\"Next.js Blog Template\" />\n      </Head>\n      {children}\n    </div>\n  );\n};\n```\n\n페이지마다 별도로 지정되는 메타들은 컴포넌트로 만들어 재활용했다.\n\n```jsx\n// src: [src/components/meta/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/components/meta/index.tsx)\nconst Meta = (props: MetaProps) => {\n  const { matter } = props;\n  /* ... */\n  return (\n    <>\n      <Head>\n        <title>{title}</title>\n        <meta key=\"description\" name=\"description\" content={description} />\n        <meta\n          key=\"keywords\"\n          name=\"keywords\"\n          content={`${keywords?.join(', ')}`}\n        />\n\n        <meta key=\"og:title\" name=\"og:title\" content={title} />\n        <meta\n          key=\"og:description\"\n          name=\"og:description\"\n          content={description}\n        />\n        {coverImagePath && (\n          <meta\n            key=\"og:image\"\n            name=\"og:image\"\n            content={`${SITE_URL}/${coverImagePath}`}\n          />\n        )}\n        <meta key=\"og:url\" name=\"og:url\" content={`${SITE_URL}/${slug}`} />\n      </Head>\n    </>\n  );\n};\n\nexport default Meta;\n```\n\n컴포넌트가 `getLayout`을 이용한다면 지정한 레이아웃으로 감싸고 그렇지 않으면 `_app.tsx`에서 지정한 레이아웃으로 감싸도록 했다.\n현재는 모든 페이지가 `getLayout`을 이용하지 않기 때문에 Root > Article로 이어지는 레이아웃으로 감싸진다.\n여기서 Markdoc의 `frontmatter`를 Meta에 넘겨 페이지마다 다른 메타를 노출하는 구성이다.\n\n```jsx\n// src: [src/pages/_app.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/_app.tsx)\nexport default function App({ Component, pageProps }: AppPropsWithLayout) {\n  const getLayout =\n    Component.getLayout ??\n    (page => {\n      const frontMatter = page.props.markdoc?.frontmatter;\n\n      return (\n        <RootLayout>\n          <ArticleLayout>\n            <Meta matter={frontMatter} />\n            {page}\n            <hr />\n          </ArticleLayout>\n        </RootLayout>\n      );\n    });\n\n  return getLayout(<Component {...pageProps} />);\n}\n```\n\n### RSS\n\nRSS 피드 기능을 추가하기 위해 다음 패키지들을 설치했다.\n\n```bash\npnpm add -D rss @types/rss\n```\n\n아티클들의 `matter` 정보를 넘겨받아 `rss.xml`를 public/에 생성한다.\n\n```ts\n// src: [src/lib/rss.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/lib/rss.ts)\n/* ... */\nconst generateRssFeed = async (articleMatters: ArticleMatter[]) => {\n  const siteOrigin =\n    process.env.NODE_ENV === 'production'\n      ? `https://binarydiver.github.io${PATH_PREFIX_PROD}`\n      : 'http://localhost:3000';\n\n  const feedOptions = {\n    title: 'Blog Title | RSS Feed',\n    description: 'Welcome to Blog Title',\n    site_url: siteOrigin,\n    feed_url: `${siteOrigin}/rss.xml`,\n    image_url: `${siteOrigin}/rss-512.png`,\n    pubDate: new Date(),\n    copyright: `Copyright ${new Date().getFullYear()}, Author`,\n  };\n\n  const feed = new RSS(feedOptions);\n\n  // Add each individual post to the feed.\n  articleMatters.map(articleMatter => {\n    feed.item({\n      title: articleMatter.title,\n      description: articleMatter.description,\n      url: `${siteOrigin}/${articleMatter.slug}`,\n      date: new Date(articleMatter.updatedAt),\n    });\n  });\n\n  // Write the RSS feed to a file as XML.\n  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));\n};\n\nexport default generateRssFeed;\n```\n\n가공된 `matter` 정보를 넘겨줄 수 있는 곳이 Home의 `getStaticProps`이므로 여기서 RSS 생성 함수를 호출한다.\n이러면 빌드할 때마다 갱신된 rss.xml이 생성된다.\n\n```jsx\n// src: [src/pages/index.tsx](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/pages/index.tsx)\nimport generateRssFeed from '../lib/rss';\n/* ... */\nexport const getStaticProps: GetStaticProps<HomeProps> = async () => {\n  /* ... */\n  const articleMatters = articlesPaths.map(articlePath => {\n    /* ... */\n  });\n\n  generateRssFeed(articleMatters);\n\n  return {\n    props: {\n      articleMatters,\n    },\n  };\n};\n```\n\n### Sitemap\n\n비슷하게 `sitemap.xml`도 빌드 시 생성되도록 구현했다.\n\n```bash\npnpm add sitemap --save-dev\n```\n\n```jsx\n// src: [src/lib/sitemap.ts](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/src/lib/sitemap.ts)\n/* ... */\nconst generateSitemap = async (articleMatters: ArticleMatter[]) => {\n  const sitemap = new SitemapStream({ hostname: BASE_URL + PATH_PREFIX_PROD });\n\n  const writeStream = createWriteStream('./public/sitemap.xml');\n  sitemap.pipe(writeStream);\n\n  sitemap.write({\n    url: PATH_PREFIX_PROD,\n    changefreq: EnumChangefreq.WEEKLY,\n    priority: 1.0,\n    lastmod: new Date().toISOString().substring(0, 10),\n    img: [],\n    video: [],\n    links: [],\n  } satisfies SitemapItem);\n\n  articleMatters.forEach(matter => {\n    const sitemapItem: SitemapItem = {\n      url: matter.slug,\n      changefreq: EnumChangefreq.WEEKLY,\n      priority: 0.8,\n      lastmod: matter.updatedAt.substring(0, 10),\n      img: matter.coverImagePath ? [{ url: matter.coverImagePath }] : [],\n      video: [],\n      links: [],\n    };\n    sitemap.write(sitemapItem);\n  });\n\n  sitemap.end();\n};\n\nexport default generateSitemap;\n```\n\n### 배포하기\n\n생성된 정적 웹사이트를 GitHub Page로 배포하기 위해 다음 패키지를 설치한다.\n\n```bash\npnpm add gh-pages --save-dev\n```\n\n여기서 코드를 main 으로 푸시할 때마다 자동으로 Page로 배포되도록 GitHub Action을 구성해도 된다.\n하지만 나는 그 정도 기능이 필요하지 않다고 여겨 커맨드로 배포하는 방식을 선택했다.\n커맨드 배포는 package.json에 아래 스크립트를 추가한다.\n`.nojekyll` 파일은 깃허브가 jekyll 프로젝트로 인식해서 언더스코어가 붙은 폴더를 무시하는 것을 막기 위해 생성해야 한다.\n그리고 커스텀 도메인을 사용한다면 CNAME 파일을 추가할 것을 권장한다.\n`CNAME` 파일이 없으면 배포할 때마다 커스텀 도메인이 풀려버리기 때문이다.\n\n```json\n// src: [package.json](https://github.com/binarydiver/template-nextjs-blog/blob/v1.0.0/package.json)\n{\n  /* ... */\n  \"scripts\": {\n    /* ... */\n    \"predeploy\": \"pnpm run build && touch out/.nojekyll && echo \\\"your-domain.com\\\" > out/CNAME\"\n    // ref. https://github.blog/news-insights/bypassing-jekyll-on-github-pages/\n    // ref. https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages#cname-errors\n  }\n}\n```\n\n이제 `pnpm run deploy`를 실행하면 `gh-pages` 브랜치에 out/에 생성된 정적 웹사이트가 올라가고 깃허브에 의해 호스팅된다.\n\n## Troubleshooting\n\n- 도메인 관리를 cloudflare로 할 때 custom domain 연결 후 접속 시 `too many request ...` 에러가 발생한다면, dns proxy를 끄거나 https 옵션을 full(strict)로 변경해야 한다.\n  > ref. [Fix “Too many redirects” error after enabling Cloudflare Proxy](https://medium.com/@flaviocopes/fix-too-many-redirects-error-after-enabling-cloudflare-proxy-7fb94fe98989)\n\n## To-Do\n\n- Markdoc의 기능을 이용해서 가독성을 높이는 태그를 추가 개발할 필요가 있다.\n- 초기에는 아티클 수가 적지만 많아지면 편의 상 검색 기능이 필요하다.\\\n  아무래도 텍스트 기반 검색이나 구글의 사이트 검색을 써야 할 것으로 보인다.\n- Markdoc의 예제가 Next.js의 페이지 라우팅을 이용하고 있어서 동일한 방식으로 구현했다.\\\n  하지만 앱 라우팅이 더 편리한 부분이 있어 변경하는 것을 고려할 수 있다.\n- 모든 글이 프로그래밍에 관련되지 않을 수 있어 카테고리를 나누어야 할 수 있다.\\\n  matter를 활용해서 태그 방식으로 하고 홈에서 나누어서 표시할 필요가 있다.\n- Markdoc의 heading node를 커스텀하여 fragment로 이동할 수 있게 했지만 현재 읽는 곳이 어느 위치인지 직관적이지 않다.\\\n  글이 길어지면 더욱 스크롤를 따라 내려오는 TOC(Table Of Contents)가 한쪽에 있는 것이 편리할 것이다.\n- Giscus는 깃허브에 로그인을 해야만 답글을 달 수 있어 한계가 있다.\\\n  이를 완전히 극복하려면 유료 서비스를 이용해야 하는데, 파이어베이스를 이용해서 라이브러리를 개발하면 무료로 상당량 받아낼 수 있을 것 같다.\n- Markdoc 관련 검색을 하다 [Astro](https://astro.build/)라는 서비스를 발견했는데 이것도 정적 웹사이트 제작이 가능하다.\\\n  한번 장점이 있는지 테스트해볼 필요가 있다.\n\n## Major References\n\n1. [Use Markdoc and Next.js to Build a Git-powered Markdown Blog](https://code.pieces.app/blog/building-blogs-markdoc-nextjs)\n2. [How to build a blog using Next.js and Markdoc](https://medium.com/@docploy/how-to-build-a-blog-using-next-js-and-markdoc-b4cfe8ed9dca)\n3. [Creating an RSS Feed in your Next.js Project](https://dev.to/promathieuthiry/creating-an-rss-feed-in-your-nextjs-project-20em)\n4. [Using Markdoc with Next.js](https://markdoc.dev/docs/nextjs)\n5. [GitHub: markdoc/markdoc-starter](https://github.com/markdoc/markdoc-starter)\n"),d=s.ZP.parse(m,{slots:!1}),p=d.attributes.frontmatter?a.ZP.load(d.attributes.frontmatter):{},{components:g}=(0,o.J)(l);var u=!0;let h={frontmatter:p};function b(n){let t=n.markdoc;return s.RZ.react(t.content,r,{components:{...g,...n.components}})}},5089:function(n,t,e){"use strict";e.r(t),e.d(t,{fence:function(){return m},heading:function(){return d}});var r=e(2676),a=e(9165),s=e.n(a),o=e(6123),i=e.n(o);e(3139),e(6478),e(1846),e(8460),e(2230),e(4956);var c=e(5271),l=e(9500);let m={render:n=>{let{children:t,"data-language":e}=n,a=t,o=(0,c.useRef)(null);(0,c.useEffect)(()=>{o.current&&i().highlightElement(o.current,!1)},[t]);let l=(()=>{if("string"==typeof t){let n=t.indexOf("\n"),e=t.slice(0,n);if(e.startsWith("// src: ")||e.startsWith("# src: ")){let r=e.match(/\[(.+)\]\((.+)\)/);if(r&&3===r.length)return a=t.slice(n+1),{title:r[1],url:r[2]}}}return null})();return(0,r.jsxs)("div",{className:"code","aria-live":"polite",children:[l&&(0,r.jsx)("div",{className:"bg-[#272822] mb-[-1em] mt-2 px-2 py-1 rounded-t w-fit",children:(0,r.jsx)(s(),{href:l.url,target:"_blank",children:l.title})}),(0,r.jsx)("pre",{ref:o,className:"language-".concat(e),children:a})]})},attributes:l.td.fence.attributes},d={render:n=>{let{id:t="",level:e=1,children:a,className:s}=n;return(0,r.jsx)("a",{href:"#".concat(t),className:"no-underline",children:(0,c.createElement)("h".concat(e),{id:t,className:["heading",s,"cursor-pointer","hover:after:opacity-100 after:content-['_#'] after:opacity-0 after:transition-opacity after:duration-300 after:text-gray-500"].filter(Boolean).join(" ")},a)})},children:["inline"],attributes:{id:{type:String},level:{type:Number,required:!0,default:1},className:{type:String}},transform(n,t){let e=n.transformAttributes(t),r=n.transformChildren(t),a=e.id&&"string"==typeof e.id?e.id:r.filter(n=>"string"==typeof n).join(" ").replace(/[?|\/]/g,"").replace(/\s+/g,"-").toLowerCase();return new l.Vp(this.render,{...e,id:a},r)}}},9030:function(n,t,e){"use strict";e.r(t),e.d(t,{image:function(){return a},jsfiddle:function(){return o}});var r=e(2629),a={render:e.n(r)(),attributes:{width:{type:Number,default:"500",errorLevel:"critical",required:!0},height:{type:Number,default:"500",errorLevel:"critical",required:!0},src:{type:String,errorLevel:"critical",required:!0},alt:{type:String,errorLevel:"critical",required:!0}}},s=e(2676),o={render:n=>(0,s.jsx)("iframe",{...n}),attributes:{width:{type:String,default:"100%",errorLevel:"critical",required:!0},height:{type:String,default:"500",errorLevel:"critical",required:!0},src:{type:String,errorLevel:"critical",required:!0}}}}},function(n){n.O(0,[539,133,888,774,179],function(){return n(n.s=8183)}),_N_E=n.O()}]);