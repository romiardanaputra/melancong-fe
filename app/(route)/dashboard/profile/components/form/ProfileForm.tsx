'use client'

import Image from 'next/image'
import CustomFieldProfile from './CustomFieldProfile'
import { ProfileLinkItems } from '../../index.data'
import { IconChevronRight } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { ErrorResponseTypes, UserProfileTypes } from '../../index.props'
import { useRouter } from 'next/navigation'
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfileImage
} from '@/services/profile/profileService'
import { handleErrorAlert, handleSaveAlert } from '@/utils/alert/SwalAlerts'
import Swal from 'sweetalert2'
import ProfileLoading from '../../loading'
import ProfileError from '../../error'
import withAuth from '@/app/withAuth'

const ProfileForm = () => {
  const [profile, setProfile] = useState<UserProfileTypes | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [editField, setEditField] = useState<Partial<UserProfileTypes>>({})
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
    const loadUserProfile = async () => {
      setLoading(true)
      try {
        const data = await fetchUserProfile()
        setProfile(data)
        setError('')
      } catch (err) {
        const errorRes = err as ErrorResponseTypes
        if (errorRes.response.status === 401) {
          router.push('/login')
        } else {
          setError('Failed to fetch profile data')
        }
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [router])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEditField({ ...editField, [name]: value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSave = async () => {
    handleSaveAlert()

    try {
      if (Object.keys(editField).length > 0) {
        await updateUserProfile(editField)
      }

      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        await uploadProfileImage(formData)
      }

      Swal.close()
      handleSaveAlert(true)

      setIsEditing({
        name: false,
        phone: false,
        gender: false
      })
      setEditField({})
    } catch (err) {
      Swal.close()
      handleErrorAlert()
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
    return <ProfileLoading />
  }

  if (error) {
    return <ProfileError message={error} />
  }
  return (
    <>
      <div className='w-full bg-white py-12 md:pl-32 md:pr-16'>
        <div className='mx-auto min-h-dvh w-full rounded-lg bg-white p-5 text-black 2xl:px-12'>
          <h1 className='mb-5 text-center text-2xl font-bold'>My Account</h1>
          <div className='relative mb-5 flex items-center rounded-lg bg-gray-100 p-4'>
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
                <CustomFieldProfile
                  idField='email'
                  typeField='email'
                  nameField='email'
                  defaultValueField={profile?.email ?? 'profile email'}
                  labelName='Email Address'
                  isEditAble={false}
                  variant='INPUT'
                />

                <CustomFieldProfile
                  idField='name'
                  typeField='text'
                  nameField='name'
                  defaultValueField={profile?.name ?? 'profile name'}
                  labelName='Full Name'
                  readOnly={!isEditing.name}
                  onChange={handleInputChange}
                  ref={nameRef}
                  onClick={() => toggleEdit('name')}
                  variant='INPUT'
                />

                <CustomFieldProfile
                  idField='phone'
                  typeField='text'
                  nameField='phone'
                  defaultValueField={profile?.phone ?? 'profile phone'}
                  labelName='Phone Number'
                  readOnly={!isEditing.phone}
                  onChange={handleInputChange}
                  ref={phoneRef}
                  onClick={() => toggleEdit('phone')}
                  variant='INPUT'
                />
                <CustomFieldProfile
                  idField='gender'
                  typeField=''
                  nameField='gender'
                  defaultValueField={profile?.gender ?? 'profile gender'}
                  labelName='Gender'
                  readOnly={!isEditing.gender}
                  onChange={handleInputChange}
                  ref={genderRef}
                  onClick={() => toggleEdit('gender')}
                  variant='SELECT'
                />
              </div>
              <button
                onClick={handleSave}
                className='w-full rounded-lg bg-blue-400 p-3 text-white transition-colors duration-300 hover:bg-gray-800 hover:text-yellow-300'
              >
                Save
              </button>
            </div>
          </div>
          <div className='mb-5 space-y-4'>
            <h2 className='mb-3 pt-3 text-lg font-bold'>Support</h2>
            <ul className='list-none space-y-4 rounded-lg bg-white p-0 text-sm'>
              {ProfileLinkItems.map(item => (
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
export default withAuth(ProfileForm)
