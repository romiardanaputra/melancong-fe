'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/api/axios'
import withAuth from '@/app/withAuth'
import Image from 'next/image'
import { IconArrowLeft, IconLocation, IconStar } from '@tabler/icons-react'

interface DestinationDetail {
  id: string
  name: string
  regency: string
  rating: string
  location: string
  childEntry: string
  adultsEntry: string
  imageLink: string
  information: string
}

interface ErrorResponse {
  response: {
    status: number
  }
}

const DestinationDetailPage: React.FC<{ params: { id: string } }> = ({
  params
}) => {
  const [destination, setDestination] = useState<DestinationDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const fetchDestinationDetail = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/destinations/detail/${id}`)
        setDestination(response.data.data)
        setError('')
      } catch (err) {
        const errorRes = err as ErrorResponse
        if (errorRes.response.status === 401) {
          // Unauthorized access, redirect to login
          router.push('/login')
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchDestinationDetail()
    }
  }, [id])

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='mx-auto max-w-md overflow-hidden rounded-lg bg-white p-5 shadow-md'>
        {error}
      </div>
    )
  }

  return (
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
  )
}

export default withAuth(DestinationDetailPage)
