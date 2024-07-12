'use client'

import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useRouter } from 'next/navigation'
import api from '../../api'
import withAuth from '../../withAuth'

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
      <ImageContainer>
        <BackButton onClick={() => window.history.back()}>&larr;</BackButton>
        {/* <img src={destination?.imageLink} alt={destination?.name} /> */}
        <img
          src='https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2F3.jpg?alt=media&token=4b1bc0e1-5261-4c7d-a8a3-22a509fa5e09'
          alt={destination?.name}
        />
      </ImageContainer>
      <Content>
        <Title>{destination?.name}</Title>
        <Rating>
          <span>&#9733;</span>
          {destination?.rating}
        </Rating>
        <Location>
          <a
            href={destination?.location}
            target='_blank'
            rel='noopener noreferrer'
          >
            Google Maps
          </a>
        </Location>
        <EntryFee>
          <p>{destination?.regency}, Bali</p>
          <p>
            {destination?.childEntry} - {destination?.adultsEntry}
          </p>
        </EntryFee>
        <Information
          dangerouslySetInnerHTML={{ __html: destination?.information || '' }}
        />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  max-width: 600px;
  color: black;
  margin: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const ImageContainer = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
`

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
`

const Content = styled.div`
  padding: 20px;
`

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 20px;
    margin-right: 5px;
  }
`

const Location = styled.div`
  display: flex;
  align-items: center;
  a {
    padding: 5px 10px;
    background-color: grey;
    color: black;
    text-decoration: none;
    margin-right: 10px;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: #757575;
  }
`

const EntryFee = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
  li {
    font-size: 14px;
    color: #757575;
  }
`

const Information = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #424242;
  text-align: justify;
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Set height to fill the container */
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

export default withAuth(DestinationDetailPage)
