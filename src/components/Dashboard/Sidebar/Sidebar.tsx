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
    UsersRound
} from 'lucide-react'  
import Link from 'next/link'

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none h-screen w-full">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup heading="Suggestions">
                <CommandItem>
                    <LayoutDashboard className='mr-2 h4 w4' />
                    <Link href="/dashboard">Dashboard</Link>
                </CommandItem>
                <CommandItem>
                    <Newspaper className='mr-2 h4 w4' />
                    <Link href="#">Suscripciones</Link>
                </CommandItem>
                <CommandItem>
                    <Folders className='mr-2 h4 w4' />
                    <Link href="#">Categorias</Link>
                </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
                <CommandItem>
                    <User className='mr-2 h4 w4' />
                    <span>Perfil</span>
                </CommandItem>
                <CommandItem>
                    <UsersRound className='mr-2 h4 w4' />
                    <Link href="/dashboard/users"><span>Ver usuarios</span></Link>
                </CommandItem>
                <CommandItem>
                    <CreditCard className='mr-2 h4 w4' />
                    <span>Pagos</span>
                </CommandItem>
                <CommandItem>
                    <Settings className='mr-2 h4 w4' />
                    <Link href="/dashboard/settings"><span>Opciones</span></Link>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </Command>
  )
}

export default Sidebar
