'use client'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'


import { cn } from '@/lib/utils'
import { Button } from '../ui/button'


const font = Montserrat({
  weight: '600',
  subsets: ['latin']
})

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <nav className='p-4 bg-transparent z-10 flex  items-center justify-between'>
      <Link href='/' className='flex items-center'>
        <div className='relative w-20 h-14 mr-2'>
          <Image 
            fill
            alt='logo'
            src='/brand/brand.png'
          />
          {/* <Image 
            fill
            alt='logo'
            src='/brand/brand.png'
          /> */}
        </div>
        <h1 className={cn('text-3xl font-extrabold text-zinc-900', font.className)} >
        MindMerge
        </h1>
      </Link>
      <div className='flex items-center gap-x-2'>
        <Link href={isSignedIn ? '/dashboard' : '/sign-in'}>
          <Button variant="outline" className='rounded-full'>
            {isSignedIn ? 'Dashboard' : 'Sign in'}
          </Button>
        </Link>

      </div>
    </nav>
  )
}