import { useState } from 'react'
import useSearchDestinations from './useSearchDestination'

const useFilter = () => {
  const [locationFilter, setLocationFilter] = useState<string>('')
  const [destinationTypeFilter, setDestinationTypeFilter] = useState<string>('')
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const {
    searchQuery,
    handleSearch,
    isFilterSubmit,
    destinations,
    fetchDestinations
  } = useSearchDestinations()

  const handleFilterReset = () => {
    setLocationFilter('')
    setDestinationTypeFilter('')
    fetchDestinations(searchQuery)
    setIsSidebarOpen(false)
  }

  const handleFilterSubmit = () => {
    fetchDestinations(searchQuery, locationFilter, destinationTypeFilter)
    setIsSidebarOpen(false)
  }

  return {
    locationFilter,
    setLocationFilter,
    destinationTypeFilter,
    setDestinationTypeFilter,
    isSidebarOpen,
    setIsSidebarOpen,
    handleFilterReset,
    handleFilterSubmit,
    fetchDestinations,
    destinations,
    handleSearch,
    isFilterSubmit,
    searchQuery
  }
}

export default useFilter
