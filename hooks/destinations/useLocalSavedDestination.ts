import { useCallback, useEffect, useState } from 'react'

const useLocalSavedDestinations = () => {
  const [savedDestinations, setSavedDestinations] = useState<string[]>([])

  const fetchSavedDestinations = useCallback(async () => {
    const saved = localStorage.getItem('saved-destinations')
    if (saved) {
      setSavedDestinations(JSON.parse(saved))
    }
  }, [])
  useEffect(() => {
    fetchSavedDestinations()
  }, [fetchSavedDestinations])
  return {
    savedDestinations,
    setSavedDestinations,
    fetchSavedDestinations
  }
}

export default useLocalSavedDestinations
