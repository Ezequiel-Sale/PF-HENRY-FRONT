import Image from 'next/image'
import React from 'react'

const Card = ({ nombre, horario, dias, imagen }: { nombre: string, horario: string, dias: string, imagen: string }) => {
  return (
    <div className="relative w-64 h-80 bg-black rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
      <div className="relative h-full flex flex-col justify-end p-4">
        <div className="flex flex-col items-center">
          <div className="absolute top-[-30px]">
            <Image
              src={imagen}
              alt={nombre}
              width={150}
              height={150}
              className=""
            />
          </div>
          <h3 className="mt-3 text-xl font-bold text-white text-center">{nombre}</h3>
          <p className="mt-2 text-md text-red-300 text-center">{horario}</p>
          <p className="mt-1 text-sm text-gray-300 text-center">{dias}</p>
        </div>
        <div className="flex justify-center space-x-3 mt-4">
        </div>
      </div>
    </div>
  )
}

export default Card
