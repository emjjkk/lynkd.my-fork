// app/[username]/page.tsx

import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import ClientPage from "./client";
import { notFound } from "next/navigation";

// 🔥 METADATA (Server)
export async function generateMetadata(
  { params }: { params: { username: string } }
): Promise<Metadata> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("users")
    .select("username")
    .eq("username", params.username)
    .single();

  if (!data || error) return {};

  return {
    title: `${data.username}`,
    description: `Check out ${data.username}'s links on Lynkd.`,
    openGraph: {
      title: `${data.username} | Lynkd`,
      description: `Check out ${data.username}'s links on Lynkd.`,
      url: `https://lynkd.my/${data.username}`,
    },
  };
}

// 🔥 SERVER fetch, then pass props to ClientPage
export default async function UserPage({ params }: { params: { username: string } }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("page_data, upgraded")
    .eq("username", params.username)
    .single();

  if (!data || error) return notFound();

  return <ClientPage pageData={data.page_data} boost={data.upgraded} />;
}