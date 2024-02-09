"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Testimonials = [{}];

export const LandingContent = () => {
  const t = useTranslations('index');
  
  return (
    <div id="why_us" className="px-10">
      <div className=" pb-10 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <h2 className="text-center text-lg font-semibold leading-8 dark:text-zinc-100 text-gray-900">
            {t('patterns')}
          </h2>

          <div className="mt-10 overflow-hidden">
            <div className="flex gap-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="animation-group flex min-w-full items-center justify-around gap-6"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="w-[205px] min-w-[205px]">
                      <Image src={`/logo/logo${index+1}.svg`} height='40' width='205' alt="Transistor" />
                    </div>
                  ))}
                  {/* <div className="w-[205px] min-w-[205px]">
                    <Image src="/logo/logo1.svg" height='40' width='205' alt="Transistor" />
                  </div>

                  <div className=" w-[205px] min-w-[205px]">
                    <Image src="/logo/logo2.svg" height='40' width='205' alt="Transistor" />
                  </div>

                  <div className=" w-[205px] min-w-[205px]">
                    <Image src="/logo/logo3.svg" height='40' width='205' alt="Transistor" />
                  </div>

                  <div className=" w-[205px] min-w-[205px]">
                    <Image src="/logo/logo4.svg" height='40' width='205' alt="Transistor" />
                  </div>

                  <div className=" w-[205px] min-w-[205px]">
                    <Image src="/logo/logo5.svg" height='40' width='205' alt="Transistor" />
                  </div> */}

                </div>
              ))}
            </div>
          </div>

          {/* <div className="mt-20 overflow-hidden">
            <div className="flex gap-6">
              <div
                className="animation-group flex min-w-full items-center justify-around gap-6"
                v-for="i in 2"
                >
                <div
                  className="flex h-[349px] w-[205px] min-w-[205px] flex-col even:justify-end"
                  v-for="card in cards"
                >
                  <div className="relative h-[288px] w-full overflow-hidden rounded-lg">
                    <Image
                      alt="logo"
                      src="/logo/logo5.svg"
                      width="205"
                      height="288"
                      className="absolute left-0 top-0 h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};
