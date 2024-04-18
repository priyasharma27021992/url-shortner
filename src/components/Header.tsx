import { useSession } from 'next-auth/react'

const Header = () => {
  const { status, data: session } = useSession()

  const isAuthenticated = status === 'authenticated' && session?.user

  return (
    <header className="bg-slate-900 sticky top-0 z-50 flex w-full flex-row items-center gap-4 py-2"></header>
  )
}
