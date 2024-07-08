"use client"
import React from 'react'
import UserSidebar from '@/components/UserDashboard/Sidebar/UserSidebar'
import { Rocket, Clock, HammerIcon } from 'lucide-react'

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <UserSidebar />
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-gray-800 to-black text-white overflow-y-auto">
        <div className="max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
          <h1 className="text-4xl font-bold mb-6 text-center flex items-center justify-center">
            <Rocket className="mr-4 h-10 w-10 text-yellow-400 animate-bounce" />
            Dashboard en Construcción
          </h1>
          
          <p className="text-xl mb-8 text-center">
            Estamos trabajando arduamente para brindarte la mejor experiencia posible.
          </p>
          
          <div className="space-y-6">
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-blue-400" />}
              title="Próximamente"
              description="Podrás ver y modificar tus datos personales, gestionar tu rutina de entrenamiento y realizar pagos de forma segura."
            />
            
            <FeatureCard 
              icon={<HammerIcon className="h-8 w-8 text-green-400" />}
              title="En Desarrollo"
              description="Estamos implementando un sistema de seguimiento de progreso y generación de códigos QR para acceso rápido al gimnasio."
            />
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-sm opacity-75">
              Gracias por tu paciencia. ¡Estamos emocionados por mostrarte todas las nuevas funcionalidades pronto!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex items-start space-x-4 bg-white bg-opacity-5 p-4 rounded-lg transform transition-all duration-300 hover:bg-opacity-10 hover:shadow-lg">
    {icon}
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-75">{description}</p>
    </div>
  </div>
)

export default UserDashboard