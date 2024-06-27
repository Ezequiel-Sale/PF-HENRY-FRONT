import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, TableHeader, TableCaption} from '@/components/ui/table'
import Link from 'next/link'
import suscripciones from '../Data/Suscripcion'
import { Suscripcion } from '../types/Suscripcion'

interface SuscriptionTableProps {
    limit?: number;
    title?: string;
}

const SuscriptionTable = ({limit, title}: SuscriptionTableProps) => {
    //ordenar las suscripciones por las más recientes
    const suscripcionesOrdenadas: Suscripcion[] = [...suscripciones].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // filtrar suscripciones por limite
    const suscripcionesFiltradas = limit ? suscripcionesOrdenadas.slice(0, limit) : suscripcionesOrdenadas;

  return (
    <div className='mt-10'>
        <h3 className='text-2xl mb-4 font-semibold'>
            {title ? title: 'Suscripciones'}
        </h3>
        <Table>
            <TableCaption>Lista de las últimas suscripciones realizadas</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className='hidden md:table-cell'>Edad</TableHead>
                    <TableHead className='hidden md:table-cell text-right'>Fecha</TableHead>
                    <TableHead>Ver</TableHead>
                </TableRow>
            </TableHeader>
         <TableBody>
    {suscripcionesFiltradas.slice(0, limit).map((suscripcion: Suscripcion) => (
        <TableRow key={suscripcion.id}>
            <TableCell>{suscripcion.name}</TableCell>
            <TableCell className='hidden md:table-cell'>{suscripcion.age}</TableCell>
            <TableCell className='hidden md:table-cell text-right'>{suscripcion.date}</TableCell>
            <TableCell>
                <Link href={`/dashboard/suscripciones/${suscripcion.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                    Ver
                    </button>
                </Link>
            </TableCell>
        </TableRow>
    ))}
</TableBody>
        </Table>
    </div>
  )
}

export default SuscriptionTable
