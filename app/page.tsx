import { getTranslations } from '../lib/i18n';
import { cookies } from 'next/headers';
import LocaleSwitcher from '../components/LocaleSwitcher';

export default async function Home(){

  const cookieStore = cookies();
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value as 'en' | 'zh' || 'en';
  const t = getTranslations(locale);

  return(
    <>
      <h1 className="text-5xl text-ly-green">{t.language}</h1>
      <LocaleSwitcher currentLocale={locale} />
    </>
  )
}