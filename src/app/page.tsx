import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="flex w-full -mt-20 gap-20 flex-col md:flex-row">
        <img src="fire.jpg" alt="fire man" />
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-5xl text-white font-bold">Entrena con</h2>
          <div className="flex gap-2">
            <h1 className="text-7xl font-bold hollow-text">Power Training</h1>
            <img src="full-logo.png" alt="fire man" className="w-44" />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-around flex-col md:flex-row h-[120vh] items-center">
        <div className="w-1/3 flex flex-col justify-center gap-3">
          <h2 className="text-4xl  text-[#FF2400] font-extrabold">
            ¡Entrenamiento personalizado!
          </h2>
          <p className="text-white font-light">
            Si estás buscando un lugar donde mejorar tu condición física y
            recibir un entrenamiento personalizado, Power Training puede ser la
            opción ideal para ti. ¡No dudes en ponerte en contacto con ellos y
            comenzar tu camino hacia una vida más saludable y activa!
          </p>
        </div>
        <img src="female.png" alt="fire man" className="md:max-h-[90vh]" />
      </div>

      <div className="flex w-full  gap-20 flex-col md:flex-row ">
        <div className="w-1/2 flex flex-col justify-center">
          <img src="full-poster.png" alt="poster" />
        </div>
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
