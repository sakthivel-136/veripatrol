'use client'

import { useState } from 'react'
import {
  deleteSecurityUser,
  createSecurityUser,
} from '@/app/api/securityUsers.api'

import { SecurityUser } from '@/app/types/securityUser'

interface UsersTableProps {
  users: SecurityUser[]
  onEditUser: (user: SecurityUser) => void
  onRefresh: () => Promise<void>
}

export default function UsersTable({
  users,
  onEditUser,
  onRefresh,
}: UsersTableProps) {

  const [visiblePasswords, setVisiblePasswords] =
    useState<Record<string, boolean>>({})

  const [newUser, setNewUser] = useState({
    security_id: '',
    security_name: '',
    security_password: '',
    factory: '',
  })

  const handleAddUser = async () => {

    if (!newUser.security_id ||
        !newUser.security_name ||
        !newUser.security_password ||
        !newUser.factory) {
      alert("All fields required")
      return
    }

    try {
      await createSecurityUser(newUser)

      setNewUser({
        security_id: '',
        security_name: '',
        security_password: '',
        factory: '',
      })

      await onRefresh()

    } catch (err) {
      alert("Create failed")
    }
  }

  const handleDelete = async (id: string) => {

    if (!confirm('Delete this user?')) return

    try {
      await deleteSecurityUser(id)
      await onRefresh()
    } catch (err) {
      alert('Delete failed')
    }
  }

  const togglePassword = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="p-6">

      {/* ADD FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-4">Add Security User</h3>

        <div className="grid grid-cols-4 gap-4">

          <input
            placeholder="ID"
            value={newUser.security_id}
            onChange={(e) =>
              setNewUser({ ...newUser, security_id: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Name"
            value={newUser.security_name}
            onChange={(e) =>
              setNewUser({ ...newUser, security_name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Password"
            value={newUser.security_password}
            onChange={(e) =>
              setNewUser({ ...newUser, security_password: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Factory"
            value={newUser.factory}
            onChange={(e) =>
              setNewUser({ ...newUser, factory: e.target.value })
            }
            className="border p-2 rounded"
          />

        </div>

        <button
          onClick={handleAddUser}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full border-collapse">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">ID</th>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Password</th>
              <th className="p-3 border text-left">Factory</th>
              <th className="p-3 border text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr key={user.security_id}>

                <td className="p-3 border">{user.security_id}</td>
                <td className="p-3 border">{user.security_name}</td>

                <td className="p-3 border flex gap-2 items-center">

                  {visiblePasswords[user.security_id]
                    ? user.security_password
                    : '******'}

                  <span
                    className="cursor-pointer"
                    onClick={() => togglePassword(user.security_id)}
                  >
                    👁️
                  </span>

                </td>

                <td className="p-3 border">{user.factory}</td>

                <td className="p-3 border text-right">
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(user.security_id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  )
}
