"use client"
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react' 

export default function Client(props: any) {

    const t = props.t
    const { user, loading } = useAuth()
    const url = user?.profile.username + '?preview=true'

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center w-full h-screen dark:text-white">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="flex w-full h-full">
                <div className='px-5 w-2/3 border-r border-bg-main h-full'>
                    <header className="mt-1 text-lg font-semibold">General</header>
                </div>
                <div className="w-1/3 px-5 h-full">
                    <iframe src={url} className="w-full h-full rounded-md"></iframe>
                </div>
            </section>
        </>
    )
}