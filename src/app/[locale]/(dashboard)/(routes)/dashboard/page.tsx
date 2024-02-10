'use client'

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { 
  MessageSquare, 
  ImageIcon, 
  VideoIcon, 
  MusicIcon, 
  Code, 
  ArrowRight,
  PieChart
} from "lucide-react";
import { useTranslations } from "next-intl";




const DashboardPage = () => {
  const t = useTranslations('dashboard');
  const tools = [
    {
      label: t('services.chat'),
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
      bgColor: "bg-violet-500/10"
    },
    {
      label: t('services.image'),
      icon: ImageIcon,
      href: "/image",
      color: "text-pink-700",
      bgColor: "bg-pink-700/10"
    },
    {
      label: t('services.video'),
      icon: VideoIcon,
      href: "/video",
      color: "text-orange-700",
      bgColor: "bg-orange-700/10"
    },
    {
      label: t('services.music'),
      icon: MusicIcon,
      href: "/music",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      label: t('services.code'),
      icon: Code,
      href: "/code",
      color: "text-green-700",
      bgColor: "bg-green-700/10"
    },
    {
      label: t('services.graphic'),
      icon: PieChart,
      href: "",
      color: "text-indigo-700",
      bgColor: "bg-indigo-700/10"
    },
  ]
  const router = useRouter()
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
            {t('title')}
        </h2>
        <p className="text-muted-foreground text-center font-light text-sm md:text-lg">
          {t('description')}
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className="p-4 border-primary/5 flex items-center justify-between last:hover:shadow-none hover:shadow-md transition cursor-pointer last:cursor-not-allowed last:select-none last:opacity-45"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-8 h-8', tool.color)} />
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
                <ArrowRight className="w-5 h-5"/>
            </Card>
          ))}
      </div>
    </div>
  )
}


export default DashboardPage