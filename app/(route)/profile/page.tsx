'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/api/axios'
import withAuth from '@/app/withAuth'
import {
  FaUser,
  FaMapMarkerAlt,
  FaHistory,
  FaGlobe,
  FaLock,
  FaUniversalAccess,
  FaFileAlt,
  FaShieldAlt,
  FaComments,
  FaPen,
  FaAngleRight
} from 'react-icons/fa'

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

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout')
      localStorage.removeItem('token')
      router.push('/login')
    } catch (err) {
      setError('Failed to log out')
    }
  }

  if (loading) {
    return (
      <div className='mx-auto max-w-lg rounded-lg bg-white p-5 shadow-md md:max-w-2xl lg:max-w-4xl'>
        <div className='flex h-full items-center justify-center'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500'></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='mx-auto max-w-lg rounded-lg bg-white p-5 shadow-md md:max-w-2xl lg:max-w-4xl'>
        {error}
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-lg rounded-lg bg-white p-5 text-black shadow-md md:max-w-2xl lg:max-w-4xl'>
      <h1 className='mb-5 text-center text-2xl font-bold'>My Account</h1>
      <div className='relative mb-5 flex items-center rounded-lg bg-gray-100 p-4'>
        <img
          src={profile?.imageLink}
          alt='' // Menghapus kata-kata yang tidak perlu dalam atribut alt
          className='mr-4 h-12 w-12 rounded-full'
        />
        <div className='flex-1'>
          <p className='font-bold'>{profile?.name}</p>
          <p className='text-gray-500'>{profile?.email}</p>
          <p className='text-gray-500'>{profile?.gender}</p>
        </div>
        <button
          onClick={() => router.push('/profile/edit')}
          className='absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500'
        >
          <FaPen />
        </button>
      </div>
      <div className='mb-5'>
        <h2 className='mb-3 text-lg font-bold'>General</h2>
        <ul className='list-none rounded-lg bg-white p-0 shadow-md'>
          {[
            { text: 'Personal Informations', icon: <FaUser /> },
            { text: 'Location', icon: <FaMapMarkerAlt /> },
            { text: 'Trip History', icon: <FaHistory /> },
            { text: 'Translate', icon: <FaGlobe /> },
            { text: 'Log In and Security', icon: <FaLock /> },
            { text: 'Accessibility', icon: <FaUniversalAccess /> }
          ].map(item => (
            <li
              key={item.text}
              className='flex cursor-pointer items-center border-b border-gray-300 p-3'
            >
              <div className='flex items-center'>
                <span className='mr-3'>{item.icon}</span>
                {item.text}
              </div>
              <FaAngleRight className='ml-auto text-gray-400' />
            </li>
          ))}
        </ul>
      </div>
      <div className='mb-5'>
        <h2 className='mb-3 text-lg font-bold'>Support</h2>
        <ul className='list-none rounded-lg bg-white p-0 shadow-md'>
          {[
            { text: 'Terms and Conditions', icon: <FaFileAlt /> },
            { text: 'Privacy Policy', icon: <FaShieldAlt /> },
            { text: 'Need Help? Let`s chat', icon: <FaComments /> } // Menggunakan single quotes
          ].map(item => (
            <li
              key={item.text}
              className='flex cursor-pointer items-center border-b border-gray-300 p-3'
            >
              <div className='flex items-center'>
                <span className='mr-3'>{item.icon}</span>
                {item.text}
              </div>
              <FaAngleRight className='ml-auto text-gray-400' />
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className='w-full rounded-lg border border-red-800 bg-white p-3 text-red-800 transition-colors duration-300 hover:bg-red-800 hover:text-white'
      >
        Log Out
      </button>
    </div>
  )
}

export default withAuth(ProfilePage)
