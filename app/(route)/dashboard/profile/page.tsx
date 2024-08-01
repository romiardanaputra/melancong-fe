'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/api/axios'
import withAuth from '@/app/withAuth'
import Link from 'next/link'
import Image from 'next/image'
import {
  IconAccessible,
  IconBrandHipchat,
  IconChevronRight,
  IconHistory,
  IconLanguageHiragana,
  IconLocation,
  IconLockOpenOff,
  IconLockSquare,
  IconPencil,
  IconSettings,
  IconUser
} from '@tabler/icons-react'

interface UserProfile {
  name: string
  email: string
  gender: string
  imageLink: string
}

interface ErrorResponse {
  response: {
    status: number
  }
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const response = await api.get('/users/profile')
        setProfile(response.data.data)
        setError('')
      } catch (err) {
        const errorRes = err as ErrorResponse
        if (errorRes.response.status === 401) {
          router.push('/login')
        } else {
          setError('Failed to fetch profile data')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [router])

  if (loading) {
    return (
      <div className='mx-auto size-full min-h-dvh rounded-lg bg-white p-5'>
        <div className='flex size-full min-h-dvh items-center justify-center'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500'></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='mx-auto size-full min-h-dvh rounded-lg bg-white p-5'>
        {error}
      </div>
    )
  }

  return (
    <div className='w-full bg-white py-12 md:pl-32 md:pr-16'>
      <div className='mx-auto min-h-dvh w-full rounded-lg bg-white p-5 text-black 2xl:px-12'>
        <h1 className='mb-5 text-center text-2xl font-bold'>My Account</h1>
        <div className='relative mb-5 flex items-center rounded-lg bg-gray-100 p-4'>
          <Image
            src={profile?.imageLink || 'default.png'}
            alt='' // Menghapus kata-kata yang tidak perlu dalam atribut alt
            className='mr-4 h-12 w-12 rounded-full'
            loading='lazy'
            width={48}
            height={48}
            quality={10}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
          />
          <div className='flex-1'>
            <p className='font-bold'>{profile?.name}</p>
            <p className='text-gray-500'>{profile?.email}</p>
            <p className='text-gray-500'>{profile?.gender}</p>
          </div>
          <Link
            href='/dashboard/profile/edit'
            className='absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500'
          >
            <IconPencil />
          </Link>
        </div>
        <div className='mb-5 space-y-4'>
          <h2 className='mb-3 pt-3 text-lg font-bold'>General</h2>
          <ul className='list-none space-y-4 rounded-lg bg-white text-sm'>
            {[
              { text: 'Personal Informations', icon: <IconUser /> },
              { text: 'Location', icon: <IconLocation /> },
              { text: 'Trip History', icon: <IconHistory /> },
              { text: 'Translate', icon: <IconLanguageHiragana /> },
              { text: 'Log In and Security', icon: <IconLockOpenOff /> },
              { text: 'Accessibility', icon: <IconAccessible /> }
            ].map(item => (
              <li
                key={item.text}
                className='flex cursor-pointer items-center border-b border-gray-300 p-3'
              >
                <div className='flex items-center'>
                  <span className='mr-3'>{item.icon}</span>
                  {item.text}
                </div>
                <IconChevronRight className='ml-auto text-gray-400' />
              </li>
            ))}
          </ul>
        </div>
        <div className='mb-5 space-y-4'>
          <h2 className='mb-3 pt-3 text-lg font-bold'>Support</h2>
          <ul className='list-none space-y-4 rounded-lg bg-white p-0 text-sm'>
            {[
              { text: 'Terms and Conditions', icon: <IconSettings /> },
              { text: 'Privacy Policy', icon: <IconLockSquare /> },
              { text: 'Need Help? Let`s chat', icon: <IconBrandHipchat /> } // Menggunakan single quotes
            ].map(item => (
              <li
                key={item.text}
                className='flex cursor-pointer items-center border-b border-gray-300 p-3'
              >
                <div className='flex items-center'>
                  <span className='mr-3'>{item.icon}</span>
                  {item.text}
                </div>
                <IconChevronRight className='ml-auto text-gray-400' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default withAuth(ProfilePage)
