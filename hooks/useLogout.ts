import api from '@/utils/api/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const useLogout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00838F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await api.get('/auth/logout')
          localStorage.removeItem('token')
          router.push('/landing')
        } catch (err) {
          Swal.fire({
            icon: 'error',
            text: 'Failed to log out',
            confirmButtonColor: '#00838F'
          })
        }
      }
    })
  }

  return {
    handleLogout
  }
}

export default useLogout
