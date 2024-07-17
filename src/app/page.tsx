import Image from "next/image";
import { MdHealthAndSafety } from "react-icons/md";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { LuScanFace } from "react-icons/lu";
import ProfesorCard from "@/components/ProfesorCard/ProfesorCard";
import PlanCard from "@/components/PlanCard/PlanCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="flex w-full -mt-20 gap-20 flex-col md:flex-row">
        <img src="fire.jpg" alt="fire man" />
        <div className="w-1/2 flex flex-col justify-center gap-4">
          <h2 className="text-5xl text-white font-bold">Entrena con</h2>
          <div className="flex gap-2">
            <h1 className="text-7xl font-bold hollow-text">Power Training</h1>
            <img src="full-logo.png" alt="fire man" className="w-44" />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-around flex-col md:flex-row h-[120vh] items-center">
        <div className="w-1/3 flex flex-col justify-center gap-3">
          <h2 className="text-6xl  text-red-600 font-extrabold mb-4">
            ¡Entrenamiento personalizado!
          </h2>
          <p className="text-white font-light">
            Si estás buscando un lugar donde mejorar tu condición física y
            recibir un entrenamiento personalizado, Power Training puede ser la
            opción ideal para ti. ¡No dudes en ponerte en contacto con ellos y
            comenzar tu camino hacia una vida más saludable y activa!
          </p>
          <div className="text-white flex gap-6  justify-around mt-10">
            <div className="border border-solid border-gray-100 rounded-md p-2 flex-col flex justify-center items-center min-w-20 hover:bg-white hover:text-black">
              <MdHealthAndSafety size={30} />
              <p>Salud</p>
            </div>
            <div className="border border-solid border-gray-100 rounded-md p-2 flex-col flex justify-center items-center min-w-20 hover:bg-white hover:text-black">
              <MdOutlineSportsMartialArts size={30} />
              <p>Deporte</p>
            </div>

            <div className="border border-solid border-gray-100 rounded-md p-2 flex-col flex justify-center items-center min-w-20 hover:bg-white hover:text-black">
              <LuScanFace size={30} />
              <p>Estetica</p>
            </div>
          </div>
        </div>
        <img src="female.png" alt="fire man" className="md:max-h-[90vh]" />
      </div>
      <ProfesorCard />
      <PlanCard />
      <div className="flex flex-col items-center p-4  text-white rounded-lg shadow">
        <h3 className=" text-6xl  text-red-600 font-extrabold mb-4">
          Calificación del Gimnasio
        </h3>
        <iframe
          src="https://widgets.commoninja.com/iframe/9170895a-3e16-4fed-8a80-80421c6dadb4"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          className="w-full h-[80vh]"
        ></iframe>
      </div>

      {/* <div className="flex w-full  gap-20 flex-col md:flex-row h-[100vh] bg-red-500 absolute bottom-0">
        <video
          src="reveal.mp4"
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      </div> */}
    </main>
  );
}
