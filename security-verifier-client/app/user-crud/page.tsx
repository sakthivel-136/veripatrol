'use client'

import { useEffect, useState } from 'react'
import { getSecurityUsers } from '@/app/api/securityUsers.api'
import { getFactories } from '@/app/api/factories.api'
import UsersTable from '@/app/components/users/UsersTable'
import UserForm from '@/app/components/users/UserForm'
import { SecurityUser } from '@/app/types/securityUser'

interface Factory {
  factory_code: string
  factory_name: string
  location?: string | null
}

export default function UserCrudPage() {
  const [users, setUsers] = useState<SecurityUser[]>([])
  const [factories, setFactories] = useState<Factory[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<SecurityUser | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      const usersData = await getSecurityUsers()
      setUsers(Array.isArray(usersData) ? usersData : [])
      
      const factoriesRes = await getFactories()
      const factoriesList = factoriesRes?.data || factoriesRes || []
      setFactories(factoriesList)
    } catch (error) {
      console.error("Fetch failed:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddUser = () => {
    setEditingUser(null)
    setIsFormOpen(true)
  }

  const handleEditUser = (user: SecurityUser) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  if (loading && users.length === 0) {
    return <div className="p-6">Loading user management...</div>
  }

  return (
    <div className="relative">
      <UsersTable
        users={users}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
        onRefresh={loadData}
      />

      {isFormOpen && (
        <UserForm
          user={editingUser}
          factories={factories}
          onClose={() => setIsFormOpen(false)}
          onSave={loadData}
        />
      )}
    </div>
  )
}

