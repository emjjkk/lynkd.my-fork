import SignupClient from './client'
import { cookies } from 'next/headers';
import { getTranslations } from '@/lib/i18n';

export const metadata = {title: "Sign Up | lynkd.my"};
export default async function Signup(){
    const cookieStore = cookies();
    const locale = (await cookieStore).get('NEXT_LOCALE')?.value as 'en' | 'zh' || 'en';
    const t = getTranslations(locale);
    return(<SignupClient t={t}/>)
}

/* main page content contained within client.tsx in the same directory */