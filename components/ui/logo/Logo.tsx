import Image from 'next/image'
import React from 'react'

interface LogoProps {
  className?: string
  width: number
  height: number
}
export default function Logo({
  className,
  width,
  height
}: LogoProps): React.ReactNode {
  const imgLogo = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL}/melancong-logo-default.webp`
  return (
    <div className='flex items-center'>
      <Image
        src={imgLogo}
        alt='melancong logo'
        width={width}
        height={height}
        className={className ?? 'aspect-square'}
        priority
      />
    </div>
  )
}
