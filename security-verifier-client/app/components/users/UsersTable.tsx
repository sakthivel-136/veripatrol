'use client'

import { useState } from 'react'
import {
  deleteSecurityUser,
  createSecurityUser,
} from '@/app/api/securityUsers.api'

import { SecurityUser } from '@/app/types/securityUser'

interface UsersTableProps {
  users: SecurityUser[]
  onAddUser: () => void
  onEditUser: (user: SecurityUser) => void
  onRefresh: () => Promise<void>
}

export default function UsersTable({
  users,
  onAddUser,
  onEditUser,
  onRefresh,
}: UsersTableProps) {

  const [visiblePasswords, setVisiblePasswords] =
    useState<Record<string, boolean>>({})

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

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Security Users</h2>
        <button
          onClick={onAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
        >
          Add Security User
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
                  <div className="flex gap-3 justify-end">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                      onClick={() => onEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold"
                      onClick={() => handleDelete(user.security_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  )
}
