import { createClient } from './supabase/client'

export type UserData = {
  id: any
  auth: any // User data from auth.users
  profile: any // User data from public.users
}

export async function getAuthenticatedUser(): Promise<{
  user: UserData | null
  redirect?: string
}> {
  const supabase = createClient()

  try {
    // 1. Get auth user
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return { user: null, redirect: '/login' }
    }

    // 2. Get profile from public.users
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', authUser.id)
      .single()

    if (profileError || !profileData) {
      return { user: null, redirect: '/onboarding' }
    }

    // 3. Return combined user data
    return {
      user: {
        auth: authUser,
        profile: profileData
      }
    }

  } catch (error) {
    console.error('Authentication check failed:', error)
    return { user: null, redirect: '/login' }
  }
}

export async function requireAuth(): Promise<UserData> {
  const { user, redirect } = await getAuthenticatedUser()
  if (redirect) {
    // Handle redirect in component
    throw new Error(redirect)
  }
  return user!
}