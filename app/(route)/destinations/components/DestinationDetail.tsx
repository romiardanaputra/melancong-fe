'use client'

import { NextPage } from 'next'
import Link from 'next/link'

import withAuth from '@/app/withAuth'
import { IconArrowLeft, IconMapPin, IconStar } from '@tabler/icons-react'
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
      <div className='container mx-auto min-h-dvh max-w-md p-5 sm:max-w-4xl xl:max-w-full'>
        <div className='relative grid grid-cols-1 overflow-hidden rounded-lg bg-white xl:grid-cols-2 xl:gap-8 xl:p-8'>
          <div
            className='h-60 rounded-md bg-cover bg-center bg-no-repeat sm:h-96 xl:h-full'
            style={{ backgroundImage: `url(${destination?.imageLink || ''})` }}
          ></div>

          <button
            onClick={() => window.history.back()}
            className='absolute left-2 top-2 rounded-full bg-white bg-opacity-70 p-2'
          >
            <IconArrowLeft />
          </button>
          <div className='space-y-6 p-5'>
            <div className='mb-4 flex items-center justify-between'>
              <h1 className='text-2xl font-bold'>{destination?.name}</h1>
              <span className='flex items-center rounded-full bg-green-100 px-2.5 py-2 text-sm text-green-800'>
                <IconStar className='mr-1 size-4' /> {destination?.rating}
              </span>
            </div>
            <div className='flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center'>
              {destination?.location && (
                <div className='flex w-fit items-center gap-2 rounded-full bg-cyan-700 px-4 py-2 text-neutral-200'>
                  <IconMapPin className='size-5' />
                  <Link target='_blank' href={destination?.location}>
                    Google Maps
                  </Link>
                </div>
              )}
            </div>
            <div className='space-y-2 text-sm'>
              <h3 className='font-bold text-neutral-700'>Location:</h3>
              <div className='order-2 mb-2 flex items-center gap-2 sm:mb-0'>
                <span>{destination?.regency}, Bali</span>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-sm font-bold text-neutral-700'>Pricing:</h3>
              <div className='flex items-center text-sm font-medium'>
                <span className='mr-2 rounded-full bg-blue-100 px-4 py-2 text-blue-800'>
                  Child: {destination?.childEntry}
                </span>
                <span className='rounded-full bg-blue-100 px-4 py-2 text-blue-800'>
                  Adult: {destination?.adultsEntry}
                </span>
              </div>
            </div>

            <div className='space-y-4 text-justify text-sm leading-relaxed text-gray-700'>
              <span className='font-bold'>Description:</span>
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
