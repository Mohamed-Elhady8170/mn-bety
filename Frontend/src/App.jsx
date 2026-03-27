import { RouterProvider } from 'react-router-dom';
import { router } from './routes/mainLayout';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.language.startsWith('ar');
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return <RouterProvider router={router} />;
}

export default App;