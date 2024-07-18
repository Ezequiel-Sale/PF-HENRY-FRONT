import Image from "next/image";
import { MdHealthAndSafety } from "react-icons/md";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { LuScanFace } from "react-icons/lu";
import ProfesorCard from "@/components/ProfesorCard/ProfesorCard";
import PlanCard from "@/components/PlanCard/PlanCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 relative">
      <div className="flex w-full flex-col md:flex-row md:gap-20 gap-6 mt-4 md:mt-0">
        <img src="fire.jpg" alt="fire man" className="w-full md:w-1/2 object-cover md:object-contain md:h-auto h-48" />
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-4">
          <h2 className="text-3xl md:text-5xl text-white font-bold">Entrena con</h2>
          <div className="flex flex-col md:flex-row gap-2 items-center md:items-start">
            <h1 className="text-5xl md:text-7xl font-bold hollow-text">Power Training</h1>
            <img src="full-logo.png" alt="full logo" className="w-24 md:w-44" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col md:flex-row h-auto md:h-[120vh] items-center justify-center gap-10 md:gap-0 mt-10 md:mt-0">
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-start gap-3 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl text-red-600 font-extrabold mb-4">
            ¡Entrenamiento personalizado!
          </h2>
          <p className="text-white font-light">
            Si estás buscando un lugar donde mejorar tu condición física y recibir un entrenamiento personalizado, Power Training puede ser la opción ideal para ti. ¡No dudes en ponerte en contacto con ellos y comenzar tu camino hacia una vida más saludable y activa!
          </p>
          <div className="text-white flex gap-6 justify-around mt-10">
            <div className="border border-solid border-gray-100 rounded-md p-2 flex flex-col justify-center items-center min-w-20 hover:bg-white hover:text-black">
              <MdHealthAndSafety size={30} />
              <p>Salud</p>
            </div>
            <div className="border border-solid border-gray-100 rounded-md p-2 flex flex-col justify-center items-center min-w-20 hover:bg-white hover:text-black">
              <MdOutlineSportsMartialArts size={30} />
              <p>Deporte</p>
            </div>
            <div className="border border-solid border-gray-100 rounded-md p-2 flex flex-col justify-center items-center min-w-20 hover:bg-white hover:text-black">
              <LuScanFace size={30} />
              <p>Estetica</p>
            </div>
          </div>
        </div>
        <img src="female.png" alt="female athlete" className="w-full md:w-auto md:max-h-[90vh] object-cover" />
      </div>
      <ProfesorCard />
      <PlanCard />
      <div className="flex flex-col items-center p-4 text-white rounded-lg shadow w-full md:w-auto">
        <h3 className="text-4xl md:text-6xl text-red-600 font-extrabold mb-4">
          Calificación del Gimnasio
        </h3>
        <iframe
          src="https://widgets.commoninja.com/iframe/9170895a-3e16-4fed-8a80-80421c6dadb4"
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          className="w-full"
        ></iframe>
      </div>
    </main>
  );
}
