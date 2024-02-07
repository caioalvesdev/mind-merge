'use client'

import { toast } from "sonner"
import { Zap } from "lucide-react"
import { Button } from "../ui/button"
import axios from "axios"
import { useState } from "react"

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
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
}