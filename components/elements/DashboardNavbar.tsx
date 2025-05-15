"use client"
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'
import {LuCopy, LuQrCode, LuCrown, LuSettings} from 'react-icons/lu'

export default function DashboardNavbar(){
    const { user, loading } = useAuth()
    console.log(user)

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center w-full h-screen dark:text-white">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                </div>
            </div>
        )
    }

    return(
        <>
        <header className="w-full flex items-center justify-between p-5 h-[50px] !text-white">
            <div className="header-left flex items-center">
                <img src="/assets/images/logo-100.png" alt="" className="w-5 mr-2" />
                <span className="text-md font-semibold">lynkd.my</span>
                <span className="mx-2 text-md text-black">/</span>
                <img src={user?.profile.page_data.pfp} alt="" className="w-5 h-5 rounded-full mr-2" />
                <span className="text-md">{user?.profile.username}</span>
                <div className="flex items-center ml-4">
                    <button className="text-md mr-2"><LuCopy/></button>
                    <button className="text-md mr-2"><LuQrCode/></button>
                </div>
            </div>
            <div className="header-right flex items-center">
                <a href="" className="text-sm mr-3 flex items-center font-semibold text-yellow-500"><LuCrown className="mr-1"/>Upgrade to Premium</a>
                <LuSettings className="text-md"/>
            </div>
        </header>
        </>
    )
}