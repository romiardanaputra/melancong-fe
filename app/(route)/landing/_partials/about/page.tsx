import { NextPage } from 'next'
import { ImageGrid } from './_partials/ImageGrid'

import AboutList from '@/app/(route)/landing/_partials/about/_partials/AboutList'
import { AboutLists } from '@/data/about-list'

interface Props {}

const About: NextPage<Props> = () => {
  return (
    <>
      <div className='container pt-20 lg:pt-40'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3'>
          <div className='col-span-1 space-y-4 xl:space-y-6'>
            <h1 className='text-3xl font-bold tracking-wide text-neutral-800 md:mb-8 md:text-5xl lg:mb-4'>
              Experience The <span>New Adventure</span>
            </h1>
            <p className='text-pretty pb-8 text-sm text-neutral-600 lg:pb-0'>
              Melancong is a website that showcases tourist destinations in
              Bali, providing recommendations for traveling around Bali with
              various features and offering the best recommendations to assist
              in decision-making.
            </p>
            <div className='hidden md:block lg:hidden'>
              <ImageGrid />
            </div>
            <div className='grid grid-cols-1 space-y-4 pt-4 md:grid-cols-3 md:pt-6 lg:grid-cols-1 xl:space-y-6'>
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
          <div className='col-span-1 hidden px-8 lg:col-span-2 lg:block xl:col-span-2'>
            <ImageGrid />
          </div>
        </div>
      </div>
    </>
  )
}

export default About
