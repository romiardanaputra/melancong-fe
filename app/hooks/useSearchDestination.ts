import { useState } from 'react'
import useDestinations from './useDestinations'

const useSearchDestinations = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isFilterSubmit, setIsFilterSubmit] = useState<boolean>(false)
  const { destinations, fetchDestinations } = useDestinations()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    fetchDestinations(query)
    setIsFilterSubmit(true)
    setSearchQuery('')
  }

  return {
    searchQuery,
    setSearchQuery,
    isFilterSubmit,
    setIsFilterSubmit,
    handleSearch,
    destinations,
    fetchDestinations
  }
}

export default useSearchDestinations
