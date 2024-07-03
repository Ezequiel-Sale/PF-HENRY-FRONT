"use client"
import React from 'react'
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandEmpty,
    CommandSeparator,
} from "@/components/ui/command"
import { 
    LayoutDashboard, 
    Newspaper, 
    Folders, 
    CreditCard, 
    Settings, 
    User, 
    GraduationCap,
    UsersRound,
    Dumbbell,
    LineChart,
    QrCode
} from 'lucide-react'  
import Link from 'next/link'

const UserSidebar = () => {
  return (
    <Command className="bg-secondary rounded-none h-screen w-full">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandSeparator />
            <CommandGroup heading="Settings">
                <CommandItem>
                    <User className='mr-2 h-4 w-4' />
                    <span>Mis datos</span>
                </CommandItem>
                <CommandItem>
                    <Dumbbell className='mr-2 h-4 w-4' />
                    <span>Mi rutina</span>
                </CommandItem>
                <CommandItem>
                    <CreditCard className='mr-2 h-4 w-4' />
                    <span>Pagos</span>
                </CommandItem>
                <CommandItem>
                    <LineChart className='mr-2 h-4 w-4' />
                    <Link href="#"><span>Progreso</span></Link>
                </CommandItem>
                <CommandItem>
                    <QrCode className='mr-2 h-4 w-4' />
                    <Link href="#"><span>Generar Acceso</span></Link>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </Command>
  )
}

export default UserSidebar
