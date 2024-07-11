"use client";

import { useContextCombined } from "@/components/ContextUserNotifications/ContextUserNotifications";

const Anuncio = () => {
    const { anuncio } = useContextCombined();
  
    if (!anuncio) {
      return null; // No renderizar nada si no hay anuncio
    }
    
    return (
      <div className='relative overflow-hidden w-full h-8 bg-red-500'>
        <div className='absolute whitespace-nowrap animate-marquee w-[100vw]'>
          {anuncio && (
            <span key={anuncio.id} className="font-sans roboto">
              {anuncio.message}
            </span>
          )}
        </div>
      </div>
    );
  };
  
  export default Anuncio;
