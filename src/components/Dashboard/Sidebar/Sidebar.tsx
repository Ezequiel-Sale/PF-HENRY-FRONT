"use client"
import React from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { 
    LayoutDashboard, 
    Newspaper, 
    Folders, 
    CreditCard, 
    Settings, 
    User 
} from 'lucide-react'  
import Link from 'next/link'

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none h-[100vh] w-[250px]" >
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
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
        <span>Profile</span>
      </CommandItem>
      <CommandItem>
        <CreditCard className='mr-2 h4 w4' />
        <span>Billing</span>
        </CommandItem>
      <CommandItem>
        <Settings className='mr-2 h4 w4' />
        <span>Settings</span>
        </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

  )
}

export default Sidebar