import { useState } from 'react'
import { saveDestination as saveDestinationService } from '@/services/destinations/savedDestinations'
import useLocalSavedDestinations from './useLocalSavedDestination'
import { deleteDestination as deleteDestinationService } from '@/services/destinations/deleteDestinations'

const useHandleSave = () => {
  const { savedDestinations, setSavedDestinations } =
    useLocalSavedDestinations()
  const [error, setError] = useState<string>('')

  const handleSave = async (id: string) => {
    try {
      await saveDestinationService(id)
      setSavedDestinations(prevSaved => {
        const updated = [...prevSaved, id]
        localStorage.setItem('saved-destinations', JSON.stringify(updated))
        return updated
      })
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDestinationService(id)
      setSavedDestinations(prevSaved => {
        const updated = prevSaved.filter(savedId => savedId !== id)
        localStorage.setItem('saved-destinations', JSON.stringify(updated))
        return updated
      })
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
