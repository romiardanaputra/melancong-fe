'use client'

import { NextPage } from 'next'
import Image from 'next/image'

import withAuth from '@/app/withAuth'
import { IconArrowLeft, IconLocation, IconStar } from '@tabler/icons-react'
import type { DestinationDetail, DetailProps } from '../index.props'
import Loading from '../loading'
import ErrorDestination from '../error'
import { useDestinationDetail } from '@/hooks/destinations/useDestinationDetail'

const DestinationDetail: NextPage<DetailProps> = ({ id }) => {
  const { destination, loading, error } = useDestinationDetail(id)
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorDestination error={error} />
  }
  return (
    <>
      <div className='mx-auto max-w-md p-5 md:max-w-4xl'>
        <div className='relative overflow-hidden rounded-lg bg-white shadow-md'>
          <Image
            src={destination?.imageLink || ''}
            alt={destination?.name || ''}
            className='h-64 w-full rounded-t-lg object-cover md:h-96'
            layout='responsive'
            loading='lazy'
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
            width={500}
            height={500}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <button
            onClick={() => window.history.back()}
            className='absolute left-2 top-2 rounded-full bg-white bg-opacity-70 p-2'
          >
            <IconArrowLeft />
          </button>
          <div className='p-5'>
            <div className='mb-4 flex items-center justify-between'>
              <h1 className='text-2xl font-bold'>{destination?.name}</h1>
              <span className='flex items-center rounded-full bg-green-100 px-2 py-1 text-sm text-green-800'>
                <IconStar className='mr-1' /> {destination?.rating}
              </span>
            </div>
            <div className='mb-4 flex items-center text-gray-600'>
              <IconLocation /> {destination?.regency}, Bali
            </div>
            <div className='mb-4 flex items-center'>
              <span className='mr-2 rounded-full bg-blue-100 px-2 py-1 text-blue-800'>
                {destination?.childEntry}
              </span>
              <span className='rounded-full bg-blue-100 px-2 py-1 text-blue-800'>
                {destination?.adultsEntry}
              </span>
            </div>
            <div className='mb-4 text-justify text-gray-700'>
              <div
                dangerouslySetInnerHTML={{
                  __html: destination?.information || ''
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuth(DestinationDetail)
