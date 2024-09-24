import { useState } from 'react'
import useFetchDestination from './destinations/useFetchDestination'

const useSearchDestinations = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isFilterSubmit, setIsFilterSubmit] = useState<boolean>(false)
  const { destinations, fetchDestinations } = useFetchDestination()

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
