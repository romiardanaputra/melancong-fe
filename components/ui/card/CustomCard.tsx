/* eslint-disable quotes */
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa'

interface ImageCardProps {
  title: string
  img: string
  rating: string | number
  description: string
  location: string
  clickToDetail?: () => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  isSaveAvailable: boolean
  handleToggleSave?: () => void
  isSaved?: boolean
  handleDelete?: () => void
  isSavedRemove?: boolean
}

const CustomCard: NextPage<ImageCardProps> = ({
  title,
  img,
  rating,
  description,
  location,
  clickToDetail,
  onKeyPress,
  isSaveAvailable,
  handleToggleSave,
  isSaved,
  handleDelete,
  isSavedRemove
}) => {
  return (
    <>
      <div
        className='max-w-sm transform rounded-[22px] bg-white shadow-xl transition duration-400 hover:-translate-y-2 dark:bg-zinc-900'
        role='button'
        tabIndex={0}
        onClick={clickToDetail}
        onKeyPress={onKeyPress}
      >
        <div className='relative h-[200px] overflow-hidden rounded-lg p-0'>
          <Image
            src={img}
            alt={title}
            height='400'
            width='400'
            className='aspect-[4/3] object-cover object-center sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3]'
            loading='lazy'
            quality={10}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
          />
          {isSaveAvailable && (
            <button
              type='button'
              onClick={e => {
                e.stopPropagation()
                if (isSavedRemove) {
                  if (handleDelete) {
                    handleDelete()
                  }
                }
                if (handleToggleSave) {
                  handleToggleSave()
                }
              }}
              className={`absolute right-0 top-0 p-4 ${isSaved ? 'bg-cyan-500' : 'bg-white/80'}`}
            >
              <FaStar className='text-neutral-900' />
            </button>
          )}
        </div>
        <div className='p-5'>
          <p className='mb-2 mt-4 text-base font-bold text-neutral-900 dark:text-neutral-200 sm:text-xl'>
            {title}
          </p>
          <p className='mb-2 text-sm font-medium'>{location}</p>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {description}
          </p>
          <div className='mt-4 flex items-center justify-between gap-4'>
            <Link href='/login' className='text-sm font-medium'>
              Read More...
            </Link>
            <button className='flex items-center space-x-1 rounded-full bg-black py-1 pl-4 pr-1 text-xs font-bold text-white dark:bg-zinc-800'>
              <p>Rating </p>
              <p className='rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white'>
                {rating}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomCard
