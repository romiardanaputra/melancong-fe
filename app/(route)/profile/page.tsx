/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useRouter } from 'next/navigation'
import api from '../../api/axios'
import withAuth from '../../withAuth'

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
  }, [])

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
      <Header>My Account</Header>
      <ProfileCard>
        <ProfilePicture src={profile?.imageLink} alt='Profile Picture' />
        <ProfileInfo>
          <UserName>{profile?.name}</UserName>
          <UserEmail>{profile?.email}</UserEmail>
          <UserGender>{profile?.gender}</UserGender>
        </ProfileInfo>
        <EditButton onClick={() => router.push('/profile/edit')}>✏️</EditButton>
      </ProfileCard>
      <Section>
        <SectionTitle>General</SectionTitle>
        <SectionList>
          <SectionItem>Personal Informations</SectionItem>
          <SectionItem>Location</SectionItem>
          <SectionItem>Trip History</SectionItem>
          <SectionItem>Translate</SectionItem>
          <SectionItem>Log In and Security</SectionItem>
          <SectionItem>Accessibility</SectionItem>
        </SectionList>
      </Section>
      <Section>
        <SectionTitle>Support</SectionTitle>
        <SectionList>
          <SectionItem>Terms and Conditions</SectionItem>
          <SectionItem>Privacy Policy</SectionItem>
          <SectionItem>Need Help? Let&apos;s chat</SectionItem>
        </SectionList>
      </Section>
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
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

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
`

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`

const ProfileInfo = styled.div`
  flex: 1;
`

const UserName = styled.p`
  font-weight: bold;
  margin: 0;
`

const UserEmail = styled.p`
  margin: 0;
  color: gray;
`

const UserGender = styled.p`
  margin: 0;
  color: gray;
`

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`

const Section = styled.div`
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`

const SectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const SectionItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const LogoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background: red;
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

export default withAuth(ProfilePage)
