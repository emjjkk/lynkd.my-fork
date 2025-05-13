"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserData, getAuthenticatedUser } from '@/utils/auth'

export function useAuth(redirectOnFail = true) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      const { user: authUser, redirect } = await getAuthenticatedUser()

      if (redirect && redirectOnFail) {
        router.push(redirect)
        return
      }

      setUser(authUser)
      setLoading(false)
    }

    checkAuth()
  }, [router, redirectOnFail])

  return { user, loading }
}