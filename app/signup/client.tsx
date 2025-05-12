"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { toast } from "sonner";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage(props: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const router = useRouter();
    const t = props.t;

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error(t.signup.errors.password_mismatch);
            return;
        }

        if (password.length < 6) {
            toast.error(t.signup.errors.password_length);
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            if (data.user?.identities?.length === 0) {
                toast.error(t.signup.errors.email_exists);
            } else if (data.user?.confirmation_sent_at) {
                router.push("/confirm-email");
            } else {
                router.push("/dashboard");
            }
            
        } catch (error) {
            toast.error(t.signup.errors.general);
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthSignUp = async (provider: "google" | "discord") => {
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
            toast.error(t.signup.errors.general);
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
                <h1 className="text-xl font-bold mb-5">{t.signup.title}</h1>
                <form 
                    onSubmit={handleEmailSignUp}
                    className="flex flex-col items-center justify-center w-2/4"
                >
                    <Input
                        type="email"
                        placeholder={t.signup.email_address}
                        className="mb-2 rounded-[5px] bg-bg-secondary border-slate-500"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder={t.signup.pwd}
                        className="mb-2 rounded-[5px] bg-bg-secondary border-slate-500"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder={t.signup.cpwd}
                        className="mb-2 rounded-[5px] bg-bg-secondary border-slate-500"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        className="mb-6 border border-ly-green bg-[#1cff0033] hover:bg-ly-green hover:text-black w-full"
                        disabled={loading}
                    >
                        {loading ? t.signup.loading : t.signup.btn}
                    </Button>

                    <p className="mb-6 text-sm text-muted-foreground">{t.signup.or}</p>

                    <div className="flex w-full justify-between">
                        <Button
                            type="button"
                            variant="destructive"
                            className="mb-6 w-[49%] bg-red-500 hover:bg-red-600"
                            onClick={() => handleOAuthSignUp("google")}
                            disabled={loading}
                        >
                            <FaGoogle className="mr-2 text-lg" /> Google
                        </Button>
                        <Button
                            type="button"
                            variant="default"
                            className="mb-6 bg-blue-500 hover:bg-blue-600 w-[49%]"
                            onClick={() => handleOAuthSignUp("discord")}
                            disabled={loading}
                        >
                            <FaDiscord className="mr-2 text-lg" /> Discord
                        </Button>
                    </div>
                    <p className="mb-6 text-sm">{t.signup.login1} {t.signup.login2}</p>
                </form>
            </div>
            <div className="w-2/4 bg-background flex flex-col items-center justify-center p-10">
            </div>
        </main>
    );
}