'use client'

import React, { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import { FiSearch, FiFilter } from 'react-icons/fi'
import api from '../api'
import withAuth from '../withAuth'

interface Destination {
  id: string
  name: string
  rating: string
  regency: string
  imageLink: string
}

interface ErrorResponse {
  response: {
    status: number
  }
}

const Home: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [savedDestinations, setSavedDestinations] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const fetchDestinations = async (query: string = '') => {
    setLoading(true)
    let apiUrl = '/destinations'
    if (query) {
      apiUrl += `?d=${query}`
    }

    try {
      const response = await api.get(apiUrl)
      setDestinations(response.data.data)
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

  const fetchSavedDestinations = async () => {
    try {
      const response = await api.get('/destinations/saved')
      setSavedDestinations(
        response.data.data.map((dest: Destination) => dest.id)
      )
    } catch (err) {
      const errorRes = err as ErrorResponse
      if (errorRes.response.status === 401) {
        router.push('/login')
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  useEffect(() => {
    fetchDestinations()
    fetchSavedDestinations()
  }, [])

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    fetchDestinations(searchQuery)
  }

  const handleSave = async (id: string) => {
    try {
      await api.post('/destinations/add', { id })
      setSavedDestinations(prevSaved => [...prevSaved, id])
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete('/destinations/delete', { data: { id } })
      setSavedDestinations(prevSaved =>
        prevSaved.filter(savedId => savedId !== id)
      )
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleToggleSave = (id: string) => {
    if (savedDestinations.includes(id)) {
      handleDelete(id)
    } else {
      handleSave(id)
    }
  }

  const handleCardClick = (id: string) => {
    router.push(`/destinations/${id}`)
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (event.key === 'Enter') {
      handleCardClick(id)
    }
  }

  return (
    <Container>
      <SearchContainer onSubmit={handleSearch}>
        <SearchBar>
          <FiSearch />
          <SearchInput
            type='text'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='Search'
          />
        </SearchBar>
        <FilterIcon>
          <FiFilter />
        </FilterIcon>
      </SearchContainer>
      <h1>Recomendation</h1>
      {loading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CardContainer>
        {destinations.map(destination => (
          <Card
            key={destination.id}
            onClick={() => handleCardClick(destination.id)}
            onKeyPress={event => handleKeyPress(event, destination.id)}
            role='button'
            tabIndex={0}
          >
            <SaveButton
              type='button'
              onClick={e => {
                e.stopPropagation()
                handleToggleSave(destination.id)
              }}
              saved={savedDestinations.includes(destination.id)}
            >
              &#9733;
            </SaveButton>
            <img
              // src={destination.imageLink}
              src='https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2F3.jpg?alt=media&token=4b1bc0e1-5261-4c7d-a8a3-22a509fa5e09'
              alt={destination.name}
              width={150}
            />
            <CardContent>
              <h2>{destination.name}</h2>
              <p>&#9733;{destination.rating}</p>
              <p>Bali, {destination.regency}</p>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px 50px;
  font-family: var(--font-sans);
  color: black;
  background-color: #ededed;
  h1 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
`

const SearchContainer = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f4f5;
  color: black;
  padding: 10px;
  border-radius: 18px;
  flex: 1;
  svg {
    margin-right: 10px;
  }
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
`

const FilterIcon = styled.div`
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 8px;
  margin-left: 10px;
  cursor: pointer;
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
    transform: scale(1.05);
  }
  img {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`

const SaveButton = styled.button<{ saved: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  font-size: 20px;
  background-color: ${({ saved }) =>
    saved ? 'yellow' : 'rgba(255, 255, 255, 0.8)'};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`

const CardContent = styled.div`
  padding: 20px;
  text-align: left;
  color: black;
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
  p {
    margin: 5px 0;
  }
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Adjust as needed
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

export default withAuth(Home)
