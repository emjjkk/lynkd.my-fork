"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ClientPage({ pageData, boost }: { pageData: any; boost: boolean }) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000); // 👀 minimum 3s
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-white text-black text-center gap-4">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
        {!boost && (
          <p className="text-lg">Create your own page like this on <strong>lynkd.my</strong></p>
        )}
      </main>
    );
  }

  const zoomStyle = isPreview ? { zoom: "0.85" } : {};
  const links = pageData?.links ? Object.values(pageData.links).sort((a: any, b: any) => a.order - b.order) : [];
  const socials = pageData?.socials || {};

  return (
    <main style={zoomStyle} className="w-full min-h-screen bg-white text-black">
      <section className="flex flex-col items-center justify-center p-6 gap-2">
        {/* Display Name */}
        {pageData.display_name && (
          <h1 className="text-2xl font-bold">{pageData.display_name}</h1>
        )}

        {/* Bio */}
        {pageData.bio && (
          <p className="text-sm text-gray-600 text-center">{pageData.bio}</p>
        )}

        {/* Links */}
        <div className="mt-4 flex flex-col gap-3 w-full max-w-md">
          {links.map((link: any, i: number) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:opacity-80 transition"
            >
              {link.title}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}