"use client"
import { useAuth } from '@/hooks/useAuth'
import {LuLink, LuStore, LuPuzzle, LuPaintBucket, LuChartBar} from 'react-icons/lu'

export default function DashboardSidebar(){
    const { user, loading } = useAuth()
    console.log(user)

    return(
        <>
            <section className="w-[20%] h-[100%] px-5 bg-bg-secondary text-white rounded-tl-3xl border-r border-bg-main flex flex-col justify-between">
                <div>
                    <a href="" className="text-sm flex items-center py-2 px-4 rounded-md bg-bg-main text-ly-green">
                        <LuLink className="mr-2"/>
                        General
                    </a>
                    <a href="" className="text-sm flex items-center py-2 px-4 rounded-md">
                        <LuPaintBucket className="mr-2"/>
                        Themes
                    </a>
                    <a href="" className="text-sm flex items-center py-2 px-4 rounded-md">
                        <LuPuzzle className="mr-2"/>
                        Activity
                    </a>
                    <a href="" className="text-sm flex items-center py-2 px-4 rounded-md">
                        <LuStore className="mr-2"/>
                        Store
                    </a>
                    <a href="" className="text-sm flex items-center py-2 px-4 rounded-md">
                        <LuPaintBucket className="mr-2"/>
                        Engage
                    </a>
                    <a href="" className="text-sm flex items-center py-2 px-4 rounded-md">
                        <LuChartBar className="mr-2"/>
                        Analytics
                    </a>
                </div>
                <div>
                    <div className="w-full aspect-square bg-gradient-to-br from-red-500 to-purple-500 rounded-md p-5">
                        <h1 className="text-bold">Browse 100+ themes in the theme marketplace</h1>
                    </div>
                </div>
            </section>
        </>
    )
}