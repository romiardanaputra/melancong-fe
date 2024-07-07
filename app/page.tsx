import React from 'react'
import { Button } from '@/components/ui/button'
// import DarkModeButton from '@/components/darkmode/DarkModeToggle'
import Image from 'next/image'

const imageKit = {
  url: 'https://ik.imagekit.io/melancong',
  pathMediaName: 'melancong'
}

const imgLanding = `${imageKit.url}/${imageKit.pathMediaName}/landing/bg-landing.webp`

const page = () => (
  <>
    <div className='h-screen max-h-screen'>
      <section>
        <div className='absolute size-full bg-blend-darken'>
          <Image
            src={imgLanding}
            alt='melancong-landing'
            width={1920}
            height={400}
            objectFit='cover'
            objectPosition='center'
            className='size-full object-cover object-center opacity-80'
            priority
          />
        </div>
        <div className='heading absolute flex size-full flex-col justify-between px-6 py-12 text-7xl font-black text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
          <div>
            <span>World Of</span>
            <span className='font-outline-2 block text-transparent'>
              Paradise,
            </span>
            Bali
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <Button
              className='bg-dark-300 p-6 py-8 font-black text-white'
              variant='secondary'
            >
              EXPLORE MORE
            </Button>

            <span className='text-center text-sm text-white'>
              Don&apos;t have an account? <a href='/login'>Login</a>
            </span>
          </div>
        </div>
      </section>
    </div>
  </>
)

export default page
