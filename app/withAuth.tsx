import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthComponent: React.FC<P> = props => {
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (!token) {
        Swal.fire({
          title: 'Login Required',
          text: 'You must login to continue.',
          icon: 'info',
          confirmButtonColor: '#00838F'
        }).then(result => {
          if (result.isConfirmed) {
            router.push('/login')
          }
        })
      }
    }, [router])

    return <WrappedComponent {...props} />
  }

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return WithAuthComponent
}

export default withAuth
