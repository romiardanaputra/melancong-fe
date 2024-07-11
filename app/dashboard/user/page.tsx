'use client'
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Image from 'next/image'

const imageKit = {
  url: 'https://ik.imagekit.io/melancong',
  pathMediaName: 'melancong',
  folder: ['landing', 'dashboard'],
  imgName: {
    carousel1: 'carousel-1.webp',
    carousel2: 'carousel-2.webp',
    landing: 'bg-landing.webp'
  }
}

const imgSlide = `${imageKit.url}/${imageKit.pathMediaName}/${imageKit.folder[0]}/${imageKit.imgName.landing}`

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className='mx-auto w-full'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          <CarouselItem>
            <div className='relative flex aspect-square items-center justify-center'>
              <Image
                src={imgSlide}
                className='h-full w-full object-fill'
                alt='carousel dashboard 1'
                width={390}
                height={324}
              />
              <div className='absolute inset-0 flex flex-col items-start justify-end pb-4 pl-4 text-center'>
                <span className='mb-2 text-4xl font-semibold text-white'>
                  Tanah Lot
                </span>
                <span className='text-xl text-white'>
                  Wisata dengan penuh keindahan
                </span>
                <span className='text-xl text-white'>
                  <a href='#'>See More</a>
                </span>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div>
              <Card>
                <CardContent className='relative flex aspect-square items-center justify-center'>
                  <Image
                    src={imgSlide}
                    className='h-full w-full object-fill'
                    alt='carousel dashboard 2'
                    width={390}
                    height={324}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='absolute left-2 top-1/2 -translate-y-1/2 transform' />
        <CarouselNext className='absolute right-2 top-1/2 -translate-y-1/2 transform' />
      </Carousel>

      {/*  Search Form  */}

      <div className='mx-auto mb-8 max-w-lg'>
        <form
          action='#'
          method='GET'
          className='flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white'
        >
          <input
            type='text'
            name='search'
            placeholder='Search...'
            className='w-full px-4 py-2 focus:outline-none'
          ></input>
          <button
            type='submit'
            onClick={toggleSidebar}
            className='bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            fitur
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-96 transform bg-white text-dark-200 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className='bg-slate-400 p-4'>
          {' '}
          <button className='text-dark-300' onClick={toggleSidebar}>
            Filter
          </button>
        </div>
        <div className='p-4'>
          <div className='mt-4'>
            {/* Add your sidebar content here */}
            <p className='text-lg font-semibold'>Location</p>
            <div className='grid grid-cols-3 gap-3'>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox visually-hidden h-5 w-5 text-gray-600'
                  />
                  <span className='ml-2'>Tabanan</span>
                </label>
              </div>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox visually-hidden h-5 w-5 text-gray-600'
                  />
                  <span className='ml-2'>Tabanan</span>
                </label>
              </div>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox visually-hidden h-5 w-5 text-gray-600'
                  />
                  <span className='ml-2'>Tabanan</span>
                </label>
              </div>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox visually-hidden h-5 w-5 text-gray-600'
                  />
                  <span className='ml-2'>Tabanan</span>
                </label>
              </div>
            </div>

            <hr className='my-6 border-gray-500' />

            <p className='text-lg font-semibold'>Destination</p>
            <div className='grid grid-cols-3 gap-3'>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <p className='text-center'>Tabanan</p>
              </div>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <p className='text-center'>Tabanan</p>
              </div>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <p className='text-center'>Tabanan</p>
              </div>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <p className='text-center'>Tabanan</p>
              </div>
            </div>

            <hr className='my-6 border-gray-500' />

            <div className='grid grid-cols-2 items-center justify-center'>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <button className='text-center'>Submit</button>
              </div>
              <div className='mt-3 flex h-12 w-28 items-center justify-center rounded-full bg-slate-300'>
                <button className='text-center'>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          {/* <!--Card 1--> */}
          <div className='overflow-hidden rounded border-2 border-solid border-gray-200 bg-white shadow-sm'>
            <img
              className='h-40 w-full object-cover object-center'
              src={imgSlide}
              alt='Temple'
            />
            <div className='px-6 py-4'>
              <p className='text-base text-gray-700'>Bedugul</p>
            </div>
            <div>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #photography
              </span>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #travel
              </span>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #winter
              </span>
            </div>
          </div>

          {/* <!--Card 2--> */}
          <div className='overflow-hidden rounded border-2 border-solid border-gray-200 bg-white shadow-sm'>
            <img
              className='h-40 w-full object-cover object-center'
              src={imgSlide}
              alt='Temple'
            />
            <div className='px-6 py-4'>
              <p className='text-base text-gray-700'>Bedugul</p>
            </div>
            <div>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #photography
              </span>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #travel
              </span>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #winter
              </span>
            </div>
          </div>

          {/* <!--Card 3--> */}
          <div className='overflow-hidden rounded border-2 border-solid border-gray-200 bg-white shadow-sm'>
            <img
              className='h-40 w-full object-cover object-center'
              src={imgSlide}
              alt='Temple'
            />
            <div className='px-6 py-4'>
              <p className='text-base text-gray-700'>Bedugul</p>
            </div>
            <div>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #photography
              </span>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #travel
              </span>
              <span className='mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                #winter
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
