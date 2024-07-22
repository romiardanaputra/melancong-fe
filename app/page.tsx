import { NextPage } from 'next'
import Image from 'next/image'
import balineseDance from '@/public/assets/images/balinese-dance.webp'
import CustomButton from '@/components/ui/CustomButton'

interface Props {}

const LandingPage: NextPage<Props> = () => {
  return (
    <>
      <div className='relative size-full'>
        <div className='absolute -z-10 size-full min-h-dvh'>
          <Image
            src={balineseDance}
            alt='balinese dance'
            className='aspect-auto h-full object-cover object-center'
            priority={true}
            width={1920}
            height={1080}
          />
        </div>
        <div className='flex min-h-dvh flex-col items-center justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
          <h1 className='text-8xl font-black'>
            WORLD OF{' '}
            <span className='font-outline-2 block text-transparent'>
              PARADISE,
            </span>
          </h1>
          <h2 className='text-8xl font-black'>BALI</h2>
          <CustomButton btnText='Explore More With Us' pathTo='/landing' />
        </div>
      </div>
    </>
  )
}

export default LandingPage
