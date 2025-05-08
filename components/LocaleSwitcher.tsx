'use client';

import { useLocale } from '../app/providers';
import { useRouter } from 'next/navigation';

export default function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: 'en' | 'zh';
}) {
  const { setLocale } = useLocale();
  const router = useRouter();
  const otherLocale = currentLocale === 'en' ? 'zh' : 'en';

  const handleSwitch = () => {
    setLocale(otherLocale);
    window.location.reload(); // Trigger a full page refresh
  };

  return (
    <button
      onClick={handleSwitch}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      {currentLocale === 'en' ? 'Switch to 中文' : '切换至 English'}
    </button>
  );
}