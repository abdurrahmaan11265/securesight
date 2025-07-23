'use client'
import { useEffect, useState } from 'react'
import type { Incident, Camera } from '@prisma/client'

export type IncidentWithCamera = Incident & { camera: Camera }

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<IncidentWithCamera[]>([])
  useEffect(() => {
    fetch('/api/incidents?resolved=false')
      .then(r => r.json())
      .then(setIncidents)
  }, [])

  const resolve = async (id: number) => {
    setIncidents(incs => incs.filter(i => i.id !== id))
    await fetch(`/api/incidents/${id}`, { method: 'PATCH' })
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 text-white min-h-screen">
      {/* Left: Player */}
      <div className="w-full md:w-2/3 flex flex-col p-4 space-y-4">
        <div className="flex-1 bg-black rounded-lg overflow-hidden flex flex-col min-h-[300px]">
          <div className="bg-[#1c1c1c] px-4 py-2 text-sm border-b border-gray-700">
            📅 11/7/2025 – 03:12:37
          </div>
          <div className="flex-1">
            <img
              src="/video-stub.jpg"
              alt="Incident video"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <img
            src="/thumb1.jpg"
            alt=""
            className="w-full sm:w-1/2 h-24 md:h-32 object-cover rounded-lg"
          />
          <img
            src="/thumb2.jpg"
            alt=""
            className="w-full sm:w-1/2 h-24 md:h-32 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Right: Incident List */}
      <div className="w-full md:w-1/3 flex flex-col p-4">
        <h2 className="text-xl font-semibold flex-shrink-0">
          {incidents.length} Unresolved Incidents
        </h2>
        <div className="mt-2 flex-1 overflow-y-auto space-y-4 pr-2 max-h-[70vh]">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#1c1c1c] p-3 rounded-lg space-y-2 sm:space-y-0"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={inc.thumbnailUrl}
                  alt=""
                  className="w-16 h-12 object-cover rounded"
                />
                <div>
                  <div className="font-semibold flex items-center space-x-1">
                    <span
                      className={
                        inc.type === 'Gun Threat'
                          ? 'text-red-500'
                          : 'text-yellow-400'
                      }
                    >
                      ●
                    </span>
                    <span>{inc.type}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {inc.camera.location}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(inc.tsStart).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    –{' '}
                    {new Date(inc.tsEnd).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
              <button
                onClick={() => resolve(inc.id)}
                className="text-yellow-400 hover:underline flex-shrink-0 self-end sm:self-auto"
              >
                Resolve →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
