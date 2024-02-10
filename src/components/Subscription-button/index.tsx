'use client'

import { toast } from "sonner"
import { Zap } from "lucide-react"
import { Button } from "../ui/button"
import axios from "axios"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface IProps {
  isPro: boolean
}
export const SubscriptionButton = ({ isPro }: IProps) => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {

      toast("Algo deu errado", {
        description: "Tente novamente mais tarde",
        action: {
          label: "Fechar",
          onClick: () => {},
        },
      })

      console.log('BILLING_ERROR', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button disabled={loading} variant={isPro ? 'default' : 'premium'} onClick={onClick}>
      <Loader2 className={cn('h-0 w-0 animate-spin transition-all', loading && 'mr-2 h-5 w-5')} />
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
}