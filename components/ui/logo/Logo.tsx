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
  const imgLogo =
    'https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2Fopengraph-image.png?alt=media&token=24acb563-01ba-4a64-9a3e-4de41c1d4eb4'
  return (
    <div className='flex items-center'>
      <Image
        src={imgLogo}
        alt='melancong logo'
        width={width}
        height={height}
        className={className ?? 'aspect-square'}
        priority={true}
      />
    </div>
  )
}
