import { NextPage } from 'next'
import Image from 'next/image'
import aboutImage from '@/public/assets/images/potrait/image-1-potrait.webp'

import AboutList from '@/app/(route)/about/_partials/AboutList'
import { AboutLists } from '@/data'

interface Props {}

const About: NextPage<Props> = () => {
  return (
    <>
      <div className='container pt-20 lg:pt-40'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
          <div className='col-span-1 space-y-4 xl:space-y-6'>
            <h1 className='text-3xl font-bold tracking-wide text-neutral-800 md:text-5xl'>
              Experience The <span>New Adventure</span>
            </h1>
            <p className='text-pretty text-sm text-neutral-600'>
              Melancong is a website that showcases tourist destinations in
              Bali, providing recommendations for traveling around Bali with
              various features and offering the best recommendations to assist
              in decision-making.
            </p>
            <div>
              <Image
                src={aboutImage}
                alt='about-image'
                width={1080}
                height={400}
                className='aspect-square h-72 rounded-xl object-cover object-center sm:h-96 md:h-[400px] lg:hidden'
                loading='lazy'
                placeholder='blur'
              />
            </div>
            <div className='grid grid-cols-1 space-y-4 pt-4 md:grid-cols-3 md:pl-4 md:pt-6 lg:grid-cols-1 lg:pl-0 xl:space-y-6'>
              {AboutLists.map(item => (
                <AboutList
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
          <div className='col-span-1 hidden md:pl-8 lg:block lg:pl-16 xl:col-span-2'>
            <Image
              src={aboutImage}
              alt='about-image'
              width={1080}
              height={400}
              className='aspect-square rounded-xl object-cover object-center lg:h-full xl:h-[85%] 2xl:h-[70%]'
              loading='lazy'
              placeholder='blur'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default About
