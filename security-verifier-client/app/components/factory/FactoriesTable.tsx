'use client'

import { useEffect, useState } from 'react'
import { FactoryForm } from './FactoryForm'
import { getApiUrl } from '@/app/utils/apiUrl'

/* ================= INLINE INPUT (outside component to prevent remount) ================= */

const InlineInput = ({
  value,
  onChange,
  placeholder
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="block w-full rounded-md border px-3 py-1.5"
    autoFocus
  />
)

interface Factory {
  id: string
  name: string
  location?: string
  address?: string
}

/* ================= AUTH HEADER ================= */

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

/* ============================================== */

export const FactoriesTable = () => {

  /* ================= STATE ================= */

  const [factories, setFactories] = useState<Factory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const [editName, setEditName] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [editAddress, setEditAddress] = useState('')

  const API_BASE_URL = getApiUrl()

  /* ================= LOAD ================= */

  const loadFactories = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE_URL}/factories`, {
        headers: getAuthHeaders(),
      })

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized. Please login again.')
        }
        throw new Error('Failed to load factories')
      }

      const data = await res.json()

      const normalized = data.map((f: any) => ({
        id: f.factory_code,
        name: f.factory_name,
        location: f.location || '',
        address: f.factory_address || '',
      }))

      setFactories(normalized)

    } catch (err: any) {
      console.error(err)
      setError(err.message)

    } finally {
      setLoading(false)
    }
  }

  /* ================= CREATE ================= */

  const addFactory = async (payload: {
    name: string
    code: string
    location?: string
    address?: string
  }) => {

    try {
      const res = await fetch(`${API_BASE_URL}/factories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          factory_name: payload.name,
          factory_code: payload.code,
          location: payload.location || '',
          factory_address: payload.address || '',
        }),
      })

      if (!res.ok) throw new Error('Create failed')

      await loadFactories()

    } catch (err: any) {
      alert(err.message)
    }
  }

  /* ================= UPDATE ================= */

  const saveEdit = async (id: string) => {

    try {
      const res = await fetch(`${API_BASE_URL}/factories/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          factory_name: editName,
          factory_code: id,
          location: editLocation,
          factory_address: editAddress,
        }),
      })

      if (!res.ok) throw new Error('Update failed')

      setEditingId(null)
      await loadFactories()

    } catch (err: any) {
      alert(err.message)
    }
  }

  /* ================= DELETE ================= */

  const deleteFactory = async (id: string) => {

    if (!confirm('Delete this factory?')) return

    try {
      const res = await fetch(`${API_BASE_URL}/factories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!res.ok && res.status !== 204) {
        throw new Error('Delete failed')
      }

      await loadFactories()

    } catch (err: any) {
      alert(err.message)
    }
  }

  /* ================= EDIT ================= */

  const startEdit = (f: Factory) => {
    setEditingId(f.id)
    setEditName(f.name)
    setEditLocation(f.location || '')
    setEditAddress(f.address || '')
  }

  /* ================= INIT ================= */

  useEffect(() => {
    loadFactories()
  }, [])


  /* ================= UI ================= */



  return (
    <div className="bg-slate-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Factories Management</h2>
            <p className="text-slate-500 mt-1 text-sm font-medium">Create, edit, and manage factory locations</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl mb-6 text-sm font-medium shadow-sm">
            {error}
          </div>
        )}

        {/* Add */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <FactoryForm onSubmit={addFactory} />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <p className="text-slate-500 font-medium">Loading factories...</p>
          </div>
        ) : (
          /* Table */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden w-full">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-slate-100">
                {factories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="bg-slate-50 p-3 rounded-full">
                          <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-500">No factories found</p>
                        <p className="text-xs text-slate-400">Add a new factory location to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  factories.map((f) => (
                    <tr 
                      key={f.id} 
                      className="hover:bg-slate-50 transition-colors duration-150 group"
                    >
                      {/* Code */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-slate-800">
                        {f.id}
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {editingId === f.id ? (
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            autoFocus
                          />
                        ) : (
                          f.name
                        )}
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {editingId === f.id ? (
                          <input
                            value={editLocation}
                            onChange={(e) => setEditLocation(e.target.value)}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        ) : (
                          f.location || '—'
                        )}
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {editingId === f.id ? (
                          <input
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        ) : (
                          f.address || '—'
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          {editingId === f.id ? (
                            <>
                              <button
                                onClick={() => saveEdit(f.id)}
                                className="text-green-600 hover:text-green-800 transition-colors duration-200 font-medium"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-slate-600 hover:text-slate-800 transition-colors duration-200 font-medium"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(f)}
                                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteFactory(f.id)}
                                className="text-slate-600 hover:text-red-600 transition-colors duration-200 font-medium"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
