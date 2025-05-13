"use client"
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'

export default function Client(props: any) {

    const t = props.t
    const { user, loading } = useAuth()

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center w-full h-screen dark:text-white">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <p>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-screen dark:text-white">
            {/* Dashboard content */}
            {/* Access user data via user.auth and user.profile */}
        </div>
    )
}