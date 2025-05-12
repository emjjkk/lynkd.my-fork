"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import Image from "next/image";

export default function LoginClient(props: any) {

    const t = props.t

    return (
        <>
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
                    <form className="flex flex-col items-center justify-center w-2/4">
                        <Input
                            type="email"
                            placeholder={t.login.email}
                            className="mb-2 rounded-[5px] bg-bg-secondary border-slate-500"
                            required
                        />
                        <Input
                            type="password"
                            placeholder={t.login.pwd}
                            className="mb-2 rounded-[5px] bg-bg-secondary border-slate-500"
                            required
                        />
                        <Button
                            type="submit"
                            className="mb-6 border border-ly-green bg-[#1cff0033] hover:bg-ly-green hover:text-black w-full"
                        >
                            {t.signup.btn}
                        </Button>

                        <p className="mb-6 text-sm text-muted-foreground">{t.login.or}</p>

                        <div className="flex w-full justify-between">
                            <Button
                                type="button"
                                variant="destructive"
                                className="mb-6 w-[49%] bg-red-500 hover:bg-red-600"
                            >
                                <FaGoogle className="mr-2 text-lg" /> Google
                            </Button>
                            <Button
                                type="button"
                                variant="default"
                                className="mb-6 bg-blue-500 hover:bg-blue-600 w-[49%]"
                            >
                                <FaDiscord className="mr-2 text-lg" /> Discord
                            </Button>
                        </div>
                        <p className="mb-6 text-sm">{t.login.signup1} {t.login.signup2}</p>
                    </form>
                </div>
                <div className="w-2/4 bg-background flex flex-col items-center justify-center p-10">
                </div>
            </main>
        </>
    )
}