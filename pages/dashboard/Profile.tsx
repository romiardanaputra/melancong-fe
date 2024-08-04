'use client'

import { NextPage } from 'next'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'

import {
  IconBrandHipchat,
  IconChevronRight,
  IconLockSquare,
  IconPencil,
  IconSettings
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import api from '@/utils/api/axios'
import withAuth from '@/app/withAuth'

interface Props {}
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

const Profile: NextPage<Props> = () => {
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
    // eslint-disable-next-line no-undef
    let timerInterval: NodeJS.Timeout

    Swal.fire({
      title: 'Saving...',
      html: 'Please wait while we save your changes.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })

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

      // Close the loading dialog
      Swal.close()

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your profile has been saved successfully.',
        showConfirmButton: false,
        timer: 1500
      })

      setIsEditing({
        name: false,
        phone: false,
        gender: false
      })
      setEditField({})
    } catch (err) {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update profile',
        confirmButtonColor: '#00838F'
      })
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
    <>
      <div className='w-full bg-white py-12 md:pl-32 md:pr-16'>
        <div className='mx-auto min-h-dvh w-full rounded-lg bg-white p-5 text-black 2xl:px-12'>
          <h1 className='mb-5 text-center text-2xl font-bold'>My Account</h1>
          <div className='relative mb-5 flex items-center p-4'>
            <div className='mx-auto w-full rounded-lg bg-white p-5 py-20'>
              <div className='mb-5 flex flex-col items-center'>
                <div className='relative mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200'>
                  {imagePreview || profile?.imageLink ? (
                    <Image
                      src={imagePreview || profile?.imageLink || 'default.png'}
                      alt='foto profile'
                      placeholder='blur'
                      priority={true}
                      width={96}
                      height={96}
                      className='aspect-square size-full rounded-full object-cover object-center'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
                    />
                  ) : (
                    <span className='text-center text-gray-500'>
                      Profile Picture
                    </span>
                  )}
                </div>
                <p className='mb-5 text-gray-500'>Max size: 5 MB</p>
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
                      className='ml-2 flex transform items-center justify-center rounded-lg bg-cyan-800 p-3 text-white transition-transform hover:scale-105 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
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
                      className='ml-2 transform rounded-lg bg-cyan-800 p-3 text-white shadow-md transition-transform hover:scale-105 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
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
                      className='ml-2 transform rounded-lg bg-cyan-800 p-3 text-white shadow-md transition-transform hover:scale-105 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    >
                      <IconPencil className='size-6' />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSave}
                className='w-full rounded-lg bg-cyan-800 p-3 text-white transition-colors duration-300 hover:bg-cyan-600 hover:text-yellow-300'
              >
                Save
              </button>
            </div>
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
    </>
  )
}

export default withAuth(Profile)
