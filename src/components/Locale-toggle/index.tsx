'use client'
import * as React from "react"
import { Moon, Sun, Languages } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname  } from "next/navigation"

interface ILocale {
  name: string
  value: string
}

export const LocaleToggle = () => {
  const pathname = usePathname()
  const router = useRouter()
  const locales: ILocale[] = [
    {
      name: 'Português',
      value: 'pt',
    },
    {
      name: 'Inglês',
      value: 'en',
    }
  ]

  const handleChange = ({ value }: ILocale) => {
    const replace = pathname.replace(/^\/(en|pt)\//, '/')

    if (['/en', '/pt'].includes(pathname)) {
      router.push(`/${value}`)
      return
    }
    router.push(`/${value}${replace}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Languages className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map(locale => (
          <DropdownMenuItem key={locale.name} onClick={() => handleChange(locale)}>
            {locale.name}
          </DropdownMenuItem>  
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
