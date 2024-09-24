'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Loading from './loading'

export default function AuthSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = searchParams.get('token')

    if (token) {
      localStorage.setItem('token', token)
      router.push('/dashboard')
    } else {
      setLoading(false)
    }
  }, [router, searchParams])

  if (loading) {
    return <Loading />
  }

  return <div>Authentication failed.</div>
}
