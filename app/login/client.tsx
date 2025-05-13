"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginClient(props: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const router = useRouter();
    const t = props.t;

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error(t.login.errors.empty_fields);
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                toast.error(error.message.includes('Invalid login credentials') 
                    ? t.login.errors.invalid_credentials 
                    : error.message);
                return;
            }

            if (data.session) {
                toast.success(t.login.success);
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error(t.login.errors.general);
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthLogin = async (provider: "google" | "discord") => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            });

            if (error) {
                toast.error(error.message);
            }
        } catch (error) {
            toast.error(t.login.errors.general);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex w-full h-screen dark:text-white">
            <div className="w-2/4 bg-secondary flex flex-col items-center justify-center bg-bg-secondary">
                <Image
                    src="/assets/images/logo-100.png"
                    alt="Lynkd.my"
                    width={50}
                    height={50}
                    className="mb-5"
                />
                <h1 className="text-xl font-bold mb-5">{t.login.title}</h1>
                <form 
                    onSubmit={handleEmailLogin}
                    className="flex flex-col items-center justify-center w-2/4"
                >
                    <Input
                        type="email"
                        placeholder={t.login.email}
                        className="mb-2 rounded-[5px] bg-bg-secondary border-slate-500"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder={t.login.pwd}
                        className="mb-2 rounded-[5px] bg-bg-secondary border-slate-500"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        className="mb-6 border border-ly-green bg-[#1cff0033] hover:bg-ly-green hover:text-black w-full"
                        disabled={loading}
                    >
                        {loading ? t.login.loading : t.login.btn}
                    </Button>

                    <p className="mb-6 text-sm text-muted-foreground">{t.login.or}</p>

                    <div className="flex w-full justify-between">
                        <Button
                            type="button"
                            variant="destructive"
                            className="mb-6 w-[49%] bg-red-500 hover:bg-red-600"
                            onClick={() => handleOAuthLogin("google")}
                            disabled={loading}
                        >
                            <FaGoogle className="mr-2 text-lg" /> {t.login.oauth.google}
                        </Button>
                        <Button
                            type="button"
                            variant="default"
                            className="mb-6 bg-blue-500 hover:bg-blue-600 w-[49%]"
                            onClick={() => handleOAuthLogin("discord")}
                            disabled={loading}
                        >
                            <FaDiscord className="mr-2 text-lg" /> {t.login.oauth.discord}
                        </Button>
                    </div>
                    <p className="mb-6 text-sm">
                        {t.login.signup1}{' '}
                        <Link href="/signup" className="text-ly-green hover:underline">
                            {t.login.signup2}
                        </Link>
                    </p>
                </form>
            </div>
            <div className="w-2/4 bg-background flex flex-col items-center justify-center p-10">
                {/* Optional: Add login illustration or marketing content */}
            </div>
        </main>
    );
}