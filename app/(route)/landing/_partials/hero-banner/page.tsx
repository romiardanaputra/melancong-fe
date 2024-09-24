'use client'
import { NextPage } from 'next'
import { ImagesSlider } from '@/components/ui/hero/ImageSlider'
import { motion } from 'framer-motion'
import { FlipWords } from '@/components/ui/text/FlipWord'
import { heroImageSliderImages, words } from '@/data/index'
import Link from 'next/link'
interface Props {}

const HeroBanner: NextPage<Props> = () => {
  return (
    <>
      <ImagesSlider className='h-[50rem]' images={heroImageSliderImages}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          className='z-50 flex flex-col items-start justify-start'
        >
          <motion.p className='text-left text-lg font-medium text-neutral-400'>
            Welcome to Melancong
          </motion.p>
          <motion.div className='bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-left text-xl font-bold text-transparent md:text-5xl'>
            Let&apos;s <FlipWords words={words} /> <br /> Great Destination With
            Us
          </motion.div>
          <button className='mt-4 transform rounded-lg border border-neutral-200 bg-transparent px-8 py-2 font-bold text-neutral-200 transition duration-400 will-change-transform hover:-translate-y-1 dark:border-white dark:text-white'>
            <Link href='/landing#services' className='block p-4 tracking-wider'>
              What we offer?
            </Link>
          </button>
        </motion.div>
      </ImagesSlider>
    </>
  )
}

export default HeroBanner
