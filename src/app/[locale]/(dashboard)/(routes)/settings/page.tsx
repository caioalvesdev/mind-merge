import { Heading } from "@/components/Heading";
import { SubscriptionButton } from "@/components/Subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";

export default async function SettingsPage() {
  // 'use server'
  // const t = useTranslations('dashboard');
  const isPro = await checkSubscription()

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings"
        icon={Settings}
        iconColor="text-gray-700"
        bgColog="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? 'You are currently on a pro plan' : 'You are currently on a free plan'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>

  )
}