import { NavBar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { checkApiLimit, getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()
  return (
    <div className="h-full">
      <div className=" -left-72 md:left-0 fixed h-full z-10 md:flex md:w-72 md:flex-col md:inset-y-0 bg-gray-900 transition-all">
          <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
          <NavBar />
          {children}
      </main>
    </div>
  )
}

export default DashboardLayout;
