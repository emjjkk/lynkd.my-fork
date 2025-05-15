import DashboardSidebar from '@/components/elements/DashboardSidebar'
import DashboardNavbar from '@/components/elements/DashboardNavbar'


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <main className='bg-bg-main w-full h-[100dvh]'>
        <DashboardNavbar/>
        <div className="h-[calc(100%-50px)] bg-bg-secondary rounded-t-3xl py-5 flex">
            <DashboardSidebar/>
            <section id="main-content" className="h-full w-[80%]">
              {children}
            </section>
        </div>
    </main>
  )
}