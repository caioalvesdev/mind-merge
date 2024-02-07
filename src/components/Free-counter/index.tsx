import { useEffect, useState } from "react"
import { Card, CardContent } from "../ui/card"
import { MAX_FREE_COUNT } from "@/constants"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"
import { Zap } from "lucide-react"
import { useProModal } from "@/hooks/use-pro-model"

interface IProps {
  apiLimitCount: number
  isPro: boolean
}

export const FreeCounter = ({ apiLimitCount, isPro = false }: IProps) => {
  const proModal = useProModal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (isPro) {
    return null
  }

  return (
    <div className="px-3">
      <div className="group w-full relative inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-pink-400 p-0.5 text-sm font-medium text-gray-900">
        <Card className="w-full relative rounded-md bg-white bg-gradient-to-br from-blue-400/20 to-pink-400/20">
          <CardContent className="py-6">
            <div className="text-center text-sm text-zinc-900 mb-4 space-y-2">
              <p>
                {apiLimitCount} / {MAX_FREE_COUNT} Free Generations
              </p>
              <Progress
                className="h-3"
                value={(apiLimitCount / MAX_FREE_COUNT) * 100}
              />
            </div>
            <Button onClick={proModal.onOpen} variant='premium' className="w-full">
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}