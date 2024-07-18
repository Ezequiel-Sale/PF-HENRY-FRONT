"use client"
import React, { useEffect, useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { getUserData } from '@/helper/petitions'

const UserDashboard = () => {
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const userSession = JSON.parse(localStorage.getItem("userSession") || "{}")
      const googleSession = JSON.parse(localStorage.getItem("googleSession") || "{}")
      
      let userId = userSession.id || googleSession.id
      let name = userSession.name || googleSession.name

      if (userId) {
        try {
          if (userSession.id) {
            // Si es un usuario normal, obtenemos los datos del servidor
            const userData = await getUserData(userId)
            setUserName(userData.name || "Usuario")
          } else if (googleSession.id) {
            // Si es un usuario de Google, usamos el nombre directamente del googleSession
            setUserName(name || "Usuario")
          }
        } catch (err) {
          console.error('Error fetching user data:', err)
          setError(err instanceof Error ? err.message : 'Error desconocido al obtener datos del usuario')
        } finally {
          setLoading(false)
        }
      } else {
        console.error("No se encontró el ID del usuario en el localStorage")
        setError("No se pudo obtener el ID del usuario")
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="flex-1 p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Dumbbell className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a tu dashboard, {userName}!</h1>
          <p className="text-xl text-gray-600">
            Aquí podrás gestionar toda tu información y actividades en el gimnasio.
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Qué puedes hacer aquí?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Ver y actualizar tus datos personales</li>
            <li>Consultar tu rutina de entrenamiento personalizada</li>
            <li>Revisar el estado de tus pagos</li>
            <li>Generar tu código QR de acceso al gimnasio</li>
            <li>Seguir tu progreso y logros</li>
          </ul>
        </div>

        <p className="text-gray-600 mb-8">
          Explora las opciones en la barra lateral para acceder a todas estas funcionalidades. 
          Estamos aquí para ayudarte a alcanzar tus metas fitness.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Consejo del día:</h3>
          <p className="text-gray-700">
            Recuerda mantenerte hidratado durante tus sesiones de entrenamiento. 
            Una buena hidratación mejora tu rendimiento y recuperación.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard