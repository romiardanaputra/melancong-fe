'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Swal from 'sweetalert2'
import withAuth from '@/app/withAuth'

import CustomFieldProfile from './CustomFieldProfile'
import { ErrorResponseTypes, UserProfileTypes } from '../../index.props'
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfileImage
} from '@/services/profile/profileService'
import { handleErrorAlert, handleSaveAlert } from '@/utils/alert/SwalAlerts'
import ProfileLoading from '../../loading'
import ProfileError from '../../error'
import ProfileLink from '../ProfileLink'

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
    } catch {
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
      <div className='min-h-dvh w-full bg-white'>
        <div className='2xl:max-w-scren-xl container mt-12 w-full md:mt-[90px] md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg'>
          <h1 className='my-4 text-center text-2xl font-medium'>
            My Account Profile
          </h1>
          <div className='flex flex-col items-center space-y-4'>
            {imagePreview || profile?.imageLink ? (
              <Image
                src={imagePreview || profile?.imageLink || 'default.png'}
                alt='foto profile'
                placeholder='blur'
                priority={true}
                width={20}
                height={20}
                className='aspect-square size-20 rounded-full object-cover object-center'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
              />
            ) : (
              <span className='text-center text-gray-500'>Profile Picture</span>
            )}
            <div>
              <label
                htmlFor='profileImage'
                className='cursor-pointer font-bold text-cyan-800'
              >
                Change Picture <br /> (max size 4 MB)
              </label>
              <input
                id='profileImage'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className='space-y-4 py-12 md:space-y-6'>
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
            className='flex w-full items-center justify-center rounded-lg bg-cyan-800 p-3 text-white hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-800'
          >
            Save Profile
          </button>
          <ProfileLink />
        </div>
      </div>
    </>
  )
}
export default withAuth(ProfileForm)
