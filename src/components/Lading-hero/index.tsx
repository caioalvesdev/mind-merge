'use client'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'

import TypewriterComponent from 'typewriter-effect'
import { Button } from '../ui/button'
import Link from 'next/link'
import {useTranslations} from 'next-intl';

export const LandingHero = () => {
  const t = useTranslations('index');
  const { isSignedIn } = useAuth()

  return (
    <div className="text-zinc-700 dark:text-zinc-100 relative font-bold py-36 text-center space-y-5">
      <div className="absolute left-0 top-0 flex h-full w-full justify-center">
        <div className="mask-radial h-full max-h-[651px] w-full max-w-[1314px] bg-pattern" >
          <Image
            src="/blobs/hero.svg"
            fill
            className="block h-full w-full object-cover object-center"
            alt="Menthor hero blobs"
          />
        </div>
      </div>
      <div className="text-4xl relative sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>{t('title')}</h1>
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ">
          <TypewriterComponent 
            options={{
              strings: [
                t('services.chat'),
                t('services.image'),
                t('services.music'),
                t('services.code'),
                t('services.video'),
              ],
              autoStart: true,
              loop: true
            }}
          />  
        </div>
      </div>
      <div className='text-sm md:text:xl font-light text-zinc-400 dark:text-zinc-100'>
          {t('description')}
      </div>
      <div className='relative'>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant='premium' className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
            {t('button')}
          </Button>
        </Link>
      </div>
      <div className='text-zinc-400 dark:text-zinc-100 text-xs md:text-sm font-normal'>
        {t('credit')}
      </div>

      <Link
        className="block relative mx-auto mb-10 w-fit rounded-full bg-zinc-900 hover:bg-zinc-800 px-4 py-1 text-center text-[10px] font-semibold text-white md:text-xs"
        href=""
        target="_blank"
      >
        ✨ {t('invite')}
      </Link>
    </div>
  )
}