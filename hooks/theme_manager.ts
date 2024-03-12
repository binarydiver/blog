import { useEffect, useState } from 'react';

const useThemeStatus = (theme?: string) => {
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  useEffect(() => {
    if (
      theme === 'dark' ||
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }

    document.documentElement.classList.remove('dark');
    setIsDarkMode(false);
  }, [theme]);

  return isDarkMode;
};

export default useThemeStatus;
