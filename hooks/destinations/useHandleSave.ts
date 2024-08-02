import { useState } from 'react'
import { saveDestination as saveDestinationService } from '@/services/destinations/savedDestinations'
import useFetchSavedDestinations from './useFetchSavedDestinations'
import { deleteDestination as deleteDestinationService } from '@/services/destinations/deleteDestinations'

const useHandleSave = () => {
  const { savedDestinations, setSavedDestinations } =
    useFetchSavedDestinations()
  const [error, setError] = useState<string>('')
  const handleSave = async (id: string) => {
    try {
      await saveDestinationService(id)
      setSavedDestinations(prevSaved => [...prevSaved, id])
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }
  const handleDelete = async (id: string) => {
    try {
      await deleteDestinationService(id)
      setSavedDestinations(prevSaved =>
        prevSaved.filter(savedId => savedId !== id)
      )
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }
  return {
    savedDestinations,
    setSavedDestinations,
    handleSave,
    handleDelete,
    error
  }
}

export default useHandleSave
