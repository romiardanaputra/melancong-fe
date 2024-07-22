/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState, ChangeEvent, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { useRouter } from 'next/navigation'
import api from '@/app/api/axios'
import withAuth from '@/app/withAuth'

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
  }, [])

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
      <Container>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </Container>
    )
  }

  if (error) {
    return <Container>{error}</Container>
  }

  return (
    <Container>
      <Header>Edit Profile</Header>
      <ProfilePictureContainer>
        <ProfilePicture
          src={imagePreview || profile?.imageLink}
          alt='Profile Picture'
        />
        <ChangePictureLabel htmlFor='profileImage'>
          Change Picture
        </ChangePictureLabel>
        <input
          id='profileImage'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </ProfilePictureContainer>
      <ProfileForm>
        <FormField>
          <Label>Email</Label>
          <Input
            type='text'
            name='email'
            defaultValue={profile?.email}
            readOnly
          />
        </FormField>
        <FormField>
          <Label>Name</Label>
          <Input
            type='text'
            name='name'
            defaultValue={profile?.name}
            readOnly={!isEditing.name}
            onChange={handleInputChange}
            ref={nameRef}
          />
          <EditButton onClick={() => toggleEdit('name')}>Edit</EditButton>
        </FormField>
        <FormField>
          <Label>Phone Number</Label>
          <Input
            type='text'
            name='phone'
            defaultValue={profile?.phone}
            readOnly={!isEditing.phone}
            onChange={handleInputChange}
            ref={phoneRef}
          />
          <EditButton onClick={() => toggleEdit('phone')}>Edit</EditButton>
        </FormField>
        <FormField>
          <Label>Gender</Label>
          <Select
            name='gender'
            defaultValue={profile?.gender}
            disabled={!isEditing.gender}
            onChange={handleInputChange}
            ref={genderRef}
          >
            <option value='Male'>Male (He/Him)</option>
            <option value='Female'>Female (She/Her)</option>
          </Select>
          <EditButton onClick={() => toggleEdit('gender')}>Edit</EditButton>
        </FormField>
      </ProfileForm>
      <SaveButton onClick={handleSave}>Save</SaveButton>
    </Container>
  )
}

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: black;
`

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`

const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`

const ChangePictureLabel = styled.label`
  color: blue;
  cursor: pointer;
`

const ProfileForm = styled.div`
  margin-bottom: 20px;
`

const FormField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const Label = styled.label`
  flex: 1;
`

const Input = styled.input`
  flex: 2;
  padding: 5px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  background-color: ${props => (props.readOnly ? '#f0f0f0' : '#fff')};
`

const Select = styled.select`
  flex: 2;
  padding: 5px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  background-color: ${props => (props.disabled ? '#f0f0f0' : '#fff')};
`

const EditButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
`

const SaveButton = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid blue;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `} 1s linear infinite;
`

export default withAuth(EditProfilePage)
