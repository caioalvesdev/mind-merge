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

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface IProps {
  apiLimitCount: number;
  isPro: boolean;
}
export const Sidebar = ({ apiLimitCount = 0, isPro = false }: IProps) => {
  const pathName = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white border border-zinc-200 text-zinc-900">
      <div className="px-3 py-2 flex-1">
       
        <Link href="/dashboard" className="flex items-center mb-10">

          <div className="relative w-16 h-12 mr-2">
            <Image fill alt="logo" src="/brand/brand.png" />
          </div>

          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
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
                cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-zinc-950 hover:bg-zinc-50 rounded-lg transition",
                  pathName === route.href ? 'text-zinc-950 bg-zinc-100' : 'text-zinc-500'
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

