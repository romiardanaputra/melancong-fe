'use client'

import React, { useEffect, useState, ChangeEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/api/axios'
import withAuth from '@/app/withAuth'
import Image from 'next/image'
import { IconPencil } from '@tabler/icons-react'

interface UserProfile {
  name: string
  email: string
  gender: string
  imageLink: string
  phone: string
}

interface ErrorResponse {
  response: {
    status: number
  }
}

const EditProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [editField, setEditField] = useState<Partial<UserProfile>>({})
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    name: false,
    phone: false,
    gender: false
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const router = useRouter()

  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEditField({ ...editField, [name]: value })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSave = async () => {
    try {
      if (Object.keys(editField).length > 0) {
        await api.put('/users/update', editField)
      }

      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        await api.post('/users/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }

      router.push('/profile')
    } catch (err) {
      setError('Failed to update profile')
    }
  }

  const toggleEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] })

    if (!isEditing[field]) {
      switch (field) {
        case 'name':
          nameRef.current?.focus()
          break
        case 'phone':
          phoneRef.current?.focus()
          break
        case 'gender':
          genderRef.current?.focus()
          break
      }
    }
  }

  if (loading) {
    return (
      <div className='mx-auto min-h-dvh w-full rounded-lg bg-white p-5'>
        <div className='flex h-full items-center justify-center'>
          <div className='h-10 w-10 animate-spin rounded-full border-5 border-gray-200 border-t-blue-500'></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='mx-auto min-h-dvh w-full rounded-lg bg-white p-5'>
        {error}
      </div>
    )
  }

  return (
    <div className='mx-auto min-h-dvh w-full rounded-lg bg-white p-5 py-20'>
      <div className='mx-auto max-w-screen-xl'>
        <h1 className='mb-5 text-center text-2xl font-bold'>Edit Profile</h1>
        <div className='mb-5 flex flex-col items-center'>
          <div className='relative mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200'>
            {imagePreview || profile?.imageLink ? (
              <Image
                src={imagePreview || profile?.imageLink || 'default.png'}
                alt=''
                loading='lazy'
                placeholder='blur'
                width={96}
                height={96}
                className='aspect-square size-full rounded-full object-cover object-center'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
              />
            ) : (
              <span className='text-center text-gray-500'>Profile Picture</span>
            )}
          </div>
          <label
            htmlFor='profileImage'
            className='cursor-pointer text-blue-500'
          >
            Change Picture
          </label>
          <input
            id='profileImage'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleImageChange}
          />
        </div>
        <div className='mb-8 mt-12 space-y-6'>
          <div className='flex flex-auto flex-col items-center'>
            <label
              htmlFor='email'
              className='mb-2 w-full font-medium text-gray-700 md:mb-0 md:pr-4'
            >
              Email
            </label>
            <input
              id='email'
              type='text'
              name='email'
              defaultValue={profile?.email}
              readOnly
              className='w-full rounded-lg border border-gray-300 bg-gray-300 p-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex flex-col items-center'>
            <label
              htmlFor='name'
              className='mb-2 w-full font-medium text-gray-700 md:mb-0'
            >
              Name
            </label>
            <div className='flex w-full items-center'>
              <input
                id='name'
                type='text'
                name='name'
                defaultValue={profile?.name}
                readOnly={!isEditing.name}
                onChange={handleInputChange}
                ref={nameRef}
                className={`w-full rounded-lg border p-3 ${!isEditing.name ? 'bg-gray-300' : 'bg-white'} transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={() => toggleEdit('name')}
                className='ml-2 flex transform items-center justify-center rounded-lg bg-blue-500 p-3 text-white transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
              >
                <IconPencil className='size-6' />
              </button>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <label
              htmlFor='phone'
              className='mb-2 w-full font-medium text-gray-700'
            >
              Phone Number
            </label>
            <div className='flex w-full items-center'>
              <input
                id='phone'
                type='text'
                name='phone'
                defaultValue={profile?.phone}
                readOnly={!isEditing.phone}
                onChange={handleInputChange}
                ref={phoneRef}
                className={`w-full rounded-lg border p-3 ${!isEditing.phone ? 'bg-gray-300' : 'bg-white'} transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={() => toggleEdit('phone')}
                className='ml-2 transform rounded-lg bg-blue-500 p-3 text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
              >
                <IconPencil className='size-6' />
              </button>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <label
              htmlFor='gender'
              className='mb-2 w-full font-medium text-gray-700'
            >
              Gender
            </label>
            <div className='flex w-full items-center'>
              <select
                id='gender'
                name='gender'
                defaultValue={profile?.gender}
                disabled={!isEditing.gender}
                onChange={handleInputChange}
                ref={genderRef}
                className={`w-full rounded-lg border p-3 ${!isEditing.gender ? 'bg-gray-300' : 'border-3 border-blue-300 bg-white'} transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value='Male'>Male (He/Him)</option>
                <option value='Female'>Female (She/Her)</option>
              </select>
              <button
                onClick={() => toggleEdit('gender')}
                className='ml-2 transform rounded-lg bg-blue-500 p-3 text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
              >
                <IconPencil className='size-6' />
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className='w-full rounded-lg bg-blue-400 p-3 text-white transition-colors duration-300 hover:bg-gray-800 hover:text-yellow-300'
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default withAuth(EditProfilePage)
