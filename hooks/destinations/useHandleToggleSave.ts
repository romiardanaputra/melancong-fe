import useHandleSave from './useHandleSave'

const useHandleToggleSave = () => {
  const { handleSave, handleDelete, savedDestinations } = useHandleSave()

  const handleToggleSave = (id: string) => {
    if (savedDestinations.includes(id)) {
      handleDelete(id)
    } else {
      handleSave(id)
    }
  }
  return {
    handleToggleSave,
    savedDestinations
  }
}

export default useHandleToggleSave
