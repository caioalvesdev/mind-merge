"use client";

import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/Free-counter";
import { useTranslations } from "next-intl";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });



interface IProps {
  apiLimitCount: number;
  isPro: boolean;
}
export const Sidebar = ({ apiLimitCount = 0, isPro = false }: IProps) => {
  const t = useTranslations('dashboard');
  const pathName = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: t('services.chat'),
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
    },
    {
      label: t('services.image'),
      icon: ImageIcon,
      href: "/image",
      color: "text-pink-700",
    },
    {
      label: t('services.video'),
      icon: VideoIcon,
      href: "/video",
      color: "text-orange-700",
    },
    {
      label: t('services.music'),
      icon: MusicIcon,
      href: "/music",
      color: "text-emerald-500",
    },
    {
      label: t('services.code'),
      icon: Code,
      href: "/code",
      color: "text-green-700",
    },
    {
      label: t('services.settings'),
      icon: Settings,
      href: "/settings",
    },
  ];
  return (
    <div className="space-y-4 py-4 flex flex-col bg-background h-full border dark:border-zinc-900 border-zinc-200 text-zinc-900">
      <div className="px-3 py-2 flex-1">
       
        <Link href="/dashboard" className="flex items-center mb-10">

          <div className="relative w-16 h-12 mr-2">
            <Image fill alt="logo" src="/brand/brand.png" />
          </div>

          <h1 className={cn("text-2xl text-primary font-bold", montserrat.className)}>
            {/* MentumAI */}
            MindMerge
            {/* "MindMerge" Isso sugere uma fusão ou integração de mentes, indicando um assistente que trabalha em conjunto com o usuário para combinar conhecimentos e oferecer suporte mental. */}
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={
                cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-zinc-950 hover:dark:text-zinc-900 hover:bg-zinc-50 rounded-lg transition",
                  pathName === route.href ? 'text-zinc-950  bg-zinc-100' : 'text-zinc-500 dark:text-zinc-100'
                )
              }
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

