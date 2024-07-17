import React from 'react'
import Card from './Card'

const ProfesorCard = () => {
  return (
    <>
    <div className='flex justify-center items-center gap-2'>
        <Card nombre={"Miguel"} horario={"18:00 a 00:00"} dias={"Lunes a Viernes"} imagen={"/profemiguel.png"}/>
        <Card nombre={"Hernan"} horario={"14:00 a 18:00"} dias={"Lunes a Viernes"} imagen={"/profehernan.png"}/>
    </div>
    </>
  )
}

export default ProfesorCard