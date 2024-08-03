import { useState } from 'react'
import useSearchDestinations from './useSearchDestination'

const useFilter = () => {
  const [location, setLocation] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    searchQuery,
    handleSearch,
    isFilterSubmit,
    destinations,
    fetchDestinations
  } = useSearchDestinations()

  const handleFilterReset = () => {
    setLocation('')
    setFilterType('')
    fetchDestinations(searchQuery)
    setIsOpen(false)
  }

  const handleFilterSubmit = () => {
    fetchDestinations(searchQuery, location, filterType)
    setIsOpen(false)
  }

  return {
    setLocation,
    setFilterType,
    setIsOpen,
    isFilterSubmit,
    location,
    filterType,
    isOpen,
    handleFilterReset,
    handleFilterSubmit,
    fetchDestinations,
    destinations,
    handleSearch,
    searchQuery
  }
}

export default useFilter
