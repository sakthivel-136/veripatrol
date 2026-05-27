'use client'

import { useEffect, useState } from 'react'
import { getSecurityUsers } from '@/app/api/securityUsers.api'
import UsersTable from '@/app/components/users/UsersTable'
import { SecurityUser } from '@/app/types/securityUser'

export default function UserCrudPage() {

  const [users, setUsers] = useState<SecurityUser[]>([])
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    try {
      const data = await getSecurityUsers()
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Fetch failed:", error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  if (loading) {
    return <div className="p-6">Loading users...</div>
  }

  return (
    <UsersTable
      users={users}
      onEditUser={(user) => console.log(user)}
      onRefresh={loadUsers}
    />
  )
}
