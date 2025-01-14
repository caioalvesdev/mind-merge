import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-14 h-10 relative animate-spin">
        <Image 
          alt='logo'
          src='/brand/brand.png'
          fill
        />
      </div>
      <p className="text-sm text-muted-foreground">
        MindMerge is Thinking...
      </p>
    </div>
  )
}