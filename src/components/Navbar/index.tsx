
import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "@/components/MobileSidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { LocaleToggle } from "../Locale-toggle";
import { ThemeToggle } from "../Theme-toggle";

export const NavBar = async () => {
  const apiLimitCount = await getApiLimitCount()
  const isProp = await checkSubscription()

  return (
    <div className="flex items-center py-4 px-6">
      <div className="absolute left-0 top-0 flex h-[90px] w-full justify-center overflow-hidden pointer-events-none">
        <div className="relative left-20 h-full w-full max-w-[1017px]">
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(236,_72,_153,_0.2)_0%,_rgba(236,_72,_153,_0)_100%)] absolute bottom-0 left-0 h-[179px] w-[678px]" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(37,_99,_235,_0.2)_0%,_rgba(28,_100,_242,_0)_100%)] absolute bottom-0 right-0 h-[179px] w-[678px]" />
        </div>
      </div>
      <MobileSidebar isPro={isProp} apiLimitCount={apiLimitCount}/>
      <div className="flex items-center w-full gap-x-10 justify-end">
        <div className='flex gap-x-3'>
          <LocaleToggle />
          <ThemeToggle />
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

