import Image from 'next/image';
import { useEffect, useState } from 'react';

type NavigationProps = {
  title: string;
};

const Navigation = (props: NavigationProps) => {
  const { title } = props;
  const [isDarkMode, setIsDarkMode] = useState<boolean>();

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const onDarkModeButtonClick = () => {
    if (!isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  };

  return (
    <div className="border-b">
      <div className="max-w-5xl mx-auto">
        <div className="flex">
          <div className="flex-auto">
            <nav className="p-4 text-center">
              <h1 className="text-3xl">{title}</h1>
            </nav>
          </div>
          <div className="flex-initial flex items-center">
            <button
              type="button"
              title="dark mode"
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-full p-2 me-2 dark:bg-slate-300 dark:hover:bg-slate-400"
              onClick={onDarkModeButtonClick}
            >
              <Image
                src={isDarkMode ? '/light.png' : '/dark.png'}
                width={32}
                height={32}
                alt="dark mode toggle icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
