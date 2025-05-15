import { Manrope } from "next/font/google";
import { LocaleProvider } from './providers';
import { cookies } from 'next/headers';
import { Suspense } from 'react'
import "./globals.css";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "lynkd.my | feature-rich biolink page builder",
  description: "",
  icons: {
    icon: '/assets/images/logo-100.png',
  },
};

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
});

function validateLocale(locale: string | undefined): 'en' | 'zh' {
  return locale === 'zh' ? 'zh' : 'en'; // Defaults to 'en' if invalid
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const locale = validateLocale((await cookieStore).get('NEXT_LOCALE')?.value);

  return (
    <html lang={locale} className={manrope.className} suppressHydrationWarning>
      <body className="bg-bg-main text-color-main" suppressHydrationWarning>
        <Suspense>
          <LocaleProvider initialLocale={locale}>
            {children}
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}
